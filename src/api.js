import mockData from "./data.json";

const useMock = process.env.REACT_APP_USE_MOCK === "true";
const API_URL = process.env.REACT_APP_API_URL;


const mockResponse = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 300));


const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};


export const getShoppingLists = async () => {
  return useMock
    ? mockResponse(mockData.shoppingLists)
    : apiRequest(`${API_URL}/shoppingList/list`);
};


export const getShoppingListById = async (id) => {
  return useMock
    ? mockResponse(
        mockData.shoppingLists.find((list) => list.id === parseInt(id, 10)) ||
          Promise.reject(new Error("Shopping list not found"))
      )
    : apiRequest(`${API_URL}/shoppingList/get/${id}`);
};


export const createShoppingList = async (newList) => {
  if (useMock) {
    const newId = mockData.shoppingLists.length + 1;
    const createdList = { id: newId, ...newList };
    mockData.shoppingLists.push(createdList);
    return mockResponse(createdList);
  }
  return apiRequest(`${API_URL}/shoppingList/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newList),
  });
};


export const updateShoppingList = async (id, updatedData) => {
  if (useMock) {
    const list = mockData.shoppingLists.find((list) => list.id === parseInt(id, 10));
    if (!list) throw new Error("Shopping list not found");
    Object.assign(list, updatedData);
    return mockResponse(list);
  }
  return apiRequest(`${API_URL}/shoppingList/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
};


export const deleteShoppingList = async (id) => {
  if (useMock) {
    const index = mockData.shoppingLists.findIndex((list) => list.id === parseInt(id, 10));
    if (index === -1) throw new Error("Shopping list not found");
    mockData.shoppingLists.splice(index, 1);
    return mockResponse({ message: "Shopping list deleted" });
  }
  return apiRequest(`${API_URL}/shoppingList/delete/${id}`, {
    method: "DELETE",
  });
};