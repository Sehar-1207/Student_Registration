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
    <div className="min-h-screen bg-gray-300 p-4 md:p-8">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-lg p-4 md:p-6 shadow-lg">
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">List of all Students</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
          <button
            onClick={onAdd}
            className="bg-blue-600 text-white px-6 py-2 flex items-center justify-center gap-2 rounded-md hover:bg-blue-700 transition"
          >
            <CirclePlusIcon size={18} />
            Add New Student
          </button>

          <div className="relative w-full md:max-w-md flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
            <input
              type="text"
              placeholder="Search by name, email or course"
              className="w-full p-2 pl-3 outline-none"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <div className="pr-3 text-gray-500">
              <SearchIcon size={18} />
            </div>
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
