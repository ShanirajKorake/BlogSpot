import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className='py-3 shadow bg-black border-b-2 border-b-gray-600'>
      <Container>
        <nav className='flex items-center justify-between flex-wrap'>
          <div className='flex items-center flex-shrink-0 text-white mr-6'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <div className='block lg:hidden'>
            <button
              onClick={toggleMenu}
              className='flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white'
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? '' : 'hidden'}`}>
            <ul className='lg:flex lg:ml-auto'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMenuOpen(false);
                      }}
                      className='inline-block px-4 py-2 duration-200 hover:font-bold rounded-full'
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header