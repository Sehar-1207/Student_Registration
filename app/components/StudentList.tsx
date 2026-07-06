"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Filter, Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Student } from "../components/student";

type SortField = "name" | "age" | "course" | "none";

interface StudentListProps {
  students: Student[];
  activeTab: "pending" | "completed";
  onOpenAdd: () => void;
  onOpenEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string) => void;
}

export default function StudentList({
  students,
  activeTab,
  onOpenAdd,
  onOpenEdit,
  onDelete,
  onStatusChange,
}: StudentListProps) {
  const [searchItem, setSearchItem] = useState("");
  const [sortField, setSortField] = useState<SortField>("none");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const processedStudents = useMemo(() => {
    let result = students.filter((s) => s.status === activeTab);

    if (searchItem.trim()) {
      const query = searchItem.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.course.toLowerCase().includes(query)
      );
    }

    if (sortField !== "none") {
      result = [...result].sort((a, b) => {
        if (sortField === "age") return a.age - b.age;
        return a[sortField].localeCompare(b[sortField]);
      });
    }

    return result;
  }, [students, activeTab, searchItem, sortField]);

  return (
    <div className="w-full animate-fadeIn bg-white/90 backdrop-blur-sm p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 space-y-6">
      
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 sm:flex-none">
          <div className="relative flex-1 sm:flex-initial">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`w-full p-2.5 rounded-xl border transition-colors flex items-center justify-center gap-2 text-sm font-medium ${
                sortField !== "none"
                  ? "bg-purple-50 border-purple-200 text-[#8b5cf6]"
                  : "bg-slate-50 border-slate-200 text-[#1e293b] hover:bg-slate-100"
              }`}
            >
              <Filter size={18} />
              <span>Sort</span>
            </button>

            {showFilterDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 text-sm">
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Sort By</div>
                {(["none", "name", "age", "course"] as SortField[]).map((field) => (
                  <button
                    key={field}
                    onClick={() => { setSortField(field); setShowFilterDropdown(false); }}
                    className={`w-full text-left px-4 py-2 capitalize transition-colors ${
                      sortField === field ? "bg-purple-50 text-[#8b5cf6] font-semibold" : "text-[#1e293b] hover:bg-slate-50"
                    }`}
                  >
                    {field === "none" ? "Default Ordering" : field}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenAdd}
            className="sm:hidden p-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search name, email or course..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-sm border border-transparent text-[#1e293b] focus:outline-none focus:bg-white focus:border-purple-200 transition-all"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
        </div>

        <button
          onClick={onOpenAdd}
          className="hidden sm:flex w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] hover:opacity-90 text-white text-sm font-bold rounded-xl transition-all items-center justify-center gap-2 shadow-md shadow-purple-500/10 flex-shrink-0"
        >
          <Plus size={16} />
          <span>Add </span>
        </button>
      </div>

      {processedStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 font-normal">
          No record found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:hidden gap-4">
            {processedStudents.map((student, idx) => (
              <div 
                key={student.id} 
                className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => onStatusChange(student.id)} 
                      className="transition-colors flex-shrink-0"
                    >
                      {activeTab === "pending" ? (
                        <Circle size={20} className="text-slate-300 hover:text-[#8b5cf6]" strokeWidth={2} />
                      ) : (
                        <CheckCircle2 size={20} className="text-[#8b5cf6] hover:text-slate-400" strokeWidth={2} />
                      )}
                    </button>
                    <div>
                      <h4 className={`font-semibold text-slate-950 ${activeTab === "completed" ? "line-through text-slate-400 font-normal" : ""}`}>
                        {student.name}
                      </h4>
                      {activeTab === "pending" && (
                        <p className="text-xs text-slate-400 truncate max-w-[180px] xs:max-w-xs">{student.email}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                    #{idx + 1}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-2.5 text-xs">
                  <div className="flex space-x-4 text-slate-500">
                    {activeTab === "pending" && (
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Age</span>
                        <span className="font-medium text-slate-700">{student.age} y/o</span>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Course</span>
                      <span className={`font-medium text-slate-700 ${activeTab === "completed" ? "text-slate-400 font-normal line-through" : ""}`}>
                        {student.course}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenEdit(student.id)}
                      className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:text-indigo-600 active:bg-indigo-50 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:text-rose-500 active:bg-rose-50 transition-colors"
                      title={activeTab === "completed" ? "Move to Pending" : "Delete"}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white rounded-2xl border border-slate-100 w-full mx-auto overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50/70">
                    <th className="py-4 text-center w-[8%]">Index</th>
                    <th className="py-4 px-4 w-[28%]">Name</th>
                    {activeTab === "pending" && (
                      <>
                        <th className="py-4 px-2 w-[10%]">Age</th>
                        <th className="py-4 px-2 w-[28%]">Email</th>
                      </>
                    )}
                    <th className="py-4 px-2 w-[24%]">Course</th>
                    <th className="py-4 text-center w-[12%]">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-[#1e293b]">
                  {processedStudents.map((student, idx) => (
                    <tr
                      key={student.id}
                      className="group border-b border-slate-100 last:border-none hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 text-center w-[8%] text-slate-400 text-xs">
                        {idx + 1}
                      </td>
                      
                      <td className="py-4 px-4 w-[28%] font-semibold truncate">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => onStatusChange(student.id)} 
                            className="transition-colors flex-shrink-0"
                          >
                            {activeTab === "pending" ? (
                              <Circle size={19} className="text-slate-300 hover:text-[#8b5cf6]" strokeWidth={2} />
                            ) : (
                              <CheckCircle2 size={19} className="text-[#8b5cf6] hover:text-slate-400" strokeWidth={2} />
                            )}
                          </button>
                          <span className={activeTab === "completed" ? "line-through text-slate-400 font-normal" : ""}>
                            {student.name}
                          </span>
                        </div>
                      </td>

                      {activeTab === "pending" && (
                        <>
                          <td className="py-4 px-2 w-[10%] text-slate-500">{student.age}</td>
                          <td className="py-4 px-2 w-[28%] text-slate-400 truncate font-normal">{student.email}</td>
                        </>
                      )}

                      <td className={`py-4 px-2 w-[24%] truncate ${activeTab === "completed" ? "text-slate-400 font-normal" : ""}`}>
                        {student.course}
                      </td>

                      <td className="py-4 w-[12%] text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => onOpenEdit(student.id)}
                            className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => onDelete(student.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                            title={activeTab === "completed" ? "Move to Pending" : "Delete"}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}