import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer>
      <div className='info'>
        
        <p>Made by Ashish Barnwal with ❤️ <br />More ways to shop: Find an Apple Store or other retailer near you. Or call 1-800-MY-APPLE</p>
        <img src="/logo.svg" alt="Apple logo" />
      </div>

      <hr />

      <div className='links'>
        
        <p>Copyright © 2026 Apple Inc. All rights reserved.</p>
        <ul>
          {footerLinks.map(({label, url}) => (
            <li key={label}>
              <a href={url}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer