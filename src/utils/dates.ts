export function getLast7Days() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date(); // Current date and time
  const result = [];

  // Loop to get dates for the last 7 days
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i); // Calculate the date for the past days

    const formattedDate = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

    result.push(formattedDate);
  }

  return result.reverse();
}

export function getInitialLatterLast7Days() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date(); // Current date and time
  const result = [];

  // Loop to get dates for the last 7 days
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i); // Calculate the date for the past days

    const dayName = days[currentDate.getDay()]; // Get day name from days array

    result.push(dayName);
  }

  return result.reverse();
}
