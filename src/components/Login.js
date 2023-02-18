import WindowWithForm from "./WindowWithForm";
import { useNavigate } from "react-router-dom";
import { authorize } from '../auth.js'; 

export default function Login (props) {

    const {handleLoggedIn} = props;

    const navigate = useNavigate();

    function handleLogin (formValue) {
        authorize(formValue.email, formValue.password)
        .then ((res) => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                handleLoggedIn(formValue.email);
                navigate('/', {replace: true});
            }
        }) 
        .catch((err) => console.log(err));
    }

    return (
        <WindowWithForm name='login' title='Вход' buttonText='Войти' submitForm={handleLogin} />
    )
}