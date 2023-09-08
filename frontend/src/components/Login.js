import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!password || !email) {
      return;
    }
    onLogin({ password, email });
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  return (
    <div className="register">
      <h1 className="register__title">Вход</h1>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
