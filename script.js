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
  dateElemAR.className = "text-center text-3xl text-white font-bold mb-1 mt-1";
  dateElemAR.textContent = `${hijriDay} | ${hijriMonth}`;
  stime.appendChild(dateElemAR);

  const dateElemARD = document.createElement("div");
  dateElemARD.className = "text-center text-3xl text-white font-bold mb-2 mt-1";
  dateElemARD.textContent = `${hijriDate} `;
  stime.appendChild(dateElemARD);

    // Add gorg date display
  const dateElemEN = document.createElement("div");
  dateElemEN.className = "text-center text-3xl text-white font-bold mb-1 ";
  dateElemEN.textContent = `${gregorianDay} | ${gregorianMonth}`;
  stime.appendChild(dateElemEN);

  const dateElemEND = document.createElement("div");
  dateElemEND.className = "text-center text-3xl text-white font-bold mb-10 ";
  dateElemEND.textContent = `${today} `;
  stime.appendChild(dateElemEND);

  // Loop through ALL timings
  for (const [key, value] of Object.entries(timings)) {
    const card = document.createElement("div");
    card.className = "flex items-center justify-between mb-4 bg-green-500 rounded-2xl p-6 text-center shadow-md";

    card.innerHTML = ` <div class="text-xl text-white font-bold">${key}</div>
        <div class="text-4xl text-white font-bold mt-2">${value}</div>`;

    stime.appendChild(card);
  }
}
