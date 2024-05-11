import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import CourseListStudent from "../components/CourseListStudent/CourseListStudent";

export default function CoursesStudent() {
    const [courses, setCourses] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
    const [assignmentGrades, setAssignmentGrades] = useState([]);

    useEffect(() => {
        const studentIdFromLocalStorage = localStorage.getItem("studentId");
        if (studentIdFromLocalStorage) {
            setStudentId(studentIdFromLocalStorage);
        }
    }, []);

  
    useEffect(() => {
        // Dobivanje studentID iz localStorage-a
        const studentIdFromLocalStorage = localStorage.getItem("studentId");
        
        if (studentIdFromLocalStorage) {
            console.log("Student ID from localStorage:", studentIdFromLocalStorage); // Dodajte ovu liniju

            axios.get(`http://localhost/grading-management-system/api/studentcourses/${studentIdFromLocalStorage}`)
                .then(res => {
                    setCourses(res.data);
                })
                .catch(error => {
                    console.error('Error fetching student courses:', error);
                });
        }
    }, []);

    return (
        <div className="main">
            <NavBar />
            <div className="courses-section">
                <h1>My Courses</h1>
                <CourseListStudent
                    courses={courses}
                    studentId={studentId}
                    setSelectedCourseId={setSelectedCourseId}
                    setSelectedAssignmentId={setSelectedAssignmentId}
                    setAssignmentGrades={setAssignmentGrades}
                />
                {assignmentGrades.length > 0 && (
                    <div>
                        <h2>Assignment Grades</h2>
                        <ul>
                            {assignmentGrades.map(grade => (
                                <li key={grade.id}>{grade.grade}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
