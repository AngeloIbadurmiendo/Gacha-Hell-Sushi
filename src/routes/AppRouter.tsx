import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const AppRouter = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default AppRouter;