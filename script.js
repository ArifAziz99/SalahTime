// Function to fetch data
async function fetchData(today) {
    try {
        const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${today}?city=patna&country=india&method=8`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);
        displayTime(data); // Call displayTime to show the data
    } catch (error) {
        console.error(error);
    }
}

// Function to display time data
function displayTime(data) {
    const {
        date: { gregorian: { date: today } },
        timings
    } = data.data; // Extracting required fields

    // Create elements for display
    const displayDate = document.createElement("h1");
    displayDate.textContent = `Date: ${today}`;

    const timingsContainer = document.createElement("div");
    timingsContainer.id = "timings";

    // Loop through timings object and create elements dynamically
    for (const [key, value] of Object.entries(timings)) {
        const timingElement = document.createElement("p");
        timingElement.textContent = `${key}: ${value}`;
        timingsContainer.appendChild(timingElement);
    }

    // Append the created elements to the DOM
    const stime = document.getElementById("stime") || document.body; // Ensure `stime` exists
    stime.appendChild(displayDate);
    stime.appendChild(timingsContainer);
}

// Get today's date
const today = new Date();
