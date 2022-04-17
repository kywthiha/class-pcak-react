
import { useDispatch, useSelector } from "react-redux";
import 'nprogress/nprogress.css'
import { formatPrice } from "../../helper";
import { Navigate } from "react-router-dom";

export default function OrderSuccess() {

    const { order } = useSelector((state) => state.order)

    if (!(order && order.id)) {
        return <Navigate replace to='/' />
    }

    return (
        <div className="flex justify-center bg-gray-300 min-h-full">
            <div className="w-full p-3 max-w-7xl">
                <h1 className="text-3xl uppercase mb-3">Class Pack Purchase Review</h1>
                <div className="border-2 border-blue-300 bg-white overflow-hidden mb-4">
                    <div className="sm:p-10 p-2 border-b-2 border-gray-400">
                        <h3 className="font-extrabold text-xl mb-3">You have selected:</h3>
                        {
                            order.order_packs.map(pack => (<div key={pack.pack_id} className="flex justify-between items-center gap-5">
                                <div className="flex gap-5">
                                    <div className="flex justify-center">
                                        <span className="inline-flex w-16 h-16 justify-center items-center  rounded-full text-xl border-2 overflow-hidden border-red-500 leading-5 font-semibold tracking-wide uppercase">
                                            <span className="inline-flex w-14 h-14 justify-center items-center bg-blue-300 rounded-full text-xl border-1 overflow-hidden  leading-5 font-semibold tracking-wide uppercase">
                                                {pack.total_credit}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="text-lg font-bold">{pack.pack_name}</div>
                                        <div>Newbie get an additional Free class</div>
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
                        <div className="flex justify-between mt-2">
                            <div>Grand Total</div>
                            <div>{formatPrice(order.grand_total)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}