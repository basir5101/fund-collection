"use client";
import { useEffect, useRef } from "react";

export default function Modal({
  isOpen = false,
  onClose = () => {},
  title = "",
  children,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal(); // Native method to open as modal
    } else {
      dialog?.close(); // Native method to close
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose} // Handles closing via 'Esc' key
      className="rounded-2xl p-0 backdrop:bg-emerald-950/40 backdrop:backdrop-blur-sm shadow-2xl border-none outline-none overflow-hidden"
    >
      <div className="w-full max-w-lg bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-emerald-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
