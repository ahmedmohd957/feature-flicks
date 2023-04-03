import { useEffect } from 'react';
import { useState } from 'react';
import { useStates } from './utilities/states';
import { kebabify } from './utilities/kebabify';
import Movie from './Movie';

export default function Movies() {

    const s = useStates('main', {
        movies: [],
    });
    const [moviesByDate, setMoviesByDate] = useState(new Map());

    useEffect(() => {
        (async () => {
        // fetch alll movies from the REST api
        let movies = await (await fetch('/api/movies')).json();
        // fetch alll screenings from the REST api
        let screenings = await (await fetch('/api/screenings')).json();
        // add a slug to be used in url routes to each movie
        for (let movie of movies) {
            movie.slug = kebabify(movie.title);
            movie.screening = screenings.find(screening => screening.movieId === movie.id);
        }
        // group the movies by screening date
        let moviesByDate = new Map();
        for (let movie of movies) {
            let date = new Date(movie.screening.time).toDateString();
            if (!moviesByDate.has(date)) {
            moviesByDate.set(date, []);
            }
            moviesByDate.get(date).push(movie);
        }
        // store the movies in our state variable
        s.movies = movies;
        // store the movies grouped by date in our state variable
        setMoviesByDate(moviesByDate);
        })();
    }, []);

    return (
        <>
        {[...moviesByDate].map(([date, movies]) => (
            <section key={date}>
            <h2>{date}</h2>
            {movies.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}
            </section>
        ))}
        </>
    );
}