import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { RecoilRoot } from 'recoil';

import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('wrapper')).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
