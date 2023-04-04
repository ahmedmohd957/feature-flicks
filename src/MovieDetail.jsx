import { useParams } from 'react-router-dom';
import { useStates } from './utilities/states';
import NavBar from './Navbar';
import { Container, Row, Col } from 'react-bootstrap';


export default function () {

  // read the slug param from the url
  const { slug } = useParams();

  // read the shared state/context main
  // that was set in App and contains the movie list
  const s = useStates('main');

  // find our movie and deconstruct properties from it to variables
  const movie = s.movies.find(movie => movie.slug == slug);
  const { title, description } = movie;
  const { length, categories, posterImage } = description;

  return (
    <>
      <NavBar />
      <Container className="mt-3">
        <Row>
          <Col md={4}>
            <img src={'https://cinema-rest.nodehill.se' + posterImage} alt={title} className="w-100" />
          </Col>
          <Col md={8}>
            <h1>{title}</h1>
            <h4>Length: {Math.floor(length / 60)}h {length % 60}min</h4>
            <h4>Categories: {categories.join(', ')}</h4>
          </Col>
        </Row>
      </Container>
    </>
  )
}