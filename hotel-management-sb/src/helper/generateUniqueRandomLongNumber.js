export default function generateUniqueRandomLongNumber() {
  // Get the current timestamp in milliseconds
  const timestamp = new Date().getTime();

  // Generate a random number between 0 and 999999
  const randomNum = Math.floor(Math.random() * 1000000);

  // Combine the timestamp and random number to create a unique long number
  const uniqueNumber = timestamp * 1000000 + randomNum;

  return uniqueNumber;
}
