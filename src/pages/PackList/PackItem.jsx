import React from "react";
import { formatPrice } from "../../helper";

export default function PackItem({ pack }) {
    return (

        <div className="rounded-lg shadow-lg overflow-hidden mb-4">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
                <div className="flex justify-center">
                    <span className="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                        {pack.pack_name}
                    </span>
                </div>
                <div className="flex justify-center">
                    <span className="inline-flex w-16 h-16 justify-center items-center  rounded-full text-xl border-2 overflow-hidden border-red-500 leading-5 font-semibold tracking-wide uppercase">
                        <span className="inline-flex w-14 h-14 justify-center items-center bg-blue-300 rounded-full text-xl border-1 overflow-hidden  leading-5 font-semibold tracking-wide uppercase">
                            {pack.total_credit}
                        </span>
                    </span>
                </div>
                <div className="mt-4 text-center">
                    {pack.pack_description}
                </div>
                <div className="mt-4 text-center text-2xl leading-none font-extrabold ">
                    {formatPrice(pack.pack_price)}
                </div>
                {pack.pack_type === 'unlimited' ? (<div className="mt-4 text-center">per month</div>) : (pack.pack_price > pack.estimate_price ? <div className="mt-4 text-center  leading-none">
                    {formatPrice(pack.estimate_price)} per class
                </div> : <></>)}
            </div>
        </div>
    );
}