import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useActionData } from "react-router-dom";
import { setTokens } from "../store/slices/post/login";
import { IPostRefresh, IPostRefreshState, setRefreshToken, usePostRefreshGetResult } from "../store/slices/post/refresh_tokens";
import { RootState } from "../store/store";

const PrivateRoute = () => {
    const useAuth = () => {
        const dispatch = useDispatch();
        let isAuthorized = false;
        const refreshToken = () => {
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                const parts = cookie.split("=");
                if (parts[0] == "refresh_token")
                    {
                        return parts[1]
                    }};
            return ""
        };
        dispatch(setRefreshToken(refreshToken()));
        usePostRefreshGetResult();
        const result: IPostRefreshState = useSelector((state: RootState) => state.refresh);
        localStorage.setItem("access_token", result.access_token);
        document.cookie = `refresh_token=${result.refresh_token}`
        isAuthorized = true;
        return isAuthorized;
    }
    //const auth = true;
    return (
        useAuth() ? <Outlet/> : <Navigate to="login"></Navigate>
    );
};

export default PrivateRoute;