import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://672d9daefd8979715642fdbb.mockapi.io/api/v1/students', newStudent);
      navigate('/list'); // 추가 후 목록 페이지로 이동
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={newStudent.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={newStudent.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={newStudent.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="emailAddress"
            value={newStudent.emailAddress}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
};

export default CreatePage;
