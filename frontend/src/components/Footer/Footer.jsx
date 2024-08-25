import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quos provident accusantium, molestias quas quam repellat ullam. Est deleniti iusto animi ex placeat inventore ullam similique, repellendus doloribus alias consequatur.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 00000-00000</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>

      </div>
      <hr />
      <p className='footer-copyrigt '>Copyright 2024 -All Right Reserved</p>
    </div>
  )
}

export default Footer