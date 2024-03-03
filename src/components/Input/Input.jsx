import { useLocation } from 'react-router-dom';
import './Input.css';

function Input({ label, type, value, placeholder }) {
  const location = useLocation();

  return location.pathname !== '/profile' ? (
    <>
      <label className='auth__label'>
        {label}
        <input className='auth__input' type={type} name='name' value={value} placeholder={placeholder} minLength={2} maxLength={40} required />
      </label>
    </>
  ) : (
    <>
      <label className='profile__label'>
        {label}
        <input className='profile__input' type={type} name='name' value={value} placeholder={placeholder} minLength={2} maxLength={40} required />
      </label>
    </>
  );
}

export default Input;
