export function formatDate(date: string | Date) {
  const newDate = new Date(date).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return newDate;
}
