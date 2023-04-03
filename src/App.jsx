import { Routes, Route } from 'react-router-dom';
import Movies from './Movies';
import MovieDetail from './MovieDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="/movie-detail/:slug" element={<MovieDetail />} />
    </Routes>
  );
}