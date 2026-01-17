"use client";
import { Pencil, Plus, Trash2, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import UsersModal from "./UsersModal";
import { useState } from "react";

const UsersList = ({ users }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ব্যবহারকারীগণ</h1>
          <p className="mt-2 text-gray-600">
            সকল রেজিস্টার্ড ইউজারদের তালিকা ও ম্যানেজমেন্ট
          </p>
        </div>

        {/* Optional: Add new user button */}
        <button
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
          onClick={() => {
            setModalMode("add");
            setSelectedUser(null);
            setModalOpen(true);
          }}
        >
          <Plus size={20} />
          <span className="my-0 mt-px"> নতুন ইউজার যোগ করুন</span>
        </button>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100">
              <tr>
                <th
                  scope="col"
                  className="py-4 pl-6 pr-3 text-left text-sm font-semibold text-gray-700"
                >
                  নাম
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  ইমেইল
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell px-3 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  রোল
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-right text-sm font-semibold text-gray-700 pr-6"
                >
                  অ্যাকশন
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-gray-500">
                    এখনো কোনো ব্যবহারকারী নেই
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr
                    key={user._id.toString()}
                    className={twMerge(
                      "hover:bg-gray-50/70 transition-colors",
                      idx & 1 ? "bg-green-50" : "",
                    )}
                  >
                    <td className="whitespace-nowrap py-4 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                          <UserIcon size={18} />
                        </div>
                        <div className="font-medium text-gray-900">
                          {user.name || "N/A"}
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap py-4 px-3 text-gray-600">
                      {user.email}
                    </td>

                    <td className="hidden md:table-cell whitespace-nowrap py-4 px-3">
                      <span
                        className={`inline-flex items-center px-2.5 upp py-0.5 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-green-200 text-green-800"
                            : user.role === "moderator"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap py-4 pr-6 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setModalMode("edit");
                            setSelectedUser(user);
                            setModalOpen(true);
                          }}
                          className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit user"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setModalMode("delete");
                            setSelectedUser(user);
                            setModalOpen(true);
                          }}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <UsersModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        user={selectedUser}
        onSubmit={async (data) => {
          // handle create / update (call API or server action)
          console.log("Saving:", data);
          // after success:
          setModalOpen(false);
        }}
        onDelete={async (id) => {
          // handle delete
          console.log("Deleting:", id);
          setModalOpen(false);
        }}
        isLoading={false}
      />
      {/* // To open add modal:
      <button
    
      >
        নতুন ইউজার
      </button>
      // To open edit:
      <button

      >
        <Pencil size={18} />
      </button>
      // To open delete:
      <button
     
      >
        <Trash2 size={18} />
      </button> */}
      {/* 
          Uncomment when you implement real pagination
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-10">
              <Link href={`?page=${Math.max(1, page - 1)}`} ... />
              <span className="font-medium">Page {page} of {totalPages}</span>
              <Link href={`?page=${Math.min(totalPages, page + 1)}`} ... />
            </div>
          )} 
        */}
    </div>
  );
};

export default UsersList;
