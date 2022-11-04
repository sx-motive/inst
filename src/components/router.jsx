import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Index from '../pages/index';
import About from '../pages/about';
import NotFound from '../pages/notfound';

export default function Router() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Index />} />
      <Route path='/about' element={<About />} />
    </Routes>
  );
}
