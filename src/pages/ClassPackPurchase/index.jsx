import nprogress from "nprogress";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import 'nprogress/nprogress.css'
import { applyPromoCode, getPackDetail, resetPackDetail } from "../../actions/pack-detail.action";
import { formatPrice } from "../../helper";
import { ArrowNarrowLeftIcon, CheckCircleIcon } from '@heroicons/react/solid'
import ValidationErrors from "../../components/ValidationErrors";
import { createOrder } from "../../actions/order.action";
import Layout from "../../components/Layout";
import PackItemIcon from "../PackList/PackItemIcon";

const calculatePackPurchase = (state) => {
    const { promo_code } = state;

    let pack = { ...state.pack }
    pack.sub_total = pack.pack_price;
    pack.gst = pack.pack_price * 0.07;
    pack.grand_total = pack.sub_total + pack.gst;

    if (promo_code) {
        pack.discount = promo_code.discount;

        if (pack.grand_total > pack.discount) {
            pack.grand_total -= pack.discount;
        } else {
            pack.grand_total -= pack.grand_total;
        }
    }

    return {
        ...state,
        pack,
    }
}

export default function ClassPackPurchase() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pack, inProgress, inProgressApplyPromoCode, errorsApplyPromoCode, promo_code } = useSelector((state) => calculatePackPurchase(state.pack))
    const [searchParams] = useSearchParams();
    const params = useParams();
    const [promoCode, setPromoCode] = useState('');
    const { inProgress: inProgressOrderSubmit } = useSelector((state) => state.order)
    const [readyPage, setReadyPage] = useState(false)

    const handlePromoCodeInput = (e) => {
        setPromoCode(e.target.value)
    }

    const handelApplyPromoCode = async (e) => {
        await applyPromoCode({ code: promoCode })(dispatch)
    }

    const handleSubmitOrder = async (e) => {
        await createOrder({ order_packs: [pack.pack_id], promo_code: promo_code && promo_code.code })(dispatch)
        navigate('/order-success')
    }

    useEffect(async () => {
        setReadyPage(false);
        nprogress.start();
        await resetPackDetail()(dispatch)
        await getPackDetail({ pack_id: params.packId })(dispatch)
        nprogress.done();
        setReadyPage(true);
    }, [searchParams, dispatch]);

    return (
        <Layout>
            {
                readyPage && (<div className="flex justify-center">
                    <div className="w-full p-3 max-w-7xl">
                        <h1 className="text-3xl uppercase mb-3 font-pt-sans-narrow">Class Pack Purchase Review</h1>
                        <div className="border-2 border-blue-200 bg-white overflow-hidden mb-4">
                            <div className="sm:p-10 p-2 border-b-2 border-gray-400">
                                <h3 className="font-extrabold text-xl mb-3 ">You have selected:</h3>
                                <div className="flex justify-between items-center gap-5">
                                    <div className="flex gap-5">
                                        <div className="flex justify-center">
                                            <PackItemIcon pack={pack} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="text-lg font-bold">{pack.pack_name}</div>
                                            <div className="line-clamp-1 max-w-md">{pack.newbie_note}</div>
                                        </div>
                                    </div>
                                    <div>
                                        {pack.pack_type === 'unlimited' ? (<> <span className="font-bold text-lg">{formatPrice(pack.grand_total)}</span><br></br><span className="text-gray-300">per month</span></>) : (pack.pack_price > pack.estimate_price ? <div className="mt-4 text-center  leading-none">
                                            <span className="font-bold text-lg">{formatPrice(pack.grand_total)}</span>
                                        </div> : null)}
                                    </div>
                                </div>
                                {
                                    pack.newbie_addition_credit === 1 && <><ValidationErrors errors={errorsApplyPromoCode} />
                                        <div className="mb-6 mt-5 flex items-stretch w-full sm:max-w-md relative">
                                            <div className="relative flex items-center  w-full">
                                                <input value={promoCode} disabled={promo_code} onChange={handlePromoCodeInput} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 flex-1" />
                                                {
                                                    promo_code && <CheckCircleIcon className="w-5 h-5 text-green-500 absolute right-2" />
                                                }
                                            </div>
                                            <button onClick={handelApplyPromoCode} disabled={inProgressApplyPromoCode || promo_code} className={`relative w-20 bg-primary border border-transparent  font-semibold text-sm text-white uppercase tracking-widest active:bg-cyan-900 transition ease-in-out duration-150 ${inProgressApplyPromoCode || promo_code ? "opacity-50 cursor-not-allowed" : ""}`}>
                                                {
                                                    inProgressApplyPromoCode && <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                    </svg> || 'APPLY'
                                                }

                                            </button>
                                        </div></>
                                }
                            </div>
                            <div className="sm:p-10 p-2">
                                <div className="flex justify-between">
                                    <div>Subtotal</div>
                                    <div>{formatPrice(pack.sub_total)}</div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <div>GST</div>
                                    <div>{formatPrice(pack.gst)}</div>
                                </div>
                                {
                                    promo_code && <div className="flex justify-between mt-2 font-bold">
                                        <div>Discount</div>
                                        <div>-{formatPrice(pack.discount)}</div>
                                    </div>
                                }
                                <div className="flex justify-between mt-2 text-gray-700 font-semibold">
                                    <div>Grand Total</div>
                                    <div>{formatPrice(pack.grand_total)}</div>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs">Please read all <span className="text-gray-400">Terms and Conditions</span> before purchasing your YM Class or Class Pack</p>
                        <div className="flex justify-between">
                            <div className="flex flex-1 items-center text-gray-400 " >
                                <div className="cursor-pointer flex items-center" onClick={(e) => { navigate(-1) }}>
                                    <ArrowNarrowLeftIcon className="w-5 h-5" /> Back
                                </div>
                            </div>
                            <button onClick={handleSubmitOrder} disabled={inProgressOrderSubmit} className={`inline-flex  items-center p-2.5 rounded-full w-40 justify-center bg-primary border border-transparent  font-semibold text-sm text-white uppercase tracking-widest active:bg-cyan-900 transition ease-in-out duration-150 ${inProgressOrderSubmit ? "opacity-50 cursor-not-allowed" : ""}`}>
                                {
                                    inProgressOrderSubmit && <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                }
                                PAY NOW
                            </button>
                        </div>
                    </div>
                </div>)
            }
        </Layout>

    );
}