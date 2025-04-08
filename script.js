// Get today's date and format it as needed
const today = new Date();
const formatted = today.toLocaleDateString("en-CA"); // YYYY-MM-DD

// Call the fetch function
fetchData(formatted);

async function fetchData(today) {
  try {
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${today}?city=patna&country=india&method=8`;
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error("Could not fetch resource");

    const data = await response.json();
    displayTime(data);
  } catch (error) {
    console.error(error);
  }
}

function displayTime(data) {
  const {
    date: {
      gregorian: { date: today },
    },
    timings,
  } = data.data;

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekday[d.getDay()];
  document.getElementById("day").innerHTML = day;

  const stime = document.getElementById("stime"); //stime =salah time
  stime.innerHTML = ""; // Clear previous content

  // Add date display
  const dateElem = document.createElement("div");
  dateElem.className =
    "text-center text-4xl text-white font-bold mb-10 mt-1";
  dateElem.textContent = `${today}`;
  stime.appendChild(dateElem);

  // Loop through ALL timings
  for (const [key, value] of Object.entries(timings)) {
    const card = document.createElement("div");
    card.className =
      "flex items-center justify-between mb-4 bg-green-500 rounded-2xl p-6 text-center shadow-md";

    card.innerHTML = `
        <div class="text-xl text-white font-bold">${key}</div>
        <div class="text-4xl text-white font-bold mt-2">${value}</div>
      `;

    stime.appendChild(card);
  }
}
