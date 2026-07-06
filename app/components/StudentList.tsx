"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Student } from "../components/student";

type SortField = "name" | "age" | "course" | "email" | "none";

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

    if (sortField !== "none" && sortField !== "age") {
      result = [...result].sort((a, b) => {
        return a[sortField].localeCompare(b[sortField]);
      });
    }

    return result;
  }, [students, activeTab, searchItem, sortField]);

  const paddedRows = useMemo(() => {
    const minRows = 4;
    if (processedStudents.length >= minRows) return processedStudents;
    
    const extraNeeded = minRows - processedStudents.length;
    const fillers = Array(extraNeeded).fill(null);
    return [...processedStudents, ...fillers];
  }, [processedStudents]);

  const handleCheckboxChange = (field: SortField) => {
    setSortField(sortField === field ? "none" : field);
  };

  return (
    <div className="w-full animate-fadeIn bg-white/90 backdrop-blur-sm p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 space-y-6">
      
      {/* SEARCH BAR & ADD BUTTON */}
      <div className="flex flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm w-full max-w-xl mx-auto justify-center">
        <div className="relative flex-1 max-w-xs">
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
          className="px-5 py-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] hover:opacity-90 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-500/10 flex-shrink-0"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>

      {/* WORKSPACE FLEX WRAPPER - SIDE FILTER INTERFACE */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        
        {/* PERSISTENT EXTERNAL SIDE FILTER PANEL */}
        <div className="w-full lg:w-48 bg-slate-50/60 rounded-xl p-4 border border-slate-100 shrink-0">
          <div className="flex flex-col gap-2 text-xs text-slate-500 font-bold">
            <span className="text-purple-600 uppercase tracking-wide text-[10px]">Filter</span>
            <div className="flex flex-row lg:flex-col flex-wrap gap-x-4 gap-y-2 font-medium tracking-normal normal-case text-slate-700 mt-1">
              <label className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
                <input 
                  type="checkbox" 
                  checked={sortField === "none"} 
                  onChange={() => setSortField("none")}
                  className="rounded text-purple-600 focus:ring-purple-400 w-4 h-4 border-slate-300"
                />
                <span>All</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
                <input 
                  type="checkbox" 
                  checked={sortField === "name"} 
                  onChange={() => handleCheckboxChange("name")}
                  className="rounded text-purple-600 focus:ring-purple-400 w-4 h-4 border-slate-300"
                />
                <span>Names </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
                <input 
                  type="checkbox" 
                  checked={sortField === "email"} 
                  onChange={() => handleCheckboxChange("email")}
                  className="rounded text-purple-600 focus:ring-purple-400 w-4 h-4 border-slate-300"
                />
                <span>Emails</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
                <input 
                  type="checkbox" 
                  checked={sortField === "course"} 
                  onChange={() => handleCheckboxChange("course")}
                  className="rounded text-purple-600 focus:ring-purple-400 w-4 h-4 border-slate-300"
                />
                <span>Courses </span>
              </label>
            </div>
          </div>
        </div>

        {/* DATA PRESENTATION MATRIX CONTAINER */}
        <div className="w-full flex-1 min-w-0">
          
          {/* MOBILE LIST LAYOUT */}
          <div className="grid grid-cols-1 md:hidden gap-2 max-h-[352px] min-h-[352px] overflow-y-auto pr-1 relative border border-slate-100 rounded-xl p-1 bg-slate-50/20">
            {processedStudents.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-sm pointer-events-none bg-white/50 backdrop-blur-[1px]">
                No record found
              </div>
            )}
            {paddedRows.map((student, idx) => {
              if (!student) {
                return (
                  <div key={`blank-card-${idx}`} className="bg-slate-50/30 rounded-xl border border-dashed border-slate-100 h-[80px]" />
                );
              }
              return (
                <div 
                  key={student.id} 
                  className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex flex-col gap-1.5 relative overflow-hidden transition-all h-[80px] justify-center active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 w-full min-w-0">
                      
                      {/* SHOW MOBILE CHECKBOX ONLY IF VIEWING PENDING TABLE */}
                      {activeTab === "pending" && (
                        <button onClick={() => onStatusChange(student.id)} className="transition-colors flex-shrink-0 mt-0.5">
                          <Circle size={17} className="text-slate-300 hover:text-[#8b5cf6]" strokeWidth={2} />
                        </button>
                      )}
                      
                      <div className="flex flex-col min-w-0 w-full">
                        {(sortField === "none" || sortField === "name") && (
                          <h4 className={`font-semibold text-slate-900 tracking-tight text-xs truncate ${activeTab === "completed" ? "line-through text-slate-400 font-normal" : ""}`}>
                            {student.name}
                          </h4>
                        )}
                        {(sortField === "none" || sortField === "email") && (
                          <p className={`text-[10px] font-medium truncate max-w-[180px] mt-0.5 ${activeTab === "completed" ? "line-through text-slate-300 font-normal" : "text-slate-400"}`}>
                            {student.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100/50 flex-shrink-0">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-0.5">
                    <div className="flex gap-4">
                      {(sortField === "none" || sortField === "age") && activeTab === "pending" && (
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Age:</span>
                          <span className="text-[11px] font-semibold text-slate-600">{student.age}</span>
                        </div>
                      )}
                      {(sortField === "none" || sortField === "course") && (
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Course:</span>
                          <span className={`text-[11px] font-bold text-slate-700 truncate max-w-[100px] ${activeTab === "completed" ? "text-slate-400 font-normal line-through" : ""}`}>
                            {student.course}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => onOpenEdit(student.id)} className="p-1 text-slate-400 hover:text-purple-600 rounded-lg transition-colors">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => onDelete(student.id)} className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-100 w-full mx-auto overflow-hidden relative">
            {processedStudents.length === 0 && (
              <div className="absolute top-[53px] inset-x-0 bottom-0 flex items-center justify-center text-slate-400 font-medium text-sm pointer-events-none bg-white/50 backdrop-blur-[1px] z-20">
                No record found
              </div>
            )}
            <div className="overflow-x-auto overflow-y-auto max-h-[241px] min-h-[241px]">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 sticky top-0 z-30 shadow-[0_1px_0_0_rgba(241,245,249,1)]">
                    <th className="py-4 text-center bg-slate-50 w-[10%]">Index</th>
                    {(sortField === "none" || sortField === "name") && <th className="py-4 px-4 bg-slate-50 w-[20%]">Name</th>}
                    {(sortField === "none" || sortField === "age") && activeTab === "pending" && <th className="py-4 px-2 bg-slate-50 w-[12%]">Age</th>}
                    {(sortField === "none" || sortField === "email") && <th className="py-4 px-2 bg-slate-50 w-[25%]">Email</th>}
                    {(sortField === "none" || sortField === "course") && <th className="py-4 px-2 bg-slate-50 w-[21%]">Course</th>}
                    
                    {activeTab === "pending" && (
                      <th className="py-4 text-center bg-slate-50 w-[15%]">Mark as Complete</th>
                    )}
                    
                    <th className="py-4 text-center bg-slate-50 w-[12%]">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-[#1e293b]">
                  {paddedRows.map((student, idx) => {
                    if (!student) {
                      return (
                        <tr key={`blank-row-${idx}`} className="border-b border-slate-50 last:border-none h-[47px]">
                          <td className="py-4 text-center text-slate-300 text-xs">-</td>
                          {(sortField === "none" || sortField === "name") && <td className="py-4 px-4" />}
                          {(sortField === "none" || sortField === "age") && activeTab === "pending" && <td className="py-4 px-2" />}
                          {(sortField === "none" || sortField === "email") && <td className="py-4 px-2" />}
                          {(sortField === "none" || sortField === "course") && <td className="py-4 px-2" />}
                          {activeTab === "pending" && <td className="py-4" />}
                          <td className="py-4" />
                        </tr>
                      );
                    }
                    return (
                      <tr key={student.id} className="group border-b border-slate-100 last:border-none hover:bg-slate-50/50 transition-colors h-[47px]">
                        <td className="py-3 text-center text-slate-400 text-xs">{idx + 1}</td>
                        {(sortField === "none" || sortField === "name") && (
                          <td className={`py-3 px-4 font-semibold truncate ${activeTab === "completed" ? "line-through text-slate-400 font-normal" : ""}`}>
                            {student.name}
                          </td>
                        )}
                        {(sortField === "none" || sortField === "age") && activeTab === "pending" && (
                          <td className="py-3 px-2 text-slate-500">{student.age}</td>
                        )}
                        {(sortField === "none" || sortField === "email") && (
                          <td className={`py-3 px-2 truncate font-normal ${activeTab === "completed" ? "text-slate-400 line-through" : "text-slate-400"}`}>
                            {student.email}
                          </td>
                        )}
                        {(sortField === "none" || sortField === "course") && (
                          <td className={`py-3 px-2 truncate ${activeTab === "completed" ? "text-slate-400 font-normal line-through" : ""}`}>
                            {student.course}
                          </td>
                        )}
                        
                        {activeTab === "pending" && (
                          <td className="py-3 text-center">
                            <div className="flex items-center justify-center">
                              <button 
                                onClick={() => onStatusChange(student.id)} 
                                className="transition-transform active:scale-95 flex-shrink-0 p-1 rounded-full hover:bg-slate-100"
                                title="Mark Completed"
                              >
                                <Circle size={18} className="text-slate-300 hover:text-[#8b5cf6]" strokeWidth={2} />
                              </button>
                            </div>
                          </td>
                        )}

                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button onClick={() => onOpenEdit(student.id)} className="p-1 text-slate-400 hover:text-indigo-600 transition-colors" title="Edit">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => onDelete(student.id)} className="p-1 text-slate-400 hover:text-rose-500 transition-colors" title={activeTab === "completed" ? "Move to Pending" : "Delete"}>
                              <Trash2 size={14} />
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

        </div>
      </div>
    </div>
  );
}