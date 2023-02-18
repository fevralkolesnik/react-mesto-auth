import { Link, useNavigate } from "react-router-dom";
import WindowWithForm from "./WindowWithForm";
import { register } from '../auth.js'; 

export default function Register (props) {

    const {onResult, onModalWindow} = props;
    const navigate = useNavigate();

    function handleRegister (formValue) {
        register(formValue.email, formValue.password)
        .then((res) => {
            if (res.status < 400) {
                onResult(true);
                onModalWindow();
                navigate('/signin', {replace: true});
            }
            else {
                onResult(false);
                onModalWindow();
            }
        })
        .catch((err) => console.log(err));
    }

    return (
        <WindowWithForm name='register' title='Регистрация' buttonText='Зарегестрироваться' submitForm={handleRegister}>
            <p className="form__text">Уже зарегестрировались?
                <Link to='/signin' className="form__link"> Войти </Link>
            </p>
        </WindowWithForm>

    )
}