import React from 'react'
import { Link } from 'react-router-dom'

const Movie = ({ movie }) => {
  return (
    <Link to={'/movie-detail/' + movie.slug}>
        <div className="movie">
            <h3>{movie.title}</h3>
            <p>{new Date(movie.screening.time).toDateString()} {new Date(movie.screening.time).toLocaleTimeString()}</p>
            <img src={'https://cinema-rest.nodehill.se' + movie.description.posterImage} />
            <p>Length {movie.description.length}</p>
            <hr />
        </div>
    </Link>
  )
}

export default Movie