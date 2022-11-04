import React from 'react';
import btoa from 'btoa';

import { BrowserRouter } from 'react-router-dom';
import RestoreScroll from './restoreSroll';
import Router from './router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from '../components/header';

const queryClient = new QueryClient();

export default function Layout() {
  // const URL = import.meta.env.VITE_WP_BACKEND_URL;
  // const AUTHUSER = import.meta.env.VITE_WP_USER_KEY;
  // const AUTHPASS = import.meta.env.VITE_WP_SECRET_KEY;

  // const getData = async () => {
  //   const auth = AUTHUSER + ':' + AUTHPASS;
  //   const res = await fetch(URL, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Basic ${btoa(auth)}`,
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Router />

        <RestoreScroll />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
