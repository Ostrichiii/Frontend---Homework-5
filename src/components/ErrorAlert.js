import React from "react";
import { useLanguage } from "./LanguageContext";

const ErrorAlert = ({ message }) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="max-w-md w-full bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-lg relative animate-fade-in">
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 8v4m0 4h.01"
            ></path>
          </svg>
          <strong className="text-lg font-bold">{t("error")}</strong>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;