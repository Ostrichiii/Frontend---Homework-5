import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

const translations = {
    en: {
      title: "Shopping App", // Header.js
      add_list: "+ Add List", // MainPage.js
      confirm_delete: "Confirm Delete", // MainPage.js
      confirm_delete_message: "Are you sure you want to delete this shopping list? This action cannot be undone.", // MainPage.js
      active: "Active", // MainPage.js, ItemFilter.js
      all: "All", // MainPage.js
      archived: "Archived", // ItemFilter.js
      unarchive: "Unarchive", // ShoppingListItem.js
      archive: "Archive", // ShoppingListItem.js
      delete: "Delete", // ShoppingListItem.js, MemberManagement.js
      active_items: "Active Items", // MainPage.js
      resolved_items: "Resolved Items", // MainPage.js
      new_member: "New member", // MemberManagement.js
      members: "Members", // MemberManagement.js, ShoppingListDetail.js
      new_item: "New item", // ShoppingListDetail.js
      add_member: "+ New Member", // MemberManagement.js
      leave_list: "Leave List", // ShoppingListDetail.js
      error: "Error", // ErrorAlert.js
      error_failed_load: "Failed to load shopping lists.", // MainPage.js
      error_failed_create: "Failed to create a new shopping list.", // MainPage.js
      error_failed_toggle: "Failed to toggle archive state.", // MainPage.js
      error_failed_delete: "Failed to delete the shopping list.", // MainPage.js
      loading: "Loading, please wait...", // LoadingSpinner.js
      cancel: "Cancel", // MainPage.js
      items: "Items", // ShoppingListDetail.js
    },
    cs: {
      title: "Nákupní aplikace", // Header.js
      add_list: "+ Přidat seznam", // MainPage.js
      confirm_delete: "Potvrdit smazání", // MainPage.js
      confirm_delete_message: "Opravdu chcete smazat tento nákupní seznam? Tuto akci nelze vrátit zpět.", // MainPage.js
      active: "Aktivní", // MainPage.js, ItemFilter.js
      all: "Vše", // MainPage.js
      archived: "Archivováno", // ItemFilter.js
      unarchive: "Obnovit", // ShoppingListItem.js
      archive: "Archivovat", // ShoppingListItem.js
      delete: "Smazat", // ShoppingListItem.js, MemberManagement.js
      active_items: "Aktivní položky", // MainPage.js
      resolved_items: "Vyřešené položky", // MainPage.js
      new_member: "Nový člen", // MemberManagement.js
      members: "Členové", // MemberManagement.js, ShoppingListDetail.js
      new_item: "Nová položka", // ShoppingListDetail.js
      add_member: "+ Přidat člena", // MemberManagement.js
      leave_list: "Opustit seznam", // ShoppingListDetail.js
      error: "Chyba", // ErrorAlert.js
      error_failed_load: "Nepodařilo se načíst nákupní seznamy.", // MainPage.js
      error_failed_create: "Nepodařilo se vytvořit nový nákupní seznam.", // MainPage.js
      error_failed_toggle: "Nepodařilo se přepnout stav archivu.", // MainPage.js
      error_failed_delete: "Nepodařilo se smazat nákupní seznam.", // MainPage.js
      loading: "Načítání, prosím čekejte...", // LoadingSpinner.js
      cancel: "Zrusit", // MainPage.js
      items: "Polozky", // ShoppingListDetail.js
    },
  };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);