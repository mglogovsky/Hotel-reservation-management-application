export default function formatDate(dateArray) {
  try {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    return "";
  }
}

export function dateToArray(dateString = "") {
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    return [year, month, day];
  } catch (error) {}
}

export function formatDateArrayToString(dateArray = []) {
  try {
    const [year, month, day] = dateArray;
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  } catch (error) {
    return "";
  }
}
export function formatDateTimeArrayToString(inputArray = []) {
  try {
    const [year, month, day, hours, minutes, seconds, milliseconds] =
      inputArray;
    const dateObj = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return dateObj.toLocaleDateString(undefined, options);
  } catch (error) {}
}

export function formatDateStandardToNormal(dateString) {
  // Parse the input date string
  const date = new Date(dateString);

  // Extract the year, month, and day components from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Return the formatted date as "YYYY-MM-DD"
  return `${year}-${month}-${day}`;
}
