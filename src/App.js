import React from 'react'
import { Forms } from './Components/Forms'
import './App.scss'
import { BrowserRouter,Routes,Route } from 'react-router-dom'; // Import BrowserRouter
import { Footer } from './Components/Footer'
import Navbar from './Components/Navbar'
import Main from './Components/Main';
import Start from './Components/Start';
export const App = () => {
  return (
    <>
      <BrowserRouter>
            <Navbar/>
      
      <Routes>
      <Route index element={< Start/>} />
      <Route path="/docs/*" element={<Main />} />
     
      </Routes>
     
     
      <Footer />
      </BrowserRouter>
    </>
  )
}
