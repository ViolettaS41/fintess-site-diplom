import { Link } from 'react-router-dom'
import './Home.css'
import dumpbells from '../assets/img/dumbbells.jpg'
import trainers from '../assets/img/trainer.jpg'
import yoga from '../assets/img/yoga.jpg'
import fitness from '../assets/img/fitness.jpg'
import group from '../assets/img/group.jpg'
import trainer_man from '../assets/img/trainer_man.jpg'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Home() {

    const [trainers_info, setTrainers] = useState([])

    const carouselRef = useRef(null)
    
    

    // Прокрутка на один элемент
    const scrollPrev = () => {
        const container = carouselRef.current
        if (container) {
            const width = container.firstChild.offsetWidth + 20 // ширина слайда + gap
            container.scrollBy({ left: -width, behavior: 'smooth' })
        }
    }

    const scrollNext = () => {
        const container = carouselRef.current
        if (container) {
            const width = container.firstChild.offsetWidth + 20
            container.scrollBy({ left: width, behavior: 'smooth' })
        }
    }

    const loadTrainers = async ()=>{
        try {
          const response = await axios.get('http://127.0.0.1:8000/clients/trainers')
          setTrainers(response.data)
        } catch (error){
          console.log(error)
        }
      }
      useEffect(()=> {
        loadTrainers()
      }, [])

    return (
        <main className="home-page">
        <div className="container">
            <div className="main-inner">
                <div className="main-content">
                    <h1 className="main-content-title">Современный фитнес-центр для активной жизни PowerZone</h1>
                    <p className="main-content-description">Индивидуальный подход, профессиональные тренеры и удобная онлайн-запись</p>
                    <div className="main-content-buttons">
                        <div className="main-content-button-login">
                            <Link to="/registration">Записаться на тренировку</Link>
                        </div>
                        <div className="main-content-button-schedule">
                            <Link to="/schedule">Посмотреть расписание</Link>
                        </div>
                    </div>
                </div>
                <div className="main-content-about">
                    <h2 className="main-content-about-title" id='about'>О нас</h2>
                    <div className="main-content-about-info">
                       <p className="main-content-about-description">Мы - современный фитнес-центр, который предлагает широкий спектр услуг для всех, кто хочет достичь своей цели. Наши тренеры - профессионалы в своей области, которые помогут вам достичь своих целей.</p>
                        <img className="main-content-about-image" src={dumpbells} alt="about"/> 
                    </div>
                </div>
                <div className="main-content-advantages">
                    <h2 className="main-content-advantages-title">Наши преимущества</h2>
                    <div className="main-content-advantages-info">
                        <div className="main-content-advantages-info-item">
                            <img className="main-content-advantages-info-item-image" src={trainers} alt="advantage"/>
                            <p className="main-content-advantages-info-item-description">Профессиональные тренеры</p>
                        </div>
                        <div className="main-content-advantages-info-item">
                            <img className="main-content-advantages-info-item-image" src={yoga} alt="advantage"/>
                            <p className="main-content-advantages-info-item-description">Современное оборудование</p>
                        </div>
                        <div className="main-content-advantages-info-item">
                            <img className="main-content-advantages-info-item-image" src={fitness} alt="advantage"/>
                            <p className="main-content-advantages-info-item-description">Удобное расписание</p>
                        </div>
                        <div className="main-content-advantages-info-item">
                            <img className="main-content-advantages-info-item-image" src={group} alt="advantage"/>
                            <p className="main-content-advantages-info-item-description">Онлайн-запись без очередей</p>
                        </div>
                    </div>
                </div>
                <div className="main-content-trainers">
                    <h2 className="main-content-trainers-title" id='trainers'>Наши тренеры</h2>
                    <div className="main-content-trainers-carousel">
                        <button className="carousel-btn carousel-btn-prev" type="button" aria-label="Листать тренеров влево" onClick={scrollPrev}>
                            ‹
                        </button>
                        <div className="main-content-trainers-info" id="trainersCarousel" data-carousel ref={carouselRef}>
                            {trainers_info.map((trainer, index)=>(
                                <div key={index} className="main-content-trainers-info-item" >
                                    <img className="main-content-trainers-info-item-image" src={trainer_man} alt="trainer"/>
                                    <p className="main-content-trainers-info-item-description">{trainer.fullname}</p>
                                    <p className="main-content-trainers-info-item-description-text">Специализация {trainer.specialization}</p>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-btn carousel-btn-next" type="button" aria-label="Листать тренеров вправо" onClick={scrollNext}
                        >
                            ›
                        </button>
                    </div>
                </div>
                
                <div className="main-content-direction">
                    <h2 className="main-content-direction-title">Направления тренировок</h2>
                    <div className="main-content-direction-info">
                    <div className="main-content-direction-info-item">
                        <img className="main-content-direction-info-item-image" src={dumpbells} alt="direction"/>
                        <p className="main-content-direction-info-item-description">Силовые тренировки</p>
                    </div>
                    <div className="main-content-direction-info-item">
                        <img className="main-content-direction-info-item-image" src={yoga} alt="direction"/>
                        <p className="main-content-direction-info-item-description">Йога и растяжка</p>
                    </div>
                    <div className="main-content-direction-info-item">
                        <img className="main-content-direction-info-item-image" src={fitness} alt="direction"/>
                        <p className="main-content-direction-info-item-description">Кардио тренировки</p>
                    </div>
                    <div className="main-content-direction-info-item">
                        <img className="main-content-direction-info-item-image" src={group} alt="direction"/>
                        <p className="main-content-direction-info-item-description">Групповые тренировки</p>
                    </div>
                    </div>

                    <div className="main-content-signup" id='contact'>
                        <h3 className="main-content-signup-title">Начните тренироваться уже сегодня!</h3>
                        <div className="main-content-signup-button" onClick={()=> window.location.href='/schedule'}>Записаться онлайн</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}

export default Home