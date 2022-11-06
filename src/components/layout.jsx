import { BrowserRouter } from 'react-router-dom';
import RestoreScroll from './restoreSroll';
import Router from './router';

import Header from '../components/header';

export default function Layout() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <RestoreScroll />
    </BrowserRouter>
  );
}
