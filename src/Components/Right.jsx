import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Diagnostic_tool from './Diagnostic_tool';
import Main from './Main';
import Gettingstarted from './Gettingstarted';
import Tool from './Tool';

export default function Right() {
  
  return (
    <>
      <div className=" w-[77.6vw] h-[71.5vh]">
      <Routes>
      <Route index element={< Gettingstarted/>} />
      
        <Route path="tool" element={<Diagnostic_tool />} />
        <Route path="tool/:maporsub" element={<Tool />} />
       

        </Routes>
        
      </div>
    </>
  );
}
//