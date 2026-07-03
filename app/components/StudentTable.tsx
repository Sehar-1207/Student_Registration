"use client";

import { Pencil, Trash2 } from "lucide-react";

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

type StudentTableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number) => void;
};

export default function StudentTable({
  students,
  onEdit,
  onDelete,
  onStatusChange,
}: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[900px] w-full border border-gray-300 rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Age</th>
            <th className="px-4 py-3 text-left">Gender</th>
            <th className="px-4 py-3 text-left">Course</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Complete</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b hover:bg-gray-100"
            >
              <td className="px-4 py-3">{student.name}</td>

              <td className="px-4 py-3 break-words">
                {student.email}
              </td>

              <td className="px-4 py-3">{student.age}</td>

              <td className="px-4 py-3">{student.gender}</td>

              <td className="px-4 py-3">{student.course}</td>

              <td className="px-4 py-3 text-center">
                {student.isRegistered ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Registered
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Pending
                  </span>
                )}
              </td>

              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={student.isRegistered}
                  onChange={() => onStatusChange(student.id)}
                  className="w-5 h-5 cursor-pointer"
                />
              </td>

              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => onEdit(student)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(student.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}