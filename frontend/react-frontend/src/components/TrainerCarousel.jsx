import { useRef } from "react";
import trainer_woman from '../assets/img/trainer_woman.jpg'

function TrainerCarousel({trainers}){
    const containerRef = useRef(null)

    function getScrollAmount(){
        const container = containerRef.current
        if (!container) return 0

        return Math.max(240, Math.floor(container.clientWidth * 0.9))
    }

    function handlePrev(){
        const container = containerRef.current

        if(!container) return;

        container.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth', 
        })
    }

    function handleNext(){
        const container = containerRef.current
        if (!container) return;

        container.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        })
    }

    return (
        <div className="main-content-trainers-carousel">
      <button
        className="carousel-btn-prev"
        onClick={handlePrev}
      >
        ←
      </button>

      <div
        className="carousel-container"
        data-carousel
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: "20px",
        }}
      >
        {trainers.map((trainer) => (
          <div className="trainer-card" key={trainer.id}>
            <img
              src={trainer_woman}
              alt="trainer"
            />
            <p>Петрова Анна</p>
            <p>{trainer.description}</p>
          </div>
        ))}
      </div>

      <button
        className="carousel-btn-next"
        onClick={handleNext}
      >
        →
      </button>
    </div>
    )
}