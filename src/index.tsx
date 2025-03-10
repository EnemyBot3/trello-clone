import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyleSheetManager } from 'styled-components';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

        <App />
      
);
