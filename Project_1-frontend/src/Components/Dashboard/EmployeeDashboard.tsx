import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Form, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const EmployeeDashboard: React.FC = () => {
  const [reimbursements, setReimbursements] = useState<any[]>([]);
  const [pendingReimbursements, setPendingReimbursements] = useState<any[]>([]);
  const [showReimbursements, setShowReimbursements] = useState(false);
  const [showPendingReimbursements, setShowPendingReimbursements] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [newReimbursement, setNewReimbursement] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const fetchReimbursements = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reimbursements/user", {
        params: { userId: user.userId },
      });
      setReimbursements(response.data);
      setShowReimbursements(true);
      setShowPendingReimbursements(false);
      setNewReimbursement(false);
    } catch (error) {
      console.error("Error fetching reimbursements", error);
    }
  };

  const fetchPendingReimbursements = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reimbursements/user", {
        params: { userId: user.userId },
      });
      const pending = response.data.filter((reimb: any) => reimb.status === "PENDING");
      setPendingReimbursements(pending);
      setShowPendingReimbursements(true);
      setShowReimbursements(false);
      setNewReimbursement(false);
    } catch (error) {
      console.error("Error fetching pending reimbursements", error);
    }
  };

  const handleSubmitReimbursement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newReimbursement = {
        description,
        amount: parseFloat(amount),
        status: "PENDING",
        userId: user.userId,
      };
      await axios.post("http://localhost:4444/reimbursement", newReimbursement);
      alert("Reimbursement submitted successfully!");
      setDescription(""); // Clear form fields
      setAmount("");
      setNewReimbursement(false); // Close the form
      fetchReimbursements(); // Optionally refetch reimbursements to update the list
    } catch (error) {
      console.error("Error submitting reimbursement", error);
      alert("Failed to submit reimbursement. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Container>
      <h2 className="my-4">Employee Dashboard</h2>
      <Row className="mb-4">
        <Col>
          <Button className="w-100" onClick={fetchReimbursements}>
            Your Reimbursements
          </Button>
        </Col>
        <Col>
          <Button className="w-100" onClick={fetchPendingReimbursements}>
            Pending Reimbursements
          </Button>
        </Col>
        <Col>
          <Button className="w-100" onClick={() => setNewReimbursement(true)}>
            Submit a New Reimbursement
          </Button>
        </Col>
      </Row>

      {/* All Reimbursements Table */}
      {showReimbursements && (
        <div className="my-4">
          <h3>Your Reimbursements</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map((reimb) => (
                <tr key={reimb.reimbId}>
                  <td>{reimb.reimbId}</td>
                  <td>{reimb.description}</td>
                  <td>${reimb.amount}</td>
                  <td>{reimb.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Pending Reimbursements Table */}
      {showPendingReimbursements && (
        <div className="my-4">
          <h3>Pending Reimbursements</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingReimbursements.map((reimb) => (
                <tr key={reimb.reimbId}>
                  <td>{reimb.reimbId}</td>
                  <td>{reimb.description}</td>
                  <td>${reimb.amount}</td>
                  <td>{reimb.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* New Reimbursement Form */}
      {newReimbursement && (
        <div className="my-4">
          <h3>Submit a New Reimbursement</h3>
          <Form onSubmit={handleSubmitReimbursement}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <div>
              <Button type="submit" className="me-2">
                Submit
              </Button>
              <Button variant="secondary" onClick={() => setNewReimbursement(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}

      <Button variant="danger" onClick={handleLogout} className="mt-4">
        Logout
      </Button>
    </Container>
  );
};