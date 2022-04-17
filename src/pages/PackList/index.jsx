import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/auth.action";

export default function PackList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth)
    return (
        <div className="min-h-screen p-5 flex flex-col sm:justify-center items-center pt-10 sm:pt-0 bg-gray-100">
            <div className="w-full sm:max-w-md sm:m-3 mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <h1 className="text-2xl text-center mb-4">Hello Index</h1>
            </div>
        </div>

    );
}