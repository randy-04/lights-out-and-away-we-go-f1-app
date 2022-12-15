async function getDriverRanksByYear(year) {
    try {
        const resp = await window.fetch(`https://api-formula-1.p.rapidapi.com/rankings/drivers?season=${year}`, {method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4818705ef7msh949a70a405c962fp1fea89jsn66dada7a2c3b',
            'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }})
        const data = await resp.json();
        console.log(data);

        return data.response.forEach(items => renderDriverSeasonRanks(items));
    } catch (err) {
        console.log(err);

        return [];
    }
}

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

// async function getDriversFromServer() {
//     try {
//         const resp = await window.fetch('http://localhost:3000/response', { method: "GET" });
//         const data = await resp.json();

//         console.log(data)

//         return data;
//     } catch (error) {
//         console.log(error);

//         return [];
//     }
// }

// function to display the drivers
function renderDriverSeasonRanks(dereva) {
    let driverList = document.querySelector('#drivers')
    let oneDriver = document.createElement('li')
    oneDriver.className = "pt-6 md:p-8 text-center md:text-left space-y-4" 
    oneDriver.className = "max-w-sm rounded overflow-hidden shadow-lg"
    

    oneDriver.innerHTML=`<img src="${dereva.driver.image}" class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" width="284" height="412" />
        <p class = "text-lg font-medium"> ${dereva.driver.name}, ${dereva.driver.number}</p>
        <figcaption class="font-medium">
        <div class="text-red-600 dark:text-red-600">
            ${dereva.team.name}
            <div class="flex items-center">
                <img class="w-10 h-10 rounded-full mr-4" src="${dereva.team.logo}"/>
            </div>
        </div>
        <div class="text-slate-700 dark:text-slate-500">
            ${dereva.points}, Position: ${dereva.position}
        </div>
        </figcaption>
    `
    
    driverList.appendChild(oneDriver)
        

    

}

window.addEventListener("DOMContentLoaded", async () => {
    const year = parseInt(document.getElementById("years").value)
    
    

    document.getElementById("years").addEventListener("click", async () => {
        await getDriverRanksByYear(year)
        console.log(year)

    })

})
    
  
