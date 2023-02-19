import { useState } from "react";

export default function WindowWithForm(props) {
  const { name, title, buttonText, children, submitForm } = props;

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    submitForm(formValue);
  }

  return (
    <div className={`form form__${name}`}>
      <h3 className="form__title">{title}</h3>
      <form
        className={`form__form popup__form_type_${name}`}
        name={name}
        onSubmit={handleSubmit}
      >
        <label className="form__form-field">
          <input
            className="form__input"
            type="email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error profileName-error"></span>
        </label>

        <label className="form__form-field">
          <input
            className="form__input"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error profileName-error"></span>
        </label>
        <button
          className="form__submit-button"
          type="submit"
          aria-label="Отправить форму"
        >
          {buttonText}
        </button>
      </form>
      {children}
    </div>
  );
}
