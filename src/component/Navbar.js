import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import { useState } from 'react'


function NavbarMenu({ handleOrder, user, setUser }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-success-subtle p-3" sticky='top'>
                    <Container fluid>
                        <Navbar.Brand className='font-weight-bolder'>Offcanvas</Navbar.Brand>
                        <Nav className='w-50'>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-4"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Nav>
                        <Nav>
                            <Button
                                variant="outline-danger"
                                onClick={handleOrder}
                            >Cart</Button>
                        </Nav>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleShow} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            show={show}
                            onHide={handleClose}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 m-2">
                                    <Nav.Link className='mb-2'>Home</Nav.Link>
                                    <Nav.Link className='mb-2'>Link</Nav.Link>
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        className='mb-5'
                                    >
                                        <NavDropdown.Item>
                                            Action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item >
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item >
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                </Nav>
                                <Nav className="position-absolute bottom-0 m-5 w-75">
                                    {user ?
                                        <>
                                            <h5 className='mb-4'>Hello {user.username}</h5>
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    localStorage.removeItem("payOSUserToken")
                                                    setAuthToken(null)
                                                    handleClose()
                                                    setUser(null)
                                                    navigate('/')
                                                }}>Logout</Button>
                                        </>
                                        : <Button
                                            variant="success"
                                            onClick={() => navigate('/login')}
                                        >Login</Button>
                                    }
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default NavbarMenu;