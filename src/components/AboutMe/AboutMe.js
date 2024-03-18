import React from 'react';
import './AboutMe.css';
import portrait from '../../images/portrait.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__heading'>Студент</h2>
      <div className='about-me__info'>
        <div className='about-me__info-description'>
          <h3 className='about-me__name'>Карина</h3>
          <p className='about-me__short-description'>Веб-разработчик, 32 лет</p>
          <p className='about-me__full-description'>
          Я родилась в Саратовской области, закончила СГТУ по специальности социально-культурный сервис и туризм. У меня есть муж и сын. Я люблю путешествовать, а ещё увлекаюсь сноубордом.
            Недавно начала кодить. С 2019 года работаю в компании Туту. Для выполнения многих задач требуется знание программирования, поэтому я прошла курс по веб-разработке.
          </p>
          <a className='about-me__link' href='https://github.com/MksKarina91' target='_blank' rel='noopener noreferrer'>
            Github
          </a>
        </div>
        <img className='about-me__portrait' src={portrait} alt='Портрет студента.' />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
