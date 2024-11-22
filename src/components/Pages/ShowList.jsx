import React, { useState, useEffect } from "react";
import AddModal from "../Modals/AddModal";
import EditModal from "../Modals/EditModal";

const ShowList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetch("/my_data.json")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error loading data: ", error));
  }, []);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    setShowAddModal(false); // modal close
  };

  const handleUpdateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
    setShowEditModal(false); // modal close
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId));
    setShowEditModal(false); // modal close
  };

  return (
    <div>
      <h1>Student List</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowAddModal(true)}
      >
        Add Student
      </button>
      <ul className="list-group mt-3">
        {students.map((student) => (
          <li
            key={student.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {student.name} - {student.age} years old - {student.gender}
            <button
              className="btn btn-warning"
              onClick={() => {
                setSelectedStudent(student);
                setShowEditModal(true);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Add Modal */}
      <AddModal show={showAddModal} onHide={() => setShowAddModal(false)} onAddStudent={handleAddStudent} />

      {/* Edit Modal */}
      {selectedStudent && (
        <EditModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          student={selectedStudent}
          onUpdate={handleUpdateStudent}
          onDelete={handleDeleteStudent}
        />
      )}
    </div>
  );
};

export default ShowList;
