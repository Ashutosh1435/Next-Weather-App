export function getFormattedDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const mint = date.getMinutes();
  const sec = date.getSeconds();
  return `${day}/${month}/${year} ${hour}:${mint}:${sec}`;
}
