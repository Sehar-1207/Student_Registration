"use client";
import { useState } from "react";
import StudentList from "./StudentList";
import StudentRegistrationForm from "./StudentForm";

export type View = "list" | "add" | "edit";

export default function StudentManager() {
  const [view, setView] = useState<View>("list");
  const [editId, setEditId] = useState<number | null>(null);

  const openAdd = () => {
    setEditId(null);
    setView("add");
  };
  const openEdit = (id: number) => {
    setEditId(id);
    setView("edit");
  };

  return (
    <>
      {view === "list" && <StudentList onAdd={openAdd} onEdit={openEdit} />}
      {(view === "add" || view === "edit") && (
        <StudentRegistrationForm
          onBack={() => setView("list")}
          editId={editId}
        />
      )}
    </>
  );
}
