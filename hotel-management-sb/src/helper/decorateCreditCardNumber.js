export function decorateCreditCardNumber(number) {
  // Remove any non-digit characters
  const cleanedNumber = number.toString().replace(/\D/g, "");

  // Check if the number is exactly 16 digits
  if (cleanedNumber.length !== 16) {
    throw new Error(
      "Invalid credit card number. It should be exactly 16 digits long."
    );
  }

  // Insert spaces to format the number in groups of 4
  const formattedNumber = cleanedNumber.replace(/(.{4})/g, "$1 ");

  return formattedNumber.trim(); // Trim any leading/trailing spaces
}
