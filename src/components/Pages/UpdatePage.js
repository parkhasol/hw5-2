import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const [editCount, setEditCount] = useState(0);

  // 페이지 로딩 시 학생 정보 가져오기
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

  // 입력값 변경 시 API 호출 (실시간 반영)
  const handleChange = async (e) => {
    const { name, value } = e.target;

    // 유효성 체크
    if (name === 'firstName' && value.trim() === '') {
      alert('First name is required');
      firstNameRef.current.focus();
      return;
    }
    if (name === 'lastName' && value.trim() === '') {
      alert('Last name is required');
      lastNameRef.current.focus();
      return;
    }
    if (name === 'phoneNumber' && !/^\d+$/.test(value)) {
      alert('Phone number must contain only digits');
      phoneRef.current.focus();
      return;
    }

    // 학생 데이터 업데이트
    const updatedStudent = { ...student, [name]: value };
    setStudent(updatedStudent); // UI 업데이트

    // 실시간으로 API 업데이트 (PUT 요청)
    try {
      await axios.put(
        `https://672d9daefd8979715642fdbb.mockapi.io/api/v1/students/${id}`,
        updatedStudent
      );
      setEditCount((prev) => prev + 1); // 수정 횟수 증가
      console.log('Student updated:', updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Student</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={student.firstName || ''}
            onChange={handleChange}
            ref={firstNameRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={student.lastName || ''}
            onChange={handleChange}
            ref={lastNameRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            value={student.phoneNumber || ''}
            onChange={handleChange}
            ref={phoneRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label">Email Address</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            className="form-control"
            value={student.emailAddress || ''}
            onChange={handleChange}
          />
        </div>

        <p className="mt-3">Total Edits: {editCount}</p>
      </form>
    </div>
  );
};

export default UpdatePage;
