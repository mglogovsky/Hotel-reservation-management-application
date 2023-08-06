export function getFormattedDate() {
  // Create a new Date object for the current date and time
  const today = new Date();

  // Get the date components
  const day = today.getDate(); // Returns the day of the month (1-31)
  const month = today.getMonth() + 1; // Returns the month (0-11), so we add 1 to get the actual month (1-12)
  const year = today.getFullYear(); // Returns the four-digit year

  // Format the date as a string in your preferred format
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
}
