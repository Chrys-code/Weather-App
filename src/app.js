window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDesc = document.querySelector(".temperature-desc");
  let degree = document.querySelector(".degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temparatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  console.log(process.env.api);
  // Create a location request vis navigator.geolocation
  // If location found script runs
  if (navigator.geolocation) {
    // Search by coordinates and store them into variables
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // Connect to API and pass coordinates, units=imperial
      const api = process.env.api;

      // Fetch data from API in json
      // Do something with the data
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // Pull all the data from "currently" (now just temp and summary) (can be seen in console)
          const { temp } = data.current;
          // Weather is a 2 object array
          // Access to the required elements of the first object
          const { description, icon } = data.current.weather[0];
          // Set DOM Elements from API
          degree.textContent = temp;
          temperatureDesc.textContent = description;
          locationTimezone.textContent = data.timezone;
          // Celsius formula  remember we requested imperial units as Farenheit
          let celsius = (temp - 32) * (5 / 9);

          // Set icon to match weather description
          setIcon(icon, document.querySelector(".icon"));

          function setIcon() {
            //Icons are given on exteral html pages
            document.getElementById(
              "icon"
            ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          }

          // Change temperature Celsius/Farenheit
          temparatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              degree.textContent = Math.round(celsius);
            } else {
              temperatureSpan.textContent = "F";
              degree.textContent = temp;
            }
          });
        });
    });
  } else {
    console.log("Failed to determine geolocation");
  }
});
