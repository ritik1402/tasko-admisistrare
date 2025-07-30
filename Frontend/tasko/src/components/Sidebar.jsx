import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ClipboardPlus, FilePlus2, MessageCircle, List } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex min-h-screen">
     
      <div className="w-64 bg-[#273F4F] text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard/add-task" className="flex items-center gap-3 hover:text-[#FE7743] transition">
              <ClipboardPlus size={20} />
              Add Task
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-task-type" className="flex items-center gap-3 hover:text-[#FE7743] transition">
              <FilePlus2 size={20} />
              Add Task Type
            </Link>
          </li>
          <li>
            <Link to="/dashboard/comments" className="flex items-center gap-3 hover:text-[#FE7743] transition">
              <MessageCircle size={20} />
              Comments
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-tasks" className="flex items-center gap-3 hover:text-[#FE7743] transition">
              <List size={20} />
              All Tasks
            </Link>
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
