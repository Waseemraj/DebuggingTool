// Left.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Left.scss'
export default function Left() {
  return (
    <div className="left_box" >
      <div className="sidebar">
   <div className="build">
    Build
   </div>
      <Link  className='Link' to="/docs">Getting Started</Link>
      <Link className='Link' to="/docs/tool">Diagnostic Tool</Link>
      </div>
    </div>
  );
}
