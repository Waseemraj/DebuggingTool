import React from 'react'
import { Forms } from './Components/Forms'
import ButtonAppBar from './Components/Appbar'
import {  Usermapping } from './Contexts/Usercontext'
import './App.scss'
import { Footer } from './Components/Footer'
export const App = () => {
  return (
    <div className='main'>
      <Usermapping>
      <ButtonAppBar />
      <br />
      <Forms />
      <br />
      </Usermapping>
      <Footer />
    </div>
  )
}
