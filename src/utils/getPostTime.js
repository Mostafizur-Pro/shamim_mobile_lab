export const formattedTime = (createdAt) => {
  // console.log('time', createdAt)
  const postDate = new Date(createdAt);
  const currentDate = new Date();

  const timeDiffMillis = currentDate - postDate;

  const timeDiffSeconds = Math.floor(timeDiffMillis / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (timeDiffSeconds < minute) {
    return "Just now";
  } else if (timeDiffSeconds < hour) {
    const minutes = Math.floor(timeDiffSeconds / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (timeDiffSeconds < day) {
    const hours = Math.floor(timeDiffSeconds / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (timeDiffSeconds < month) {
    const days = Math.floor(timeDiffSeconds / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (timeDiffSeconds < year) {
    const months = Math.floor(timeDiffSeconds / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDiffSeconds / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};
