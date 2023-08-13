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
    return `Created ${yearsDiff} year ago`;
  } else if (yearsDiff >= 1 && yearsDiff >= 2) {
    return `Created ${yearsDiff} years ago`;
  } else if (monthsDiff >= 1 && monthsDiff < 2) {
    return `Created ${monthsDiff} month ago`;
  } else if (monthsDiff >= 1 && monthsDiff >= 2) {
    return `Created ${monthsDiff} months ago`;
  } else if (daysDiff >= 1 && daysDiff < 2) {
    return `Yesterday`;
  } else if (daysDiff > 1 && daysDiff < 7) {
    return `Created ${daysDiff} ago`;
  } else if (daysDiff > 7) {
    return `Created ${Math.floor(daysDiff / 7)} weeks ago`;
  } else if (hoursDiff === 1) {
    return `Ceated an hour ago`;
  } else if (hoursDiff > 1) {
    return `Created ${hoursDiff} hours ago`;
  } else if (minutesDiff > 1) {
    return `Created ${minutesDiff} ago`;
  } else {
    return `Less than a minute ago`;
  }
}

// Usage example:
const date = "2022-03-14T04:00:00Z";
console.log(howLongAgo(date));
