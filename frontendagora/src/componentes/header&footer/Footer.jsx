import React from 'react'
import logosWhite from '../../assets/logos/logosWhite.png'

import './headerFooterStyles.css'

export default function Footer () {
  return (
    <>
      <footer>
        <div className='footerContainer'>
          <p className='sign'>
            Desarrollado por Quackcoders - Prográmate - Educamas ©2021
          </p>

          <div className='socialNetworksContainer'>
            <a
              href='https://www.facebook.com/Somos-EducaM%C3%A1s-109393514766174/'
              target='_blank'
              rel='noreferrer'
            >
              <i style={{color:'white'}} className='fab fa-facebook'></i>
            </a>
            <a
              href='https://www.youtube.com/channel/UCmnr_sLPZ1E8H1VgUtaHGPQ
'
              target='_blank'
              rel='noreferrer'
            >
              <i style={{color:'white'}} className='fab fa-youtube'></i>{' '}
            </a>
            <a
              href='https://www.instagram.com/somoseducamas/'
              target='_blank'
              rel='noreferrer'
            >
              <i style={{color:'white'}} className='fab fa-instagram'></i>
            </a>
          </div>

          <div className='LogosFooterContainer'>
            <img src={logosWhite} alt='Programate-LogoBlanco' />
          </div>
        </div>
      </footer>
    </>
  )
}
