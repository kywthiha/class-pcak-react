import React from "react";
import { formatPrice } from "../../helper";
import PackItemIcon from "./PackItemIcon";

export default function PackItem({ pack }) {
    return (

        <div className="rounded-lg shadow-lg overflow-hidden mb-4">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
                <div className=" mb-5 mt-5 text-center">
                    <span className="inline-flex dark:text-white rounded-full text-2xl leading-5 font-semibold tracking-wide">
                        {pack.pack_name}
                    </span>
                </div>
                <div className="flex justify-center">
                    <PackItemIcon pack={pack} />
                </div>
                <div className="mt-4 text-center line-clamp-3">
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