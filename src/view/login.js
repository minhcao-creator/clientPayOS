import NavbarMenu from '../component/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = async () => {
        const response = await axios.post("https://payos.onrender.com/auth/login", {
            username,
            password
        })
        if (response.data.success) {
            localStorage.setItem("payOSUserToken", response.data.accessToken)
            navigate(-1)
        }
    }

    return (
        <div>
            <NavbarMenu />
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Form className="border border-success bg-success-subtle p-5 rounded">
                    <h5 className="d-flex justify-content-center align-items-center mb-4 font-weight-bold">LOGIN</h5>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username}
                            onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your password with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mt-5 d-flex align-items-center justify-content-between" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                        <Button variant="outline-success" onClick={handleLogin}>
                            Login
                        </Button>
                    </Form.Group>
                    <Form.Group className="mt-4 d-flex align-items-center justify-content-between" controlId="formBasicCheckbox">
                        <Form.Label>Don't have an account?</Form.Label>
                        <Link to='/register'>
                            <Button variant='outline-dark'>
                                Register
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
            </div>

        </div>


    );
}

export default Login;