export function getFormattedDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const ampm = hour >= 12 ? "pm" : "am";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = String(minute).padStart(2, "0");
  const dayOfWeek = days[currentDate.getDay()];

  return `${year}, ${month} ${dayOfMonth}, ${formattedHour}:${formattedMinute} ${ampm}, ${dayOfWeek}`;
}

// 22/03/2024 format
export function formatedDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

// Date & Time Formate
export const formatDateString = (dateString) => {
  const date = new Date(dateString); // Convert the string to a Date object
  const options = {
    month: "short", // Short month name (e.g., Mar)
    day: "numeric", // Day of the month (e.g., 20)
    year: "numeric", // Full year (e.g., 2024)
    hour: "numeric", // Hour (e.g., 1)
    minute: "numeric", // Minute (e.g., 15)
    hour12: true, // Use 12-hour clock (e.g., AM/PM)
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};


// Assuming post.created_at is your timestamp in the format "2024-05-05T11:26:56.000Z"


// Usage example:
// const createdAt = "2024-05-05T11:26:56.000Z";
// const formattedTime = formatFacebookLikeTime(createdAt);
// console.log(formattedTime); // Example output: "2 days ago"
