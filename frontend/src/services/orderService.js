import request from "./api";

export const getOrders = (params = "") =>
  request(`/orders${params}`);

export const getOrderById = (id) =>
  request(`/orders/${id}`);

export const createOrder = (data) =>
  request("/orders", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateOrderStatus = (id, status) =>
  request(`/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
