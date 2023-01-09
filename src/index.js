// function to get driver rankings by year
async function getDriverRanksByYear(year) {
    try {
        const resp = await window.fetch(`https://api-formula-1.p.rapidapi.com/rankings/drivers?season=${year}`, {method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4818705ef7msh949a70a405c962fp1fea89jsn66dada7a2c3b',
            'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }})
        const data = await resp.json();
        console.log(data);

        // using forEach to select each element separately through the respective function
        return data.response.forEach(items => renderDriverSeasonRanks(items));
    } catch (err) {
        console.log(err);

        return [];
    }
}

// function to clear drivers after a new selection is made
function clearDrivers() {
    let driverArea = document.querySelector('#drivers')
    driverArea.textContent=''
}

// function to display the drivers
function renderDriverSeasonRanks(dereva) {
    let driverList = document.querySelector('#drivers')
    let oneDriver = document.createElement('li')
    oneDriver.className = "pt-6 md:p-8 text-center md:text-left space-y-4" 
    oneDriver.className = "max-w-sm rounded overflow-hidden shadow-lg"
    
    // using innerHTML to apply elements to the DOM through normal HTML 
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
            ${dereva.points} Points, Position: ${dereva.position}
        </div>
        </figcaption>
    `
    // appending the driver list to the driver container
    driverList.appendChild(oneDriver) 
}

// function to handle driver year event
function driverByYearEvent() {
    let year = document.getElementById("years")   
    
    // get the value of the selected option from the drop-down
    year.addEventListener("change", async (e) => {
        clearDrivers()
        await getDriverRanksByYear(e.target.value)
        console.log(e.target.value)
        

    })
}

// function to get team rankings by year
async function getTeamRanksByYear(year) {
    try {
        const resp = await window.fetch(`https://api-formula-1.p.rapidapi.com/rankings/teams?season=${year}`, {method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4818705ef7msh949a70a405c962fp1fea89jsn66dada7a2c3b',
            'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }})
        const data = await resp.json();
        console.log(data);

        return data.response.forEach(items => renderTeamSeasonRanks(items));
    } catch (err) {
        console.log(err);

        return [];
    }
}

// function to clear drivers after a new selection is made
function clearTeams() {
    let teamArea = document.querySelector('#teams')
    teamArea.textContent=''
}

// function to display the teams based on rank
function renderTeamSeasonRanks(constructor) {
    let teamList = document.querySelector('#teams')
    let oneTeam = document.createElement('li')
    oneTeam.className = "pt-6 md:p-8 text-center md:text-left space-y-4" 
    oneTeam.className = "max-w-sm rounded overflow-hidden shadow-lg"
    
    // rendering on DOM from the API
    oneTeam.innerHTML=`<img src="${constructor.team.logo}" class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" width="284" height="412" />
        <figcaption class="font-medium">
        <div class="text-red-600 dark:text-red-600">
            ${constructor.team.name}
        </div>
        <div class="text-slate-700 dark:text-slate-500">
            ${constructor.points} Points, Position: ${constructor.position}
        </div>
        </figcaption>
    `
    // appending the list to the list container
    teamList.appendChild(oneTeam) 

}
// function to handle change event for the teams drop-down menu
function teamByYearEvent() {
    let yr = document.getElementById('team-years')

    yr.addEventListener('change', async (e) => {
        // calling the function to first clear the teams section
        clearTeams()
        await getTeamRanksByYear(e.target.value)
        console.log(e.target.value)
    })
}


// function to handle pause/play of the video at the Drive to Survive Section
function d2s() {
    let btn = document.getElementById('myBtn')
    let video = document.getElementById('myVideo')
    let mute = document.getElementById('mutebtn')

    // event listener to play/pause
    btn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            btn.innerHTML = "Pause";
          } else {
            video.pause();
            btn.innerHTML = "Play";
          }
    })

    // event listener to mute audio
    mute.addEventListener('click', () => {
        // checks if video is already muted and changes state accordingly
        if (video.muted === true) {
            video.muted = false;
            mute.innerHTML = "Mute";
        }
        
        else if (video.muted === false) {
            video.muted = true;
            mute.innerHTML = "Unmute"
        }
    })
}


//function to fetch all driver data
async function getAllDrivers() {
    try {
        const resp = await window.fetch("https://api-formula-1.p.rapidapi.com/rankings/drivers?season=2022", {method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4818705ef7msh949a70a405c962fp1fea89jsn66dada7a2c3b',
            'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }})
        const data = await resp.json();
        console.log(data);

        return data.response.forEach((items) => renderAllDrivers(items));
    } catch (err) {
        console.log(err);

        return [];
    }
}


// function to display the drivers on the DOM
function renderAllDrivers(pilot) {
    let driversPit = document.querySelector('.drivers-pit')
    let oneDriver = document.createElement('div');
    oneDriver.className = 'cont';

    // rendering on the selected part of DOM from the API server
    oneDriver.innerHTML = `<img src="${pilot.driver.image}" alt="${pilot.driver.abbr}"/>
        <h2>${pilot.driver.name}, ${pilot.driver.number}</h2>
        `
    driversPit.appendChild(oneDriver)
}

// function to display the modal popup on mouseenter event
function champModal() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".btn-open");
    const closeModalBtn = document.querySelector(".btn-close");

    // close modal function
    const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    };

    // close the modal when the close button and overlay is clicked
    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // close modal when the Esc key is pressed
    document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
    });

    // open modal function
    const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    };
    // open modal event
    openModalBtn.addEventListener("mouseenter", openModal);
}
// function for scrolling to top
function scrollTop() {
    const scroll = document.querySelector('.scroll-top');
    window.addEventListener('scroll', function() {
        scroll.classList.toggle("active", window.scrollY > 500)
    })

    scroll.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior:"smooth"
        })
    })
}

// function to hold all functions
function init() {
    driverByYearEvent();
    teamByYearEvent();
    d2s();
    getAllDrivers();
    champModal();
    scrollTop();
    
}

window.addEventListener("DOMContentLoaded", init)
    
  
