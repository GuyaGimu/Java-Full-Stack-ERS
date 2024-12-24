import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const RegisterUser: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: "", // Default role
    });

    const navigate = useNavigate(); // Hook for navigation

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestData = {
            reimbId: 5,
            ...formData,
        };

        try {
            const response = await axios.post("http://localhost:4444/users", requestData);
            console.log("User created successfully:", response.data);
            alert("User created successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. Please try again.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto p-4 border rounded shadow-sm bg-light">
                    <h2 className="text-center mb-4">Register New User</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="firstName" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="lastName" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="role" className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Enter role"
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" className="me-2">
                                Register
                            </Button>
                            <Button variant="secondary" onClick={() => navigate("/")}>
                                Back
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
