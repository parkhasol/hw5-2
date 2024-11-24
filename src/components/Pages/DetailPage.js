import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentById = async () => {
      try {
        const response = await axios.get(
          `https://672d9daefd8979715642fdbb.mockapi.io/api/v1/students/${id}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudentById();
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h1>Student Details</h1>
      <p>First Name: {student.firstName}</p>
      <p>Last Name: {student.lastName}</p>
      <p>Phone Number: {student.phoneNumber}</p>
      <p>Email Address: {student.emailAddress}</p>
    </div>
  );
};

export default DetailPage;
