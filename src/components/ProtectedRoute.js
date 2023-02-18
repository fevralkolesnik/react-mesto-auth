import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function ProtectedRouteElement (props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        currentUser.loggedIn ? <props.component {...props} /> : <Navigate to='/signin' replace />
    )
}  