import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useLanguage } from "./LanguageContext";

const ShoppingListDetail = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const users = [
    { id: 1, name: "Owner", role: "owner" },
    { id: 2, name: "Guest", role: "guest" },
  ];
  const defaultList = {
    name: "Default Shopping List",
    items: [
      { id: 1, name: "Default Item 1", resolved: false },
      { id: 2, name: "Default Item 2", resolved: false },
      { id: 3, name: "Default Item 3", resolved: true },
    ],
    members: ["Member 1", "Member 2", "Member 3"],
  };
  const defaultUser = users[0];

  const { list = defaultList, passedUser = defaultUser } = location.state || {};
  const [currentUser, setCurrentUser] = useState(passedUser);
  const [listName, setListName] = useState(list.name);
  const [newItem, setNewItem] = useState("");
  const [newMember, setNewMember] = useState("");
  const [items, setItems] = useState(list?.items || []);
  const [members, setMembers] = useState(list?.members || []);
  const [filter, setFilter] = useState("active");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoverType, setHoverType] = useState(null);
  const [hoveredRowType, setHoveredRowType] = useState(null);

  const handleListNameChange = (e) => {
    if (currentUser.role === "owner") {
      setListName(e.target.value);
    }
  };

  const addItem = () => {
    if (newItem) {
      setItems([...items, { id: items.length + 1, name: newItem, resolved: false }]);
      setNewItem("");
    }
  };

  const addMember = () => {
    if (currentUser.role === "owner" && newMember) {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const removeMember = (member) => {
    if (currentUser.role === "owner") {
      setMembers(members.filter((m) => m !== member));
    }
  };

  const toggleResolved = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    );
  };

  const leaveList = () => {
    navigate("/");
  };

  const filteredItems = items.filter(
    (item) => (filter === "active" ? !item.resolved : item.resolved)
  );

  return (
    <div className="max-w-4xl w-full mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header
      title={listName}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      users={users}
    />

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-0">{t("items")}:</h2>
          <div className="flex bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setFilter("active")}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full focus:outline-none ${
                filter === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-300"
              } transition`}
            >
              {t("active_items")}
            </button>
            <button
              onClick={() => setFilter("archive")}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full focus:outline-none ${
                filter === "archive"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-300"
              } transition`}
            >
              {t("resolved_items")}
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={t("new_item")}
            className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addItem}
            className="bg-green-500 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow hover:bg-green-600 transition w-full sm:w-48"
          >
            + {t("new_item")}
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className={`flex justify-between items-center py-2 sm:py-3 ${
                hoveredRow === item.id && hoveredRowType === "items"
                  ? hoverType === "delete"
                    ? "bg-red-100"
                    : hoverType === "archive"
                    ? "bg-blue-100"
                    : ""
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredRow(item.id);
                    setHoverType("archive");
                    setHoveredRowType("items");
                  }}
                  onMouseLeave={() => {
                    setHoveredRow(null);
                    setHoverType(null);
                    setHoveredRowType(null);
                  }}
                  onClick={() => toggleResolved(item.id)}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      item.resolved
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 bg-white text-gray-400 hover:border-blue-500 hover:bg-blue-100"
                    }`}
                  >
                    ✓
                  </div>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white rounded py-1 px-2 shadow-lg transition">
                    {item.resolved ? "Unresolve" : "Resolve"}
                  </span>
                </div>
                <span
                  className={`${
                    item.resolved ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </span>
              </div>
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => {
                  setHoveredRow(item.id);
                  setHoverType("delete");
                  setHoveredRowType("items");
                }}
                onMouseLeave={() => {
                  setHoveredRow(null);
                  setHoverType(null);
                  setHoveredRowType(null);
                }}
                onClick={() => removeItem(item.id)}
              >
                <button className="w-6 h-6 rounded-full text-gray-500 bg-white border-2 border-gray-300 flex items-center justify-center hover:text-red-500 hover:border-red-500 hover:bg-red-100 transition">
                  ✖
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white rounded py-1 px-2 shadow-lg transition">
                {t("delete")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-medium">{t("members")}:</h2>
        {currentUser.role === "guest" && (
          <button
            onClick={leaveList}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition text-sm sm:text-base"
          >
            {t("leave_list")}
          </button>
        )}
      </div>
      {currentUser.role === "owner" && (
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder={t("new_member")}
            className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addMember}
            className="bg-blue-500 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow hover:bg-blue-600 transition w-full sm:w-48"
          >
            {t("add_member")}
          </button>
        </div>
      )}
      <ul className="divide-y divide-gray-200">
        {members.map((member, index) => (
          <li
            key={index}
            className={`flex justify-between items-center py-2 sm:py-3 ${
              hoveredRow === index && hoveredRowType === "members"
                ? hoverType === "delete"
                  ? "bg-red-100"
                  : ""
                : ""
            }`}
          >
            <span className="text-gray-800">{member}</span>
            {currentUser.role === "owner" && (
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => {
                  setHoveredRow(index);
                  setHoverType("delete");
                  setHoveredRowType("members");
                }}
                onMouseLeave={() => {
                  setHoveredRow(null);
                  setHoverType(null);
                  setHoveredRowType(null);
                }}
                onClick={() => removeMember(member)}
              >
                <button className="w-6 h-6 rounded-full text-gray-500 bg-white border-2 border-gray-300 flex items-center justify-center hover:text-red-500 hover:border-red-500 hover:bg-red-100 transition">
                  ✖
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white rounded py-1 px-2 shadow-lg transition">
                {t("delete")}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListDetail;