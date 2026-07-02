"use client";

import { useState, useEffect, useMemo } from "react";
import StudentTable from "./StudentTable";
import { SearchIcon, CirclePlusIcon } from "lucide-react";

type Student = {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  course: string;
};

export default function StudentList({ onAdd, onEdit, }: {
  onAdd: () => void;
  onEdit: (id: number) => void;
}) {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const existingStudents = JSON.parse(
      localStorage.getItem("students") || "[]",
    );
    setStudents(existingStudents);
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        student.email.toLowerCase().includes(searchItem.toLowerCase()) ||
        student.course.toLowerCase().includes(searchItem.toLowerCase()),
    );
  }, [students, searchItem]);

  const handleDelete = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-lg p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">List of all Students</h1>
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={onAdd}
            className="bg-blue-600 text-white px-6 py-2 flex items-center rounded-md hover:bg-blue-700 transition"
          >
            <CirclePlusIcon size={18} />
            Add New Student
          </button>

          <div className="relative w-full max-w-md flex items-center border border-gray-300 rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search by name, email or course"
              className="w-full p-1 pl-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <SearchIcon size={18} />
            <div className="pr-3 text-gray-500"></div>
          </div>
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={(student) => onEdit(student.id)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
