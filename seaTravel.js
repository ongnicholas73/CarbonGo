const getSeaTravel = () => {
    console.log("*******");

    const passengerNumber = document.querySelector("#passengerNumSea").value;
    const distance = document.querySelector("#distanceSea").value;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer XQAMBD0WN7MA2MN3E8XJ27M5BKXE");

  const raw = `{
    "emission_factor": {
      "activity_id": "passenger_ferry-route_type_na-fuel_source_na",
      "data_version": "^2"
    },
    "parameters": {
      "passengers": ${parseFloat(passengerNumber)},
      "distance_unit": "mi",
      "distance": ${parseFloat(distance)}
    }
    }`

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://beta4.api.climatiq.io/estimate", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        document.querySelector("#passengerSeaRecieve").textContent = passengerNumber;
        document.querySelector("#distanceSeaRecieve").textContent = distance;
        document.querySelector("#seaTravelCo2num").textContent = Math.round(result.co2e * 100) / 100
    })
    .catch((error) => console.log("error", error));
};

document.querySelector("#sea-calc-btn").addEventListener("click", () => getSeaTravel())  