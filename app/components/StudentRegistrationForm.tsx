"use client";
import { useState } from "react";
export default function StudentRegistrationForm() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    course: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existingStudents = JSON.parse(
      localStorage.getItem("students") || "[]",
    );
    existingStudents.push({
      id: Date.now(),
      ...student,
    });
    
    localStorage.setItem("students", JSON.stringify(existingStudents));
    alert("Student Registered!");

    setStudent({
      name: "",
      email: "",
      age: "",
      gender: "",
      course: "",
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="w-full max-w-md bg-white p-6 m-3 rounded-lg ">
        <h1 className="text-3xl font-bold text-center mb-6">
          Student Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-md p-2"
              value={student.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md p-2"
              value={student.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="age" className="block mb-1 font-medium">
              Age
            </label>

            <input
              id="age"
              type="number"
              placeholder="Enteer your age"
              className="w-full border rounded-md p-2"
              value={student.age}
              onChange={handleChange}
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
              placeholder="Enter course"
              className="w-full border rounded-md p-2"
              value={student.course}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-700"
          >
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
}
