import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className='mb-4'>
        <Container>
            <Navbar.Brand>Feature Flicks</Navbar.Brand>
        </Container>
    </Navbar>
  )
}

export default NavBar