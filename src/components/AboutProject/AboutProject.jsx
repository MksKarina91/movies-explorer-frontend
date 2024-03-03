import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about'>
      <h2 className='about__heading'>О проекте</h2>
      <div className='about__information-containers'>
        <div className='about__information-container'>
          <h3 className='about__information-heading'>Дипломный проект включал 5 этапов</h3>
          <p className='about__information-paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about__information-container'>
          <h3 className='about__information-heading'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__information-paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about__diagram'>
        <p className='about__diagram-backend-week'>1 неделя</p>
        <p className='about__diagram-frontend-week'>4 недели</p>
        <p className='about__diagram-area'>Back-end</p>
        <p className='about__diagram-area'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
