import React from "react";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage("en")}
        className={`p-2 rounded ${
          language === "en"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage("cs")}
        className={`p-2 rounded ${
          language === "cs"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        CS
      </button>
    </div>
  );
};

export default LanguageSwitcher;