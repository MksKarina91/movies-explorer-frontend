import './AboutMe.css';
import portrait from '../../images/portrait.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__heading'>Студент</h2>
      <div className='about-me__info'>
        <div className='about-me__info-description'>
          <h2 className='about-me__name'>Виталий</h2>
          <p className='about-me__short-description'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__full-description'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className='about-me__link' href='https://github.com/MksKarina91' target='_blank' rel='noopener noreferrer'>
            Github
          </a>
        </div>
        <img className='about-me__portrait' src={portrait} alt='Портрет студента.' />
      </div>
    </section>
  );
}

export default AboutMe;
