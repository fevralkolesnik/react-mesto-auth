import WindowWithForm from "./WindowWithForm";

export default function Login(props) {
  const { onLogin } = props;

  function handleLogin(formValue) {
    onLogin(formValue.email, formValue.password);
  }

  return (
    <WindowWithForm
      name="login"
      title="Вход"
      buttonText="Войти"
      submitForm={handleLogin}
    />
  );
}
