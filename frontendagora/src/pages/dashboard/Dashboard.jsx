import TitleSection from '../../componentes/titles/TitleSection'
import Chart from './charts/Chart'
import React, { useEffect, useState } from 'react'
import * as controllerDashBoard from './controllerDashBoard.jsx'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Link } from 'react-router-dom'
import '../projects/trainer/showProjects/showProjects.css'

const Dashboard = () => {
  const projects = useSelector(state => state.projects)
  const annuncies = useSelector(state => state.annuncies)
  const [, /*competencies*/ setCompetencies] = useState()
  const [exito, setExito] = useState()
  const [promo, setPromo] = useState()
  const id = 2
  let addOutcomeStudents = 0
  let LevelsEvaluate = 0
  let alumsOutcome = 0
  ////////////esta es la tasa de exito!!!!!!!!!!///////////////
  let rateSucces = 0
  /////////////////////////////////////////////////////////////

  ////////////esta es el indice de avance//////////////////////
  let progressClass = 0
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    const list = async () => {
      try {
        const res = await controllerDashBoard.listDash(id)
        const data = await res.json()
        setCompetencies(data)
        success(data)
        levelsOfEvaluate(data)
        evaluateOutcome(data)

        //////////////////////////////
      } catch (error) {
        console.log(error)
      }
    }

    list()
  }, [])

  const aux = []

  // funcion suma matrix
  const sumaArray = array => {
    let suma = 0
    array.map(element => {
      suma += element
    })
    return suma
  }
  //numerador de las fracciones
  const success = data => {
    data.map((e, index) => {
      //  console.log(JSON.parse(`[${e.result[0]}]`))
      aux[index] = JSON.parse(`[${e.result[0]}]`)
    })
    // console.log(aux)
    aux.map(a => {
      addOutcomeStudents += sumaArray(a)
    })
    // console.log(addOutcomeStudents,'addstudent')
  }
  //Denominador tasa de exito: Cantidad total de niveles de competencias evaluadas por los briefings de la clase

  const levelsOfEvaluate = data => {
    data.map(l => {
      LevelsEvaluate += sumaArray(l.outcomes)
    })
    ////////////esta es la tasa de exito!!!!!!!!!!///////////
    if (LevelsEvaluate === 0) {
      rateSucces = 0
    } else {
      rateSucces = parseInt((addOutcomeStudents / LevelsEvaluate) * 100)
      //console.log('tasa de exito',rateSucces,'%')
      setExito(rateSucces)
    }
  }

  //Denominador indice de avance: Cantidad total de niveles de competencias por la cantidad de alumnos.

  const evaluateOutcome = data => {
    //////////// 6 competncias X 3 niveles X el numero de alumnos////////////////////////
    alumsOutcome = 6 * 3 * data.length
    if (alumsOutcome === 0) {
      progressClass = 0
    } else {
      progressClass = parseInt((addOutcomeStudents / alumsOutcome) * 100)
      //console.log('progreso de la clase',progressClass,'%')
      setPromo(progressClass)
    }
  }

  const newdateFormat = date => {
    let newDate = new Date(date).toLocaleString()
    return newDate
  }

  return (
    <>
      <TitleSection name='Bienvenido a Prográmate Dashboard' />
      <div className='chartContainerMain'>
        <div className='chartsContainer'>
          <div className='chartContainer'>
            <p className='nameChart'>Progreso de la promo</p>
            <Chart color='#FFC107' number={promo} />
          </div>
          <div className='chartContainer'>
            <p className='nameChart'>Tasa de éxito de la promo</p>
            <Chart color='#0D9603' number={exito} />
          </div>
        </div>

        <div className='containerAnnounce'>
          <p className='TitleAnnounce'>Anuncios recientes</p>
          {annuncies.map((el, i) => (
            <div key={i} className='announceContainerDash'>
              <h5>{el.titleAnnouncement}</h5>
              <div className='textAnnouncementContainerDash'>
                <p>{el.textAnnouncement}</p>
                <small>
                  <b>{newdateFormat(el.updatedAt)}</b>
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TitleSection name={'Briefs de la promo'} />
      <div className='carouselContainer'>
        <Swiper
          breakpoints={{
            470: {
              spaceBetween: 200,
              slidesPerView: 2
            },
            700: {
              spaceBetween: 250,
              slidesPerView: 3
            },

            1200: {
              spaceBetween: 50,
              slidesPerView: 4
            }
          }}
          // onSlideChange={() =>}
          // onSwiper={(swiper) =>}
        >
          <div className='cardsGrid'>
            {projects.map((project, i) => (
              <SwiperSlide key={i}>
                <div  className='cardProject'>
                  <div className='imgProject'></div>
                  <div className='cardContent'>
                    <h5 className='titleProject'>{project.name}</h5>
                    <div className='descriptionContainer'>
                      <p className='descriptionProject'>
                        {project.description}
                      </p>
                    </div>
                    <div className='buttonContainer'>
                      <Link
                        to={`/proyectos/${project.id}`}
                        className='btnProject'
                      >
                        Ver mas
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  )
}

export default Dashboard
