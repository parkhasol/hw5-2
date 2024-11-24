import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListPage = () => {
  const [students, setStudents] = useState([]);

  // 학생 목록을 가져오는 함수
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          'https://672d9daefd8979715642fdbb.mockapi.io/api/v1/students'
        );
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // 학생 삭제 함수
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://672d9daefd8979715642fdbb.mockapi.io/api/v1/students/${id}`
      );
      // 삭제 후 학생 목록 다시 가져오기
      setStudents(students.filter((student) => student.userId !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Student List</h1>

      {/* 학생 목록 테이블 */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.userId}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.emailAddress}</td>
              <td>
                {/* 수정 및 삭제 버튼 */}
                <Link to={`/update/${student.userId}`} className="btn btn-warning me-2">
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(student.userId)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 새 학생 추가 버튼 */}
      <Link to="/create" className="btn btn-primary mt-3">
        Add New Student
      </Link>
    </div>
  );
};

export default ListPage;
