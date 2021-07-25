import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import CartLink from "./Cart/CartLink";
import LoginLink from "./LoginLink";
import { useUserContext } from "../context/user";

export default function Header() {
  const { user } = useUserContext();
  return (
    <header className='header'>
      <img
        src={logo}
        alt='tech store logo'
        className='logo'
      />
      <nav>
        <ul>
          <div className=''>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>about</Link>
            </li>
            <li>
              <Link to='/products'>products</Link>
            </li>
            {user.token && (
              <li>
                <Link to='/checkout'>checkout</Link>
              </li>
            )}
          </div>
          <div>
            <li>
              <LoginLink />
            </li>
            <li>
              <CartLink />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
