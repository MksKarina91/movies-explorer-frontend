import { Link } from 'react-router-dom';
import './Page404.css';

function Page404() {
  return (
    <main className='main'>
      <section className='page-404'>
          <h1 className='page-404__heading'>404</h1>
          <p className='page-404__paragraph'>Страница не найдена</p>
          <Link className='page-404__link' to='/'>
            Назад
          </Link>
      </section>
    </main>
  );
}

export default Page404;
