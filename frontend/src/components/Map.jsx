import React, { act } from 'react'
import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, TileLayer, Popup} from 'react-leaflet'
import { Icon } from 'leaflet'
const Map = ({coords, name}) => {
    console.log("Coords",coords)
    console.log("Name", name)
    const actualCoords=[coords[1], coords[0]]
    console.log(actualCoords)
    const customIcon= new Icon({
        iconUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/752px-Map_pin_icon_green.svg.png',
        iconSize:[40,40]
    })
    return (
        <div>
            <MapContainer center={actualCoords} zoom={13} style={{"height":"100vh"}}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={actualCoords} icon={customIcon}>
                    <Popup><h2>{name}</h2></Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
