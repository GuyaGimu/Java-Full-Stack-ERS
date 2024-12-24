import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Table, Form } from "react-bootstrap";
import axios from "axios";

export const ManagerDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [allReimbursements, setAllReimbursements] = useState<any[]>([]);
  const [pendingReimbursements, setPendingReimbursements] = useState<any[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const [viewAllReimbursements, setViewAllReimbursements] = useState(false);
  const [viewPendingReimbursements, setViewPendingReimbursements] = useState(false);
  const [newReimbursement, setNewReimbursement] = useState({ description: "", amount: 0 });
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:4444/users");
      setUsers(response.data);
    };

    const fetchReimbursements = async () => {
      const response = await axios.get("http://localhost:4444/reimbursement");
      setAllReimbursements(response.data);
      const pendingReimbursements = response.data.filter((reimbursement: any) => reimbursement.status === "PENDING");
      setPendingReimbursements(pendingReimbursements);
    };

    if (showUsers) {
      fetchUsers();
    }

    if (viewAllReimbursements || viewPendingReimbursements) {
      fetchReimbursements();
    }
  }, [showUsers, viewAllReimbursements, viewPendingReimbursements]);

  // Function to update the status of a reimbursement
  const handleStatusChange = async (reimbId: number, newStatus: string) => {
    try {
      const response = await axios.put(
        `http://localhost:4444/reimbursement/${reimbId}?status=${newStatus}`
      );
      alert(`Reimbursement ${reimbId} status updated to ${newStatus}`);

      // Update the list of reimbursements after status change
      setAllReimbursements((prev) =>
        prev.map((reimbursement) =>
          reimbursement.reimbId === reimbId ? { ...reimbursement, status: newStatus } : reimbursement
        )
      );

      // If the reimbursement was pending, remove it from pending and update in the all list
      if (newStatus !== "PENDING") {
        setPendingReimbursements((prev) =>
          prev.filter((reimbursement) => reimbursement.reimbId !== reimbId)
        );
      }
    } catch (error) {
      console.error("Error updating reimbursement status", error);
    }
  };

  // Create a new reimbursement
  const handleCreateReimbursement = async () => {
    if (newReimbursement.description && newReimbursement.amount > 0) {
      try {
        const response = await axios.post("http://localhost:4444/reimbursement", {
          ...newReimbursement,
          status: "PENDING",
        });
        alert("Reimbursement created successfully!");
        setNewReimbursement({ description: "", amount: 0 });
        setViewPendingReimbursements(true); // Refresh the pending reimbursements list
      } catch (error) {
        console.error("Error creating reimbursement", error);
      }
    } else {
      alert("Please provide valid description and amount.");
    }
  };

  // Delete a user
  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:4444/users/${userId}`);
      alert(`User ${userId} deleted successfully!`);
      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/"; // Redirect to login
  };

  return (
    <Container className="my-4">
      <h2>Manager Dashboard</h2>
      <Row className="my-4">
        <Col>
          <Button
            className="w-100"
            onClick={() => setShowUsers(!showUsers)}
          >
            {showUsers ? "Hide Users" : "View All Users"}
          </Button>
        </Col>
        <Col>
          <Button
            className="w-100"
            onClick={() => setViewAllReimbursements(!viewAllReimbursements)}
          >
            {viewAllReimbursements ? "Hide All Reimbursements" : "View All Reimbursements"}
          </Button>
        </Col>
        <Col>
          <Button
            className="w-100"
            onClick={() => setViewPendingReimbursements(!viewPendingReimbursements)}
          >
            {viewPendingReimbursements ? "Hide Pending Reimbursements" : "View Pending Reimbursements"}
          </Button>
        </Col>
        <Col>
          <Button
            variant="danger"
            className="w-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>

      {/* Create New Reimbursement Form */}
      <div className="my-4">
        <h3>Create New Reimbursement</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reimbursement description"
              value={newReimbursement.description}
              onChange={(e) => setNewReimbursement({ ...newReimbursement, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter reimbursement amount"
              value={newReimbursement.amount}
              onChange={(e) => setNewReimbursement({ ...newReimbursement, amount: Number(e.target.value) })}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleCreateReimbursement}>
            Create Reimbursement
          </Button>
        </Form>
      </div>

      {/* Users Table */}
      {showUsers && (
        <div className="my-4" style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <h3>Users</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Reimbursement ID</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.reimbursement ? user.reimbursement.reimbId : "N/A"}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(user.userId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* All Reimbursements Table (Read-Only) */}
      {viewAllReimbursements && (
        <div className="my-4" style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <h3>All Reimbursements</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allReimbursements.map((reimbursement: any) => (
                <tr key={reimbursement.reimbId}>
                  <td>{reimbursement.reimbId}</td>
                  <td>{reimbursement.description}</td>
                  <td>${reimbursement.amount}</td>
                  <td>{reimbursement.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Pending Reimbursements Table */}
      {viewPendingReimbursements && (
        <div className="my-4" style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <h3>Pending Reimbursements</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {pendingReimbursements.map((reimbursement: any) => (
                <tr key={reimbursement.reimbId}>
                  <td>{reimbursement.reimbId}</td>
                  <td>{reimbursement.description}</td>
                  <td>${reimbursement.amount}</td>
                  <td>{reimbursement.status}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleStatusChange(reimbursement.reimbId, "APPROVED")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleStatusChange(reimbursement.reimbId, "DENIED")}
                    >
                      Deny
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};
