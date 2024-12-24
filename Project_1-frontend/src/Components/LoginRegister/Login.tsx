import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4444/auth/login", {
        username,
        password,
      });

      // Assuming the response contains the user data and role
      const { token, role, userId } = response.data;
      console.log("Role received:", role);

      // Save the token and user details in localStorage for session persistence
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      console.log(response.data);
     
      // Navigate based on the user's role
      if (role === "manager") {
        navigate("/manager-dashboard");
      } else if (role === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/"); // Default redirection (you can handle this as needed)
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="text-center mb-4">
            <h2>Login</h2>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button onClick={handleLogin} className="w-48">
                Login
              </Button>
              <Button
                className="btn-info w-48"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
