import React from 'react'
import Right from './Right'
import Left from './Left'
import { Routes, Route } from 'react-router-dom';
import Diagnostic_tool from './Diagnostic_tool';
import Sideborder from './Sideborder';
export default function Main() {
  return (
    <>
    <div className='Main_container' style={{display:'flex'}} >
        <Left/>
        <Sideborder/>
        <Right/>
        
        
        </div></>
  )
}
