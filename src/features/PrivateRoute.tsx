import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const auth = true;
    return (
        auth ? <Outlet/> : <Navigate to="login"></Navigate>
    );
};

export default PrivateRoute;