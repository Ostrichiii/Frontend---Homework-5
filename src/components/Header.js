import React from "react";
import { useLanguage } from "./LanguageContext";
import ThemeToggleButton from "./ThemeToggleButton";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = ({ currentUser, setCurrentUser, users }) => {
  const { t } = useLanguage();

  return (
    <header className="p-4 text-gray-800 dark:bg-gray-800 dark:text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <div className="flex items-center gap-4">
        <select
          value={currentUser.id}
          onChange={(e) =>
            setCurrentUser(users.find((user) => user.id === parseInt(e.target.value)))
          }
          className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({t(user.role)})
            </option>
          ))}
        </select>
        <LanguageSwitcher />
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;