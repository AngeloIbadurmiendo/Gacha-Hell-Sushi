import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition-colors">
          FUKUSUKE
        </Link>
        <div className="text-lg">
          — 5 U S H I —
        </div>
      </div>
    </nav>
  );
};

export default NavBar;