import './Auth.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Form from '../Form/Form';
import Input from '../Input/Input';

function Auth({ name }) {
  return (
    <main className='main'>
      <section className='auth'>
        {name === 'profile' ? (
          <div className='profile'>
            <h2 className='profile__heading'>Привет, Виталий!</h2>
            <Form name='profile'>
              <fieldset className='profile__fieldset'>
                <Input label='Имя' type='text' value='Виталий' />
                <Input label='E-mail' type='email' value='pochta@yandex.ru' />
              </fieldset>
            </Form>
            <button className='profile__button'>Выйти из аккаунта</button>
          </div>
        ) : name === 'signup' ? (
          <div className='auth__authorization'>
            <Link to='/'>
              <img className='auth__logo' src={logo} alt='logo' />
            </Link>
            <h2 className='auth__heading'>Добро пожаловать!</h2>
            <Form name='signup'>
              <fieldset className='auth__fieldset'>
                <Input label='Имя' type='text' />
                <Input label='E-mail' type='email' />
                <Input label='Пароль' type='password' />
                <span className='auth__input-error'>Что-то пошло не так...</span>
              </fieldset>
            </Form>
            <p className='auth__paragraph'>
              Уже зарегистрированы?{' '}
              <Link className='auth__link' to='/signin'>
                Войти
              </Link>
            </p>
          </div>
        ) : name === 'signin' ? (
          <div className='auth__authorization'>
            <Link to='/'>
              <img className='auth__logo' src={logo} alt='logo' />
            </Link>
            <h2 className='auth__heading'>Рады видеть!</h2>
            <Form name='signin'>
              <fieldset className='auth__fieldset'>
                <Input label='E-mail' type='email' />
                <Input label='Пароль' type='password' />
              </fieldset>
            </Form>
            <p className='auth__paragraph'>
              Ещё не зарегистрированы?{' '}
              <Link className='auth__link' to='/signup'>
                Регистрация
              </Link>
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default Auth;
