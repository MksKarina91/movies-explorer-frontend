import './Portfolio.css';
import icon from '../../images/portfolioIcon.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__heading'>Портфолио</h3>
      <nav className='portfolio__navigation'>
        <ul className='portfolio__unordered-list'>
          <li className='portfolio__list-item'>
            <a className='portfolio__link' href='https://github.com/MksKarina91/how-to-learn/' target='_blank' rel='noopener noreferrer'>
              <h3 className='portfolio__project'>Статичный сайт</h3>
              <img className='portfolio__icon' src={icon}
              alt='Ссылка на портфолио'/>
            </a>
          </li>
          <li className='portfolio__list-item'>
            <a className='portfolio__link' href='https://github.com/MksKarina91/russian-travel/' target='_blank' rel='noopener noreferrer'>
              <h3 className='portfolio__project'>Адаптивный сайт</h3>
              <img className='portfolio__icon' src={icon}
              alt='Ссылка на портфолио'/>
            </a>
          </li>
          <li className='portfolio__list-item'>
            <a className='portfolio__link' href='https://github.com/MksKarina91/react-mesto-api-full-gha/' target='_blank' rel='noopener noreferrer'>
              <h3 className='portfolio__project'>Одностраничное приложение</h3>
              <img className='portfolio__icon' src={icon}
              alt='Ссылка на портфолио'/>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
