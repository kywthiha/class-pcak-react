
import { useDispatch, useSelector } from "react-redux";
import 'nprogress/nprogress.css'
import { formatPrice } from "../../helper";
import { Navigate } from "react-router-dom";
import Layout from "../../components/Layout";
import PackItemIcon from "../PackList/PackItemIcon";

export default function OrderSuccess() {

    const { order } = useSelector((state) => state.order)

    if (!(order && order.id)) {
        return <Navigate replace to='/' />
    }

    return (
        <Layout>
            <div className="flex justify-center  min-h-full">
                <div className="w-full p-3 max-w-7xl">
                    <h1 className="text-3xl uppercase mb-1 font-pt-sans-narrow">Thank You!</h1>
                    <h1 className="text-3xl uppercase mb-3 font-pt-sans-narrow">You have successfully purchased a class pack</h1>
                    <div className="border-2 border-blue-300 bg-white overflow-hidden mb-4">
                        <div className="sm:p-10 p-2 border-b-2 border-gray-400">
                            <h3 className="font-extrabold text-xl mb-3">You have selected:</h3>
                            {
                                order.order_packs.map(pack => (<div key={pack.pack_id} className="flex justify-between items-center gap-5">
                                    <div className="flex gap-5">
                                        <div className="flex justify-center">
                                            <PackItemIcon pack={pack} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="text-lg font-bold">{pack.pack_name}</div>
                                            <div className="line-clamp-1 max-w-md">{pack.newbie_note}</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold">{formatPrice(pack.pack_price)}</div>
                                </div>))
                            }

                        </div>
                        <div className="sm:p-10 p-2">
                            <div className="flex justify-between">
                                <div>Subtotal</div>
                                <div>{formatPrice(order.sub_total)}</div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div>GST</div>
                                <div>{formatPrice(order.gst)}</div>
                            </div>
                            {
                                order.promo_code_id && <div className="flex justify-between mt-2 font-bold">
                                    <div>Discount</div>
                                    <div>-{formatPrice(order.promo_code_discount)}</div>
                                </div>
                            }
                            <div className="flex justify-between mt-2 text-gray-700 font-semibold">
                                <div>Grand Total</div>
                                <div>{formatPrice(order.grand_total)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
}