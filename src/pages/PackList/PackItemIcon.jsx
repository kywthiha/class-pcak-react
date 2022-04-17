import React from "react";
import { formatPrice } from "../../helper";

export default function PackItemIcon({ pack }) {
    if (pack.total_credit === 1)
        return (
            <span className="inline-flex w-16 h-16 justify-center items-center  rounded-full text-xl border-2 overflow-hidden border-pack-single-color leading-5 font-semibold tracking-wide uppercase">
                <span className="inline-flex text-white w-14 h-14 justify-center items-center bg-pack-single-color rounded-full text-xl border-1 overflow-hidden  leading-5 font-semibold tracking-wide uppercase">
                    S
                </span>
            </span>
        );

    if (pack.total_credit === 0)
        return (
            <span className="inline-flex w-16 h-16 justify-center items-center  rounded-full text-xl border-2 overflow-hidden border-pack-share-color leading-5 font-semibold tracking-wide uppercase">
                <span style={{ background: `linear-gradient(45deg, #99BEC4  50%, rgba(0,0,0,0) 50%), linear-gradient(-45deg, #29455D 50%, #649299 50%)` }} className="inline-flex text-white text-4xl w-14 h-14 justify-center items-center bg-pack-single-color rounded-full  border-1 overflow-hidden  leading-5 font-light tracking-wide uppercase">
                    &infin;
                </span>
            </span >
        );

    if (pack.pack_type === 'shareable')
        return (
            <span className="inline-flex w-16 h-16 justify-center items-center  rounded-full text-xl border-2 overflow-hidden border-pack-share-color leading-5 font-semibold tracking-wide uppercase">
                <span className="inline-flex text-white text-xl w-14 h-14 justify-center items-center bg-pack-share-color rounded-full  border-1 overflow-hidden  leading-5 font-semibold tracking-wide uppercase">
                    {pack.total_credit}
                </span>
            </span>
        );

    return (
        <span className="inline-flex w-16 h-16 justify-center items-center  rounded-full text-xl border-2 overflow-hidden border-pack-nonshare-color leading-5 font-semibold tracking-wide uppercase">
            <span className="inline-flex text-white w-14 h-14 justify-center items-center bg-pack-nonshare-color rounded-full text-xl border-1 overflow-hidden  leading-5 font-semibold tracking-wide uppercase">
                {pack.total_credit}
            </span>
        </span>
    );
}