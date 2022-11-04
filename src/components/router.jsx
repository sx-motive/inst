import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Index from '../pages/index';
import About from '../pages/about';
import NotFound from '../pages/notfound';

import Blog from '../pages/blog';
import Post from '../pages/blog/post';

import Shop from '../pages/shop';
import Product from '../pages/shop/product';

export default function Router() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Index />} />
      <Route path='/about' element={<About />} />
      <Route path='/blog'>
        <Route index element={<Blog />} />
        <Route path='post/:id' element={<Post />} />
      </Route>
      <Route path='/shop'>
        <Route index element={<Shop />} />
        <Route path='product/:id' element={<Product />} />
      </Route>
    </Routes>
  );
}
