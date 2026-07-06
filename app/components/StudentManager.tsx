"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";
import { Student } from "../components/student";

export default function StudentManager() {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("students");
    if (data) setStudents(JSON.parse(data));
  }, []);

  const saveStudents = (updated: Student[]) => {
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  };

  const handleAdd = (data: Omit<Student, "id" | "status">) => {
    const newStudent: Student = {
      ...data,
      id: Date.now().toString(),
      status: "pending",
    };
    saveStudents([...students, newStudent]);
    setView("list");
    toast.success(`${data.name} added successfully!`);
  };

  const handleEdit = (data: Omit<Student, "id" | "status">) => {
    const updated = students.map((s) => (s.id === editId ? { ...s, ...data } : s));
    saveStudents(updated);
    setEditId(null);
    setView("list");
    toast.success("Profile updated successfully!");
  };

  const handleDelete = (id: string) => {
    const target = students.find((s) => s.id === id);
    if (!target) return;

    if (target.status === "completed") {
      toast.custom((t) => (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25 backdrop-blur-xs pointer-events-auto">
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white shadow-2xl rounded-xl flex flex-col p-5 border border-slate-100 mx-4`}>
            <div className="flex-1 text-slate-800 text-sm font-medium mb-4">
              Move completed record for <strong>{target.name}</strong> back to pending?
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => toast.dismiss(t.id)} className="px-3.5 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-xs transition-colors">Cancel</button>
              <button onClick={() => {
                const updated = students.map((s) => s.id === id ? { ...s, status: "pending" as const } : s);
                saveStudents(updated);
                toast.dismiss(t.id);
                toast.success("Record moved to pending.");
              }} className="px-3.5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-bold text-xs transition-colors shadow-sm">Move</button>
            </div>
          </div>
        </div>
      ), { id: `confirm-pending-${id}` });
    } else {
      toast.custom((t) => (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/25 backdrop-blur-xs pointer-events-auto">
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white shadow-2xl rounded-xl flex flex-col p-5 border border-slate-100 mx-4`}>
            <div className="flex-1 text-slate-800 text-sm font-medium mb-4">
              Are you sure you want to delete <strong>{target.name}</strong>?
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => toast.dismiss(t.id)} className="px-3.5 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-xs transition-colors">Cancel</button>
              <button onClick={() => {
                const updated = students.filter((s) => s.id !== id);
                saveStudents(updated);
                toast.dismiss(t.id);
                toast.success("Registration deleted successfully.");
              }} className="px-3.5 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 font-bold text-xs transition-colors shadow-sm">Delete</button>
            </div>
          </div>
        </div>
      ), { id: `confirm-delete-${id}` });
    }
  };

  const handleStatusChange = (id: string) => {
    const target = students.find((s) => s.id === id);
    const updated = students.map((s) =>
      s.id === id
        ? { ...s, status: s.status === "completed" ? ("pending" as const) : ("completed" as const) }
        : s
    );
    saveStudents(updated);
    
    if (target) {
      if (target.status === "pending") {
        toast.success(`${target.name} marked as completed!`);
      } else {
        toast.error(`${target.name} marked as pending.`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b]">
      <nav className="bg-[#1a1e2b] bg-gradient-to-r from-[#1a1e2b] to-[#2d364f] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-0 md:h-24 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Student <span className="text-[#d946ef] bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] bg-clip-text text-transparent">Hub</span>
            </span>
          </div>

          <div className="flex w-full md:w-auto bg-[#374151] p-1 rounded-full shadow-inner">
            <button
              onClick={() => { setActiveTab("pending"); setView("list"); }}
              className={`flex-1 md:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 text-center ${
                view === "list" && activeTab === "pending"
                  ? "bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Pending Records
            </button>
            <button
              onClick={() => { setActiveTab("completed"); setView("list"); }}
              className={`flex-1 md:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 text-center ${
                view === "list" && activeTab === "completed"
                  ? "bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Completed Records
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {view === "list" ? (
          <StudentList
            students={students}
            activeTab={activeTab}
            onOpenAdd={() => { setEditId(null); setView("add"); }}
            onOpenEdit={(id) => { setEditId(id); setView("edit"); }}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <StudentForm
            onBack={() => { setEditId(null); setView("list"); }}
            onSubmit={view === "edit" ? handleEdit : handleAdd}
            editId={view === "edit" ? editId : null}
            students={students}
          />
        )}
      </main>
    </div>
  );
}