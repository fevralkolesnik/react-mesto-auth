import { Link } from "react-router-dom";
import WindowWithForm from "./WindowWithForm";

export default function Register (props) {

    const {onRegister} = props;

    function handleRegister (formValue) {
        onRegister(formValue.email, formValue.password);
    }

    return (
        <WindowWithForm name='register' title='Регистрация' buttonText='Зарегестрироваться' submitForm={handleRegister}>
            <p className="form__text">Уже зарегестрировались?
                <Link to='/signin' className="form__link"> Войти </Link>
            </p>
        </WindowWithForm>

    )
} 