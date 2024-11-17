import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/app/hooks";
import { useLoginMutation } from "../store/services/authApiSlice";
import UseCustomToast from "./UseCustomToast";
import { addUser } from "../store/features/userSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [login, { data, isError }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const nvaigate = useNavigate();
    const user = useAppSelector(state => state.local.userReducer.userInfo);
    const userLogin = (email: string, password: string) => {
        UseCustomToast(login({ email, password, provider: 'email' }), "Logging ing");
    }
    useEffect(() => {
        if (!isError && data) {
            dispatch(addUser(data?.data?.user))
            nvaigate("/")
        }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [data])

    return { user, userLogin };
}
export default useAuth;
