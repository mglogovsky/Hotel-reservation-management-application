export default function calculateTotalDays(startDate, endDate) {
  // Convert the date strings to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Calculate the time difference in milliseconds
  const timeDiff = endDateObj.getTime() - startDateObj.getTime();

  // Convert the time difference to days
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return totalDays + 1;
}
