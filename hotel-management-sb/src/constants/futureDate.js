// Get today's date and format it as YYYY-MM-DD
const today = new Date();
today.setDate(today.getDate());
export const FUTURE_DATE = today.toISOString().split("T")[0];
