//@ts-nocheck

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

module.exports = formatDate;
