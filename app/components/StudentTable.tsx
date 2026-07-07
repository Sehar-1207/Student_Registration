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
  
  const minRows = 4;
  const paddedRows = [...students];
  while (paddedRows.length < minRows) {
    paddedRows.push(null as any);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden max-w-6xl mx-auto shadow-sm flex flex-col h-[320px]">
      <div className="overflow-x-auto overflow-y-auto flex-1">
        <table className="w-full min-w-[950px] table-fixed border-collapse text-center">
          <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="w-[8%] py-4 px-4 font-semibold">Index</th>
              <th className="w-[20%] py-4 px-5 font-semibold">Name</th>
              <th className="w-[8%] py-4 px-2 font-semibold">Age</th>
              <th className="w-[24%] py-4 px-5 font-semibold">Email</th>
              <th className="w-[10%] py-4 px-2 font-semibold">Gender</th>
              <th className="w-[16%] py-4 px-4 font-semibold">Course</th>
              <th className="w-[14%] py-4 px-4 font-semibold">Pending</th>
              <th className="w-[10%] py-4 px-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white text-sm text-slate-700">
            {students.length === 0 && (
              <tr className="absolute inset-x-0 top-[52px] bottom-0 flex items-center justify-center pointer-events-none">
                <td className="text-slate-400 font-medium border-none">
                  No record found
                </td>
              </tr>
            )}
            
            {paddedRows.map((student, idx) => {
              if (!student) {
                return (
                  <tr key={`blank-row-${idx}`} className="border-b border-slate-50 last:border-none h-[53px]">
                    <td className="py-4 text-center text-slate-300 text-xs">-</td>
                    <td className="py-4 px-5" />
                    <td className="py-4 px-2" />
                    <td className="py-4 px-5" />
                    <td className="py-4 px-2" />
                    <td className="py-4 px-4" />
                    <td className="py-4 px-4" />
                    <td className="py-4 px-4" />
                  </tr>
                );
              }

              return (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors h-[53px]"
                >
                  <td className="py-4 px-4 font-medium text-slate-500">
                    {idx + 1}
                  </td>
                  <td
                    className="py-4 px-5 font-semibold text-slate-900 truncate"
                    title={student.name}
                  >
                    {student.name}
                  </td>

                  <td className="py-4 px-2">{student.age}</td>

                  <td
                    className="py-4 px-5 text-slate-500 truncate"
                    title={student.email}
                  >
                    {student.email}
                  </td>

                  <td className="py-4 px-2">{student.gender}</td>

                  <td className="py-4 px-4 truncate" title={student.course}>
                    {student.course}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={student.isRegistered}
                        onChange={() => onStatusChange(student.id)}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer transition-all"
                      />
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => onEdit(student)}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1 hover:bg-slate-100 rounded"
                        title="Edit Student"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => onDelete(student.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1 hover:bg-slate-100 rounded"
                        title="Delete Student"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}