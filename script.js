// Get today's date and format it as needed
const today = new Date();
const city = "city=patna";
const country = "country=india";
const formatted = today.toLocaleDateString("en-CA"); // YYYY-MM-DD

// Call the fetch function
fetchData(formatted);

async function fetchData(today) {
  try {
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${today}?${city}&${country}&method=8`;
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
      hijri: { date: hijriDate },
      hijri: {weekday: { en: hijriDay } },
      hijri: {month: { en: hijriMonth } },
      gregorian: { date: today },
      gregorian: { weekday: { en: gregorianDay } },
      gregorian: { month: { en: gregorianMonth } },
    },
    timings,
  } = data.data;


  const stime = document.getElementById("stime"); //stime =salah time
  stime.innerHTML = ""; // Clear previous content

  // Add hijri date display
  const dateElemAR = document.createElement("div");
  dateElemAR.className = "text-center text-xl text-black font-bold p-2 mt-7 mb-2 bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl cursor-pointer";
  dateElemAR.textContent = `${hijriDay} - ${hijriMonth} - ${hijriDate}`;
  stime.appendChild(dateElemAR);


    // Add gorg date display
  const dateElemEN = document.createElement("div");
  dateElemEN.className = "text-center text-xl text-black font-semibold p-2 mb-10  bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl cursor-pointer";
  dateElemEN.textContent = `${gregorianDay} - ${gregorianMonth} - ${today}`;
  stime.appendChild(dateElemEN);


  // Loop through ALL timings
  for (const [key, value] of Object.entries(timings)) {
    const card = document.createElement("div");
    card.className = "flex items-center justify-between mb-3 bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center transition duration-300 hover:shadow-xl transform hover:scale-105 cursor-pointer";

    card.innerHTML = ` <div class="text-2xl text-black font-semibold">${key}</div>
        <div class="text-3xl text-black font-bold mt-2">${value}</div>`;

    stime.appendChild(card);
  }
}

// Disable right-click and text selection
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('selectstart', event => event.preventDefault());