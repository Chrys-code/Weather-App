window.addEventListener('load', ()=> {

    let long;
    let lat;
    let temperatureDesc = document.querySelector('.temperature-desc');
    let degree = document.querySelector('.degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temparatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    // Create a location request vis navigator.geolocation
    // If location found script runs
    if(navigator.geolocation){

        // Search by coordinates and store them into variables
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = "https://cors-anywhere.herokuapp.com/";
            // Source: https://github.com/Rob--W/cors-anywhere/
            // Allows us to make cross-origin requests to anywhere even from local host

            // Connect to API and pass coordinates, units=imperial
            const api =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=hourly,daily&appid=45041778e267e904e8ea7b785d58f836`;
            //const api =`${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}lon=${long}&exclude=hourly,daily&appid=45041778e267e904e8ea7b785d58f836`;

            // Fetch data from API in json
            // Do something with the data
            fetch(api).then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Pull all the data from "currently" (now just temp and summary) (can be seen in console)
                const {temp} = data.current;
                // Weather is a 2 object array
                // Access to the required elements of the first object 
                const {description, icon} = data.current.weather[0];
                // Set DOM Elements from API
                degree.textContent = temp;
                temperatureDesc.textContent = description;
                locationTimezone.textContent = data.timezone;
                // Celsius formula  remember we requested imperial units as Farenheit
                let celsius = (temp - 32) * (5 / 9);

                    // Set icon to match weather description
                    setIcon(icon, document.querySelector('.icon'));

                    function setIcon() {
                        //Icons are given on exteral html pages
                       document.getElementById("icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                   };
               
                    // Change temperature Celsius/Farenheit
                    temparatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === "F") {
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
        
        console.log('Failed to determine geolocation');
    
    };
});


