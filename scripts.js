const apiKey = "XQAMBD0WN7MA2MN3E8XJ27M5BKXE";
const kwh = 0

const getGridCarbonEmission = async (kwh) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${apiKey}`);

    console.log(kwh);
    
    const raw = JSON.stringify({
      "emission_factor": {
        "activity_id": "electricity-supply_grid-source_residual_mix",
        "data_version": "^1"
      },
      "parameters": {
        "energy": kwh,
        "energy_unit": "kWh"
      }
    });
    
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };
    
    const res = await fetch("https://beta4.api.climatiq.io/estimate", requestOptions);
    const data = await res.json();

    console.log(data)
    document.querySelector("#energynum").textContent = kwh;
    document.querySelector("#co2num").textContent = Math.round(data.co2e * 100) / 100
}

document.querySelector("#calc-btn").addEventListener("click", function() {
    const kwh = parseInt(document.querySelector("#inputPassword").value);
    getGridCarbonEmission(kwh);
});