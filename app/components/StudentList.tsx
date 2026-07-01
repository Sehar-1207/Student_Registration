"use client";

import { useState, useEffect } from "react";
import StudentTable from "./StudentTable";

type Student = {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  course: string;
};

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const existingStudents = JSON.parse(
      localStorage.getItem("students") || "[]"
    );
    setStudents(existingStudents);
  }, []);

  const handleEdit = (student: Student) => {
    console.log("Editting not implemented")
  };

  const handleDelete = (id: number) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          List of all the Students
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full sm:w-auto rounded-md bg-blue-600 text-white p-2 hover:bg-blue-700">
            Search
          </button>
        </div>

        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}