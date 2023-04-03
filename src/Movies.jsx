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
    const [filteredMoviesByDate, SetFilteredMoviesByDate] = useState(new Map());
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);


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
        SetFilteredMoviesByDate(moviesByDate);
        getCategories(moviesByDate);
        })();
    }, []);

    function getCategories(moviesByDate) {
        const categoriesSet = new Set();
        for (let [date, movies] of moviesByDate) {
            const movieCategories = movies.flatMap(movie => movie.description.categories);
            for (let category of movieCategories) {
                categoriesSet.add(category);
            }
        }
        const categoriesArr = Array.from(categoriesSet);
        setCategories(categoriesArr);
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            SetFilteredMoviesByDate(moviesByDate);
        } else {
            const t = new Map();
            for (let [date, movies] of moviesByDate) {
                let filteredMovies = movies.filter(movie => movie.description.categories.includes(category));
                t.set(date, filteredMovies);
            }
            for (let [date, movies] of t) {
                if (movies.length === 0) {
                    t.delete(date);
                }
            }
            SetFilteredMoviesByDate(t);
        }
    }

    return (
        <>
        <div>
            <label htmlFor="category-select">Select a category:</label>
            <select id="category-select" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value={null}>All</option>
                {categories.map(category => <option value={category}>{category}</option>)}
            </select>
        </div>
        {[...filteredMoviesByDate].map(([date, movies]) => (
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