import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {  Usermapping } from './Contexts/Usercontext'

import reportWebVitals from './reportWebVitals';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Usermapping>
    <App />
    </Usermapping>
);


reportWebVitals();
