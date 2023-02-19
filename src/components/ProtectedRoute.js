import { Navigate } from "react-router-dom";

export default function ProtectedRouteElement (props) {

    return (
        props.isLoggedIn ? <props.component {...props} /> : <Navigate to='/signin' replace />
    )
}  