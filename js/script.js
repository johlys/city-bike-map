var map = L.map('map').setView([60.3884218, 5.3291811], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


var clientIdentifier = 'Client-Identifier'; // Replace with your own client identifier!
var allStations = [];
var markers = [];

function fetchStations() {
    fetch('https://gbfs.urbansharing.com/bergenbysykkel.no/station_information.json', {
        method: 'GET',
        headers: {
            'Client-Identifier': clientIdentifier
        }
    })
    .then(response => response.json())
    .then(data => {
        allStations = data.data.stations;
        fetchStatuses();
    })
    .catch(error => console.log('Error fetching station information:', error));
}

function fetchStatuses() {
    fetch('https://gbfs.urbansharing.com/bergenbysykkel.no/station_status.json', {
        method: 'GET',
        headers: {
            'Client-Identifier': clientIdentifier
        }
    })
    .then(response => response.json())
    .then(statusData => {
        allStations.forEach(station => {
            var status = statusData.data.stations.find(s => s.station_id === station.station_id);
            if (status) {
                station.status = status;
            }
        });
        displayStations();
    })
    .catch(error => console.log('Error fetching station statuses:', error));
}

function displayStations() {
    markers.forEach(marker => marker.remove());
    markers = [];

    let filledStationsChecked = document.getElementById('filledStations').checked;
    let availableBikesChecked = document.getElementById('availableBikes').checked;

    allStations.forEach(station => {
        if (station.status) {
            let isFilled = station.status.num_bikes_available === station.capacity;
            let hasAvailableBikes = station.status.num_bikes_available > 0;

            let shouldDisplayStation = (filledStationsChecked && isFilled) || 
                                        (availableBikesChecked && hasAvailableBikes);

            if (shouldDisplayStation) {
                var marker = L.marker([station.lat, station.lon]).addTo(map)
                .bindPopup(`<b>${station.name}</b><br>Available Bikes: ${station.status.num_bikes_available}<br>Available Parking: ${station.capacity - station.status.num_bikes_available}`);
                markers.push(marker);
            }
        }
    });
}

fetchStations();

document.getElementById('filledStations').addEventListener('change', displayStations);
document.getElementById('availableBikes').addEventListener('change', displayStations);

