// async function getDriverRanks() {
//     try {
//         const resp = await window.fetch('https://api-formula-1.p.rapidapi.com/rankings/drivers?season=2021', {method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '4818705ef7msh949a70a405c962fp1fea89jsn66dada7a2c3b',
//             'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
//         }})
//         const data = await resp.json();
//         console.log(data);

//         // return data => data.forEach(item => showDrivers(item));
//     } catch (err) {
//         console.log(err);

//         return [];
//     }
// }

// function init() {
//     getDriverRanks();
//     showDrivers()
// }

// function to fetch driver data
// function getRankings() {
//     fetch ('http://localhost:3000/response', {
//         method: 'GET',
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
// }

async function getDriversFromServer() {
    try {
        const resp = await window.fetch('http://localhost:3000/response', { method: "GET" });
        const data = await resp.json();

        console.log(data)

        return data;
    } catch (error) {
        console.log(error);

        return [];
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const rankings = await getDriversFromServer()

    // displaying driver names in a list
    let driverList = document.querySelector('#drivers')

    rankings.forEach((dereva) => {
        
        let oneDriver = document.createElement('li')
        oneDriver.className = 'driver-item'

        oneDriver.innerHTML = dereva.driver.name
        driverList.appendChild(oneDriver)
        

    })
})
    
  
