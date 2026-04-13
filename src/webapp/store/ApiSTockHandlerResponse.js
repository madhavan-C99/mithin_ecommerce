// src/utils/apiResponseHandler.js

export const classifyCartResponse = (message = "") => {
  const msg = message.toLowerCase();

  if (/only\s+\d+/.test(msg)) {
    return "STOCK_ERROR";
  }

  if (msg.includes("success")) {
    return "SUCCESS";
  }

  return "UNKNOWN";
};