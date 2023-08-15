export function howLongAgo(data: string) {
  const currentDate = new Date();
  const date = new Date(data);

  const timeDiff = currentDate.getTime() - date.getTime();

  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthsDiff =
    (currentDate.getFullYear() - date.getFullYear()) * 12 +
    (currentDate.getMonth() - date.getMonth());
  const yearsDiff = currentDate.getFullYear() - date.getFullYear();

  if (yearsDiff >= 1 && yearsDiff < 2) {
    return `${yearsDiff} year ago`;
  } else if (yearsDiff >= 1 && yearsDiff >= 2) {
    return `${yearsDiff} years ago`;
  } else if (monthsDiff >= 1 && monthsDiff < 2) {
    return `${monthsDiff} month ago`;
  } else if (monthsDiff >= 1 && monthsDiff >= 2) {
    return `${monthsDiff} months ago`;
  } else if (daysDiff >= 1 && daysDiff < 2) {
    return `Yesterday`;
  } else if (daysDiff > 1 && daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else if (daysDiff >= 7 && daysDiff <= 14) {
    return "Last week";
  } else if (daysDiff > 14) {
    return `${Math.floor(daysDiff / 7)} weeks ago`;
  } else if (hoursDiff === 1) {
    return `Ceated an hour ago`;
  } else if (hoursDiff > 1) {
    return `${hoursDiff} hours ago`;
  } else if (minutesDiff > 1) {
    return `${minutesDiff} minutes ago`;
  } else {
    return `Less than a minute ago`;
  }
}
