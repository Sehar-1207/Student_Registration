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
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden max-w-6xl mx-auto shadow-sm flex flex-col h-[320px]">
      <div className="overflow-x-auto overflow-y-auto flex-1">
        <table className="w-full min-w-[900px] table-fixed border-collapse text-center">
          <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="w-[8%] py-4 px-5 font-semibold">Index</th>
              <th className="w-[18%] py-4 px-5 font-semibold">Name</th>
              <th className="w-[8%] py-4 px-5 font-semibold">Age</th>
              <th className="w-[26%] py-4 px-5 font-semibold">Email</th>
              <th className="w-[12%] py-4 px-5 font-semibold">Gender</th>
              <th className="w-[16%] py-4 px-5 font-semibold">Course</th>
              <th className="w-[12%] py-4 px-5 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white text-sm text-slate-700">
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-slate-400 font-medium"
                >
                  No record found
                </td>
              </tr>
            ) : (
              students.map((student, idx) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 px-5 font-medium text-slate-500">
                    {idx + 1}
                  </td>

                  <td
                    className="py-4 px-5 font-semibold text-slate-900 truncate"
                    title={student.name}
                  >
                    {student.name}
                  </td>

                  <td className="py-4 px-5">{student.age}</td>

                  <td
                    className="py-4 px-5 text-slate-500 truncate"
                    title={student.email}
                  >
                    {student.email}
                  </td>

                  <td className="py-4 px-5">{student.gender}</td>

                  <td className="py-4 px-5 truncate" title={student.course}>
                    {student.course}
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center justify-center gap-3">
                      <input
                        type="checkbox"
                        checked={student.isRegistered}
                        onChange={() => onStatusChange(student.id)}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                      />

                      <button
                        onClick={() => onEdit(student)}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1 hover:bg-slate-100 rounded"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(student.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1 hover:bg-slate-100 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
