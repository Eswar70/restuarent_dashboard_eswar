import request from "./api";

export const getMenuItems = (params = "") =>
  request(`/menu${params}`);

export const searchMenuItems = (query) =>
  request(`/menu/search?q=${encodeURIComponent(query)}`);

export const createMenuItem = (data) =>
  request("/menu", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateMenuItem = (id, data) =>
  request(`/menu/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const deleteMenuItem = (id) =>
  request(`/menu/${id}`, {
    method: "DELETE"
  });

export const toggleAvailability = (id) =>
  request(`/menu/${id}/availability`, {
    method: "PATCH"
  });
