import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({ show, onHide, student, onUpdate, onDelete }) => {
  const [updatedStudent, setUpdatedStudent] = useState({
    ...student, 
  });

  // update
  const handleUpdate = () => {
    onUpdate(updatedStudent); 
    onHide(); // modal close
  };

  // delete
  const handleDelete = () => {
    onDelete(student.id);
    onHide(); // modal close
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editStudentName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedStudent.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="editStudentAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={updatedStudent.age}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="editStudentGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={updatedStudent.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
