export const extractTime = (datetime) => {
  const dateObj = new Date(datetime);
  const hours = String(dateObj.getUTCHours());
  const minutes = String(dateObj.getUTCMinutes());

  return `${hours}:${minutes}`;
};