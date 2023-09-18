
const getRoadTravel = () => {
    console.log("*******");

    const passengerNumber = document.querySelector("#passengerNumRoad").value;
    const distance = document.querySelector("#distanceRoad").value;

    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer XQAMBD0WN7MA2MN3E8XJ27M5BKXE");

    const raw = `{
  "emission_factor": {
    "activity_id": "passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na",
    "data_version": "^2"
  },
  "parameters": {
    "passengers": ${parseFloat(passengerNumber)},
    "distance": ${parseFloat(distance)},
    "distance_unit": "mi"
  }
}`

    const requestOptions = {
        method: 'POST',
        headers: header,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://beta4.api.climatiq.io/estimate", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            document.querySelector("#passengerRoadRecieve").textContent = passengerNumber;
            document.querySelector("#distanceRoadRecieve").textContent = distance;
            document.querySelector("#roadTravelCo2num").textContent = Math.round(data.co2e * 100) / 100
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
document.querySelector("#road-calc-btn").addEventListener("click", () => getRoadTravel())  
                
