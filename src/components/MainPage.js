import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import LoadingSpinner from './LoadingSpinner'
import ErrorAlert from './ErrorAlert'
import {
  getShoppingLists,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} from "../api";
import { useLanguage } from "./LanguageContext";

const MainPage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const users = [
    { id: 1, name: "Owner", role: "owner" },
    { id: 2, name: "Guest", role: "guest" },
  ];

  const [shoppingLists, setShoppingLists] = useState([]);
  const [filter, setFilter] = useState("active");
  const [newListName, setNewListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteList, setConfirmDeleteList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLists = async () => {
    try {
      const lists = await getShoppingLists();
      setShoppingLists(lists);
    } catch (err) {
      setError(t("error_failed_load"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const addNewList = async () => {
    if (newListName.trim() !== "") {
      try {
        const newList = await createShoppingList({
          name: newListName,
          archived: false,
          items: [],
          members: [],
        });
        setShoppingLists((prevLists) => [...prevLists, newList]);
        setNewListName("");
        setIsModalOpen(false);
      } catch (err) {
        setError(t("error_failed_create"));
      }
    }
  };

  const toggleArchive = async (id) => {
    try {
      const listToUpdate = shoppingLists.find((list) => list.id === id);
      const updatedList = await updateShoppingList(id, {
        ...listToUpdate,
        archived: !listToUpdate.archived,
      });
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list.id === id ? updatedList : list
        )
      );
    } catch (err) {
      setError(t("error_failed_toggle"));
    }
  };

  const deleteList = async () => {
    try {
      await deleteShoppingList(confirmDeleteList);
      setShoppingLists((prevLists) =>
        prevLists.filter((list) => list.id !== confirmDeleteList)
      );
      setConfirmDeleteList(null);
    } catch (err) {
      setError(t("error_failed_delete"));
    }
  };

  const filteredLists = shoppingLists.filter((list) =>
  filter === "all" ? true : !list.archived
);

  const goToShoppingListDetail = (list) => {
    navigate(`/shopping-list/${list.id}`, { state: { list } });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return <ErrorAlert message={error} onRetry={() => fetchLists()} />;
  }

  return (
    <div className="max-w-4xl w-full mx-auto bg-white p-8 rounded-lg shadow-lg relative dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
<Header
  title="Shopping App"
  currentUser={currentUser}
  setCurrentUser={setCurrentUser}
  users={users}
/>
      <div className="flex justify-between items-center mb-6">
      <div className="flex bg-gray-200 rounded-full p-1">
  <button
    onClick={() => setFilter("active")}
    className={`px-4 py-2 rounded-full ${
      filter === "active"
        ? "bg-blue-500 text-white"
        : "bg-transparent text-gray-700 hover:bg-gray-300"
    } transition`}
  >
    {t("active")}
  </button>
  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-2 rounded-full ${
      filter === "all"
        ? "bg-blue-500 text-white"
        : "bg-transparent text-gray-700 hover:bg-gray-300"
    } transition`}
  >
    {t("all")}
  </button>
</div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          {t("add_list")}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.map((list) => (
          <div
            key={list.id}
            onClick={() => goToShoppingListDetail(list)}
            className="relative p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200 transition cursor-pointer"
          >
            <div
              className="absolute top-[-5px] left-[-5px] group cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleArchive(list.id);
              }}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition ${
                  list.archived
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 bg-white text-gray-400 hover:border-blue-500 hover:bg-blue-100"
                }`}
              >
                ✓
              </div>
            </div>
            <h2 className="ml-8 text-lg font-bold text-gray-800 truncate">
              {list.name}
            </h2>
            <div className="ml-8 mt-2 text-sm text-gray-600">
              <p>
              {t("active_items")}:{" "}
                {list.items.filter((item) => !item.resolved).length}
              </p>
              <p>
              {t("resolved_items")}:{" "}
                {list.items.filter((item) => item.resolved).length}
              </p>
            </div>
            {currentUser.role === "owner" && (
  <div
    className="absolute top-[-5px] right-[-5px] group cursor-pointer"
    onClick={(e) => {
      e.stopPropagation();
      setConfirmDeleteList(list.id);
    }}
  >
    <button className="w-10 h-10 rounded-full text-gray-500 bg-white border-2 border-gray-300 flex items-center justify-center hover:text-red-500 hover:border-red-500 hover:bg-red-100 transition">
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </div>
)}
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add New Shopping List</h2>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Enter list name"
          className="p-3 border border-gray-300 rounded-lg shadow-sm w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addNewList}
          className="w-full bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          Add List
        </button>
      </Modal>
      <Modal
        isOpen={confirmDeleteList !== null}
        onClose={() => setConfirmDeleteList(null)}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800">{t("confirm_delete")}</h2>
        <p className="text-gray-700 mb-6">
        {t("confirm_delete_message")}
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setConfirmDeleteList(null)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            {t("cancel")}
          </button>
          <button
            onClick={deleteList}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            {t("delete")}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MainPage;