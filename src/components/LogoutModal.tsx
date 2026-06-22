import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user.store";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useUserStore();

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    onClose();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="relative w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-manrope text-xl font-bold text-gray-900">
            Tizimdan chiqasizmi?
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="mb-8">
          <p className="text-sm leading-relaxed text-gray-500">
            Hisobingizdan chiqmoqchimisiz? Davom etish uchun qaytadan login va parolingiz bilan tizimga kirishingiz kerak bo'ladi.
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition"
          >
            Ha, chiqish
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
