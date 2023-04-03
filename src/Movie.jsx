import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { format, utcToZonedTime } from 'date-fns-tz';

const Movie = ({ movie }) => {

  function formatMovieDate(date) {
    const zonedDate = utcToZonedTime(date, 'UTC');
    const formattedDate = format(zonedDate, 'dd MMM yyy');
    return formattedDate;
  }

  function formatMovieTime(date) {
    const zonedDate = utcToZonedTime(date, 'UTC');
    const formattedTime = format(zonedDate, 'HH:mm');
    return formattedTime;
  }

  return (
    <Link to={'/movie-detail/' + movie.slug}>
        <Card className='movie'>
          <Card.Img variant="top" src={'https://cinema-rest.nodehill.se' + movie.description.posterImage} style={{ height: '380px', objectFit: 'cover', objectPosition: 'top' }} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {movie.description.categories.join(" / ").replace(/\/\s*$/, "")}
            </Card.Subtitle>
            <Card.Text className='mb-2'>
              {Math.floor(movie.description.length / 60)}h {movie.description.length % 60}min
            </Card.Text>
            <Card.Text>
              {formatMovieDate(new Date(movie.screening.time))}, {formatMovieTime(new Date(movie.screening.time))}
            </Card.Text>
          </Card.Body>
        </Card>
    </Link>
  )
}

export default Movie