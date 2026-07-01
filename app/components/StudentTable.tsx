"use client";

type Student = {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  course: string;
};

type StudentTableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
};


export default function StudentTable({
  students,
  onEdit,
  onDelete,
}: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[700px] w-full border border-gray-300 rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Age</th>
            <th className="px-4 py-3 text-left">Gender</th>
            <th className="px-4 py-3 text-left">Course</th>
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
              <td className="px-4 py-3 break-words">{student.email}</td>
              <td className="px-4 py-3">{student.age}</td>
              <td className="px-4 py-3">{student.gender}</td>
              <td className="px-4 py-3">{student.course}</td>

              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => onEdit(student)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(student.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}