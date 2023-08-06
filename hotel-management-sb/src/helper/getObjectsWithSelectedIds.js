export default function getObjectsWithSelectedIds({
  data,
  selectedIds,
  key = "id",
}) {
  return data.filter((object) => selectedIds.includes(object[key]));
}
