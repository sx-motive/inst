import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Shop() {
  const { isLoading, error, data } = useQuery(['products'], () =>
    fetch(URL).then((res) => res.json())
  );

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <section className='content'>
      <h1>Shop page</h1>
      <ul>
        {isLoading
          ? 'Loading...'
          : data.map((post) => {
              return (
                <li key={post.id}>
                  <Link to={`/shop/product/${post.id}`}>{post.title}</Link>
                </li>
              );
            })}
      </ul>
    </section>
  );
}
