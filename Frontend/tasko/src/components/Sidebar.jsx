import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ClipboardPlus, FilePlus2, MessageCircle, List } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-[#273F4F] text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard/add-task"
              className={({ isActive }) =>
                `flex items-center gap-3 transition ${
                  isActive ? "text-[var(--primary)]" : "hover:text-[#FE7743]"
                }`
              }
            >
              <ClipboardPlus size={20} />
              Add Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-task-type"
              className={({ isActive }) =>
                `flex items-center gap-3 transition ${
                  isActive ? "text-[var(--primary)]" : "hover:text-[#FE7743]"
                }`
              }
            >
              <FilePlus2 size={20} />
              Add Task Type
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/comments"
              className={({ isActive }) =>
                `flex items-center gap-3 transition ${
                  isActive ? "text-[var(--primary)]" : "hover:text-[#FE7743]"
                }`
              }
            >
              <MessageCircle size={20} />
              Comments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-tasks"
              className={({ isActive }) =>
                `flex items-center gap-3 transition ${
                  isActive ? "text-[var(--primary)]" : "hover:text-[#FE7743]"
                }`
              }
            >
              <List size={20} />
              All Tasks
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
