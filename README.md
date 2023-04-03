# feature-flicks

## Components

The app consists of three components:

**App.jsx: This component defines the routes of the application using react-router-dom. It contains two routes: one for the movie listing page (`<Movies />`) and one for the movie detail page (`<MovieDetail />`).

_Movies.jsx:_ This component is responsible for displaying the list of movies grouped by screening date. It fetches the movies and screenings data from the server, groups the movies by date, and sorts them by time. It also allows the user to filter movies by category. The component uses useStates custom hook to manage the state.

_Movie.jsx:_ This component displays a single movie on the movie listing page. It is used by the Movies.jsx component.
