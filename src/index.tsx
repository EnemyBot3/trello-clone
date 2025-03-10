import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router';
import { StyleSheetManager } from 'styled-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <HashRouter>
      <StyleSheetManager shouldForwardProp={prop => prop !== "shake"}>

        <Suspense fallback={ <div> Loading... </div> }>
          <App />
        </Suspense>
      
      </StyleSheetManager>
    </HashRouter>
  // </React.StrictMode>
);
