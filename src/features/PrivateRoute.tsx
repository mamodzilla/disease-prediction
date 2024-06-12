import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useActionData } from "react-router-dom";
import { setAuth, setTokens } from "../store/slices/post/login";
import { IPostRefresh, IPostRefreshState, setRefreshToken, usePostRefreshGetResult } from "../store/slices/post/refresh_tokens";
import { RootState } from "../store/store";

const PrivateRoute = async () => {
    const useAuth = async () => {
        const dispatch = useDispatch();
        const refreshToken = () => {
            const cookies = document.cookie.split("; ");
            for (let cookie of cookies) {
                const indexOfSeparator = cookie.indexOf("="); 
                const parts = [cookie.slice(0, indexOfSeparator), cookie.slice(indexOfSeparator+1)];
                if (parts[0] == "refresh_token") {
                    return parts[1]
                }
            };
            return ""
        };
        dispatch(setRefreshToken(refreshToken()));
        type MyInterfaceType = Awaited<ReturnType<typeof usePostRefreshGetResult>>; 
        const extract = (data: MyInterfaceType) => {
            console.log("data = ", data);
            dispatch(setAuth(data));
            
        }
        await usePostRefreshGetResult().then(data => extract(data));

    }
    await useAuth();
    const isAuth = useSelector((state: RootState) => state.login.isAuth);

    return (
        isAuth ? <Outlet/> : <Navigate to="login"></Navigate>
    );
};

export default PrivateRoute;