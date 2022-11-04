import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Product() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(['product'], () =>
    fetch(URL + id).then((res) => res.json())
  );

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <section className='content'>
        <h1>Product page</h1>
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
          </>
        )}
      </section>
    </>
  );
}
