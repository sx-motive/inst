import React from 'react';
import { NavLink } from 'react-router-dom';
import { BagIcon } from './icons';

export default function Header() {
  return (
    <header className='header'>
      <div className='col logo'>Logo</div>
      <div className='col nav'>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Index</NavLink>
            </li>
            <li>
              <NavLink to='/about'>About</NavLink>
            </li>
            <li>
              <NavLink to='/blog'>Blog</NavLink>
            </li>
            <li>
              <NavLink to='/shop'>Shop</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='col bar'>
        <div className='icon'>
          <BagIcon />
        </div>
      </div>
    </header>
  );
}
