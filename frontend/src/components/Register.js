import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ password, email });
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          className="register__input"
        />
        <span className="register__error" id="register__email-error"></span>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Пароль"
          className="register__input"
        />
        <span className="register__error" id="register__password-error"></span>
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>
      <div>
        <p className="register__subtitle">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__subtitle register__login-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
