// @ts-nocheck
async function formatDateTime(dateString) {
  const date = new Date(dateString);
  const isoString = date.toISOString();
  return isoString.slice(0, 16);
}

module.exports = formatDateTime;
