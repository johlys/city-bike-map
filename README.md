# Bergen-Bysykkel Map

This is a simple web application that shows the location of the Bergen Bysykkel stations on a map. The application is built using the [Leaflet](https://leafletjs.com/) library for the map and is using [Bergen Bysykkel open data](https://bergenbysykkel.no/apne-data/sanntid) for the station data.

<div align="center">
    <img src="images/city-bike.png" alt="Bysykkel Map" width="700">
</div>

## How to use

Change var ```clientIdentifier = 'Client-Identifier';``` in js/script.js to your own client identifier as specified on the [Sanntidsdata](https://bergenbysykkel.no/apne-data/sanntid) page of Bergen Bysykkel.


## Features

- Shows the location of the Bergen Bysykkel stations on a map.
- Clicking on a station shows the number of available bikes and locks.
- Can display filled and available stations.

## Future improvements

- Add bicycle routes from one station to another.
