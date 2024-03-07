import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page404.css';

function Page404() {
  const navigate = useNavigate();

  const turnBack = () => {
      navigate(-1);
  }
  return (
    <main className='main'>
      <section className='page-404'>
          <h1 className='page-404__heading'>404</h1>
          <p className='page-404__paragraph'>Страница не найдена</p>
          <button className='page-404__link' onClick={turnBack}>
            Назад
          </button>
      </section>
    </main>
  );
}

export default Page404;
