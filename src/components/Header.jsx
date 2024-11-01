import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header({logout}) {
    return (
        <>
            <Navbar className="bg-warning border-0" style={{ height: '70px' }}>
                <Container>
                    <Navbar.Brand href="#home" className='text-white fw-bold'>
                        <i className=" fa-lg" />
                        {' '}
                        studentManagement
                    </Navbar.Brand>
                    <button className='btn btn-primary' onClick={logout}>Log out</button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header