"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Student } from "../components/student";

interface StudentFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
  editId: string | null;
  students: Student[];
}

export default function StudentForm({ onBack, onSubmit, editId, students }: StudentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [course, setCourse] = useState("");

  const isEditMode = editId !== null;

  useEffect(() => {
    if (isEditMode) {
      const student = students.find((s) => s.id === editId);
      if (student) {
        setName(student.name);
        setEmail(student.email);
        setAge(student.age.toString());
        setGender(student.gender);
        setCourse(student.course);
      }
    }
  }, [editId, isEditMode, students]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, age: Number(age), gender, course });
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#1e293b] transition-colors gap-1"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <h2 className="text-sm sm:text-base font-bold text-[#1e293b]">
          {isEditMode ? "Modify Profile" : "New Record"}
        </h2>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-2 text-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#f8fafc] px-4 py-2.5 rounded-xl border border-slate-200 text-[#1e293b] focus:outline-none focus:border-[#8b5cf6] transition-colors font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
          <input
            type="email"
            required
            value={email}
            disabled={isEditMode}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#f8fafc] px-4 py-2.5 rounded-xl border border-slate-200 text-[#1e293b] focus:outline-none focus:border-[#8b5cf6] transition-colors font-medium disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Age</label>
            <input
              type="number"
              required
              min="1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-[#f8fafc] px-4 py-2.5 rounded-xl border border-slate-200 text-[#1e293b] focus:outline-none focus:border-[#8b5cf6] transition-colors font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-[#f8fafc] px-4 py-2.5 rounded-xl border border-slate-200 text-[#1e293b] focus:outline-none focus:border-[#8b5cf6] transition-colors font-medium h-[42px]"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Course </label>
          <input
            type="text"
            required
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full bg-[#f8fafc] px-4 py-2.5 rounded-xl border border-slate-200 text-[#1e293b] focus:outline-none focus:border-[#8b5cf6] transition-colors font-medium"
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-[#1e293b] font-bold hover:bg-slate-50 transition-colors text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 hover:opacity-90"
          >
            <Check size={16} strokeWidth={2.5} />
            <span>Save Details</span>
          </button>
        </div>
      </form>
    </div>
  );
}