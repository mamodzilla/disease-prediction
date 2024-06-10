import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useActionData } from "react-router-dom";
import { setTokens } from "../store/slices/post/login";
import { IPostRefresh, IPostRefreshState, setRefreshToken, usePostRefreshGetResult } from "../store/slices/post/refresh_tokens";
import { RootState } from "../store/store";

const PrivateRoute = () => {
    const auth = () => {
        const dispatch = useDispatch();
        let isAuthorized = false;
        const accessToken = localStorage.getItem('access_token');
        if (accessToken !== null) {
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                const parts = cookie.split("=");
                if (parts[0] == "refresh_token")
                    {
                        dispatch(setRefreshToken(parts[1]));
                        usePostRefreshGetResult();
                        const result: IPostRefreshState = useSelector((state: RootState) => state.login);
                        localStorage.setItem("access_token", result.access_token);
                        document.cookie = `refresh_token=${result.refresh_token}`
                        isAuthorized = true;
                    }
            }
            
        }
        return isAuthorized;
    }
    //const auth = true;
    return (
        auth() ? <Outlet/> : <Navigate to="login"></Navigate>
    );
};

export default PrivateRoute;