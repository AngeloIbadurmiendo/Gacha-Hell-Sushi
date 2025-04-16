import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Iniciá sesión', path: '/login' },
  { name: 'Tu cuenta', path: '/profile' },
];

const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <nav className="bg-[#FDF0D5] text-black shadow-xl mb-1 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 max-w-screen-xl">
        {/* Hamburger Menu */}
        <div className="flex items-center md:hidden">
          <button onClick={handleOpenDrawer} className="text-black focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mx-auto md:mx-0">
          <Link to="/" className="mx-auto">
            <img
              src="./logo_fukusuke.jpg"
              alt="Logo Fukusuke"
              className={`object-contain ${windowWidth <= 600 ? 'h-8 w-20' : 'h-10 w-28'}`}
            />
          </Link>
        </div>

        {/* Desktop Sections */}
        <div className="hidden md:flex space-x-6">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              className="text-black hover:text-gray-300 transition-colors"
            >
              {page.name}
            </Link>
          ))}
        </div>

        {/* Cart Icon */}
        <div className="flex items-center">
          <Link to="/cart" className="text-black focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h14l-2-5M9 21h6M9 21a2 2 0 11-4 0M15 21a2 2 0 104 0" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
          onClick={handleCloseDrawer}
        >
          <div
            className="bg-[#fdf0d5] w-64 h-full shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleCloseDrawer} className="text-gray-800 focus:outline-none mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="space-y-4">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link
                    to={page.path}
                    className="text-gray-800 hover:text-gray-600 transition-colors"
                    onClick={handleCloseDrawer}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/cart"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  onClick={handleCloseDrawer}
                >
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
