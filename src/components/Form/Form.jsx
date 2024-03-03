import './Form.css';

function Form({ name, children }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form className={`form ${name === 'signup' ? 'form__signup' : name === 'signin' ? 'form__signin' : ''}`} name={name} onSubmit={handleSubmit}>
        {children}
        {name === 'profile' ? (
          <button className='form__profile-button'>Редактировать</button>
        ) : (
          <button className='form__auth-button'>{name === 'signup' ? 'Зарегистрироваться' : name === 'signin' ? 'Войти' : ''}</button>
        )}
      </form>
    </>
  );
}

export default Form;
