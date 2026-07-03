"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

type Student = {
  id?: number;
  name: string;
  email: string;
  age: string;
  gender: string;
  course: string;
  isRegistered: boolean;
  registeredAt: string;
};

type RegistrationProps = {
  onBack: () => void;
  editId: number | null;
};

export default function StudentForm({
  onBack,
  editId,
}: RegistrationProps) {
  const [student, setStudent] = useState<Student>({
    name: "",
    email: "",
    age: "",
    gender: "Male",
    course: "",
    isRegistered: false,
    registeredAt: "",
  });

  useEffect(() => {
    if (editId) {
      const existing: Student[] = JSON.parse(
        localStorage.getItem("students") || "[]"
      );

      const found = existing.find((s) => s.id === editId);

      if (found) {
        setStudent(found);
      }
    }
  }, [editId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const existing: Student[] = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    if (editId) {
      const updated = existing.map((s) =>
        s.id === editId
          ? {
              ...student,
              id: editId,
            }
          : s
      );

      localStorage.setItem(
        "students",
        JSON.stringify(updated)
      );
    } else {
      existing.push({
        id: Date.now(),
        ...student,
        isRegistered: false,
        registeredAt: "",
      });

      localStorage.setItem(
        "students",
        JSON.stringify(existing)
      );
    }

    onBack();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="w-full max-w-md bg-white p-6 m-3 rounded-lg shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-black mb-4 transition"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to List
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          {editId ? "Edit Student" : "Student Registration"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>

            <input
              id="name"
              type="text"
              className="w-full border rounded-md p-2"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              className="w-full border rounded-md p-2"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block mb-1 font-medium">
              Age
            </label>

            <input
              id="age"
              type="number"
              className="w-full border rounded-md p-2"
              value={student.age}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="block mb-1 font-medium">
              Gender
            </label>

            <select
              id="gender"
              className="w-full border rounded-md p-2"
              value={student.gender}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="course" className="block mb-1 font-medium">
              Course
            </label>

            <input
              id="course"
              type="text"
              className="w-full border rounded-md p-2"
              value={student.course}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
          >
            {editId ? "Update Student" : "Register Student"}
          </button>
        </form>
      </div>
    </div>
  );
}