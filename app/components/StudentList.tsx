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
  isRegistered: boolean;
  registeredAt: string;
};

export default function StudentList({
  onAdd,
  onEdit,
}: {
  onAdd: () => void;
  onEdit: (id: number) => void;
}) {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const existingStudents = JSON.parse(
      localStorage.getItem("students") || "[]"
    );
    setStudents(existingStudents);
  }, []);

const filteredStudents = useMemo(() => {
  return students.filter(
    (student) =>
      !student.isRegistered &&
      (
        student.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        student.email.toLowerCase().includes(searchItem.toLowerCase()) ||
        student.course.toLowerCase().includes(searchItem.toLowerCase())
      )
  );
}, [students, searchItem]);

 const completedStudents = useMemo(() => {
  return students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      student.email.toLowerCase().includes(searchItem.toLowerCase()) ||
      student.course.toLowerCase().includes(searchItem.toLowerCase());

    return student.isRegistered && matchesSearch;
  });
}, [students, searchItem]);

  const handleDelete = (id: number) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const handleStatus = (id: number) => {
    const updatedStudents = students.map((student) =>
      student.id === id
        ? {
            ...student,
            isRegistered: !student.isRegistered,
            registeredAt: !student.isRegistered
              ? new Date().toLocaleString()
              : "",
          }
        : student
    );

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

const hasResults =
  filteredStudents.length > 0 || completedStudents.length > 0;

return (
  <div className="min-h-screen bg-gray-300 p-4 md:p-8">
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg p-4 md:p-6 shadow-lg">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold">
          Student Registration System
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-6 py-2 flex items-center justify-center gap-2 rounded-md hover:bg-blue-700"
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

      {filteredStudents.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Pending Registrations
          </h2>

          <StudentTable
            students={filteredStudents}
            onEdit={(student) => onEdit(student.id)}
            onDelete={handleDelete}
            onStatusChange={handleStatus}
          />
        </>
      )}

      {completedStudents.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Completed Registrations
          </h2>

          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Completed On</th>
              </tr>
            </thead>

            <tbody>
              {completedStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.age}</td>
                  <td className="p-3">{student.gender}</td>
                  <td className="p-3">{student.course}</td>
                  <td className="p-3">
                    {student.registeredAt || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!hasResults && (
        <div className="text-center py-16 text-gray-500">
          <h2 className="text-2xl font-semibold">
            No records found
          </h2>
        </div>
      )}
    </div>
  </div>
);
}