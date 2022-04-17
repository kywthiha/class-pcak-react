import nprogress from "nprogress";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../actions/auth.action";
import { getPackList } from "../../actions/pack-list.action";
import PackItem from "./PackItem";
import 'nprogress/nprogress.css'

export default function PackList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pack_list, inProgress } = useSelector((state) => state.packList)
    const [searchParams] = useSearchParams();

    useEffect(async () => {
        nprogress.start();
        await getPackList({ params: searchParams.toString() })(dispatch)
        nprogress.done();
    }, [searchParams, dispatch]);

    return (
        <div className="flex justify-center">
            <div className="grid w-full lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-3 max-w-7xl">
                {pack_list.map((pack, index) => <PackItem pack={pack} key={pack.pack_id} />)}
            </div>
        </div>

    );
}