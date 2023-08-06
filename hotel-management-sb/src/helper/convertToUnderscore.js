export default function convertToUnderscore(str) {
  return str.toLowerCase().replace(/\s+/g, "_");
}
