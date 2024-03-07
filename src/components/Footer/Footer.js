import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__paragraph'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__copyright'>&#169; {new Date().getFullYear()} </p>
        <nav className='footer__navigation'>
          <ul className='footer__link-list'>
            <li className='footer__link-item'>
              <a className='footer__link' href='https://practicum.yandex.ru' target='_blank' rel='noopener noreferrer'>
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a className='footer__link' href='https://github.com/MksKarina91' target='_blank' rel='noopener noreferrer'>
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
