const passenger = 0;


const getAirCarbonEmission = async (fromAirCode, toAirCode, flightClass, passenger) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${apiKey}`);

    console.log(passenger);
    console.log(fromAirCode);
    console.log(toAirCode);
    console.log(flightClass);
    
    const raw = JSON.stringify({
        "legs": [
            {
              "from": fromAirCode,
              "to": toAirCode,
              "passengers": passenger,
              "class": flightClass
            }
          ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };
    
    const res = await fetch("https://beta4.api.climatiq.io/travel/flights", requestOptions);
    const data = await res.json();

    console.log(data)
    document.querySelector("#fromAirCodeRecieve").textContent = fromAirCode;
    document.querySelector("#toAirCodeRecieve").textContent = toAirCode;
    document.querySelector("#airPassengerRecieve").textContent = passenger;
    document.querySelector("#flightClassRecieve").textContent = flightClass;
    document.querySelector("#airTravelCo2num").textContent = Math.round(data.co2e * 100) / 100
}

document.querySelector("#air-calc-btn").addEventListener("click", function() {
    const fromAirCode = document.querySelector("#fromAirportCode").value;
    const toAirCode = document.querySelector("#toAirportCode").value;
    const flightClass = document.querySelector("#flight-class").value;
    const passenger = parseInt(document.querySelector("#passengerNumAir").value);
    getAirCarbonEmission(fromAirCode, toAirCode, flightClass, passenger);
});


