import React from 'react'
import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, TileLayer, Popup} from 'react-leaflet'
import { Icon } from 'leaflet'
const Map = () => {
    const markers=[
        {
            geocode:[12.847869112573834, 77.68929815535415],
            popUp:"Shanders"
        },
        {
            geocode:[12.836763979957373, 77.65766779768292],
            popUp:"Polaris"
        },
        {
            geocode:[12.841832378291073, 77.64651361989854],
            popUp:"Barbeque nation"
        }
    ]
    const customIcon= new Icon({
        iconUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/752px-Map_pin_icon_green.svg.png',
        iconSize:[40,40]
    })
    return (
        <div>
            <MapContainer center={[12.847869112573834, 77.68929815535415]} zoom={13} style={{"height":"100vh"}}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {markers.map(marker=>{return <Marker position={marker.geocode} icon={customIcon} key={marker.popUp}>
                    <Popup><h2>{marker.popUp}</h2></Popup>
                </Marker>})}
            </MapContainer>
        </div>
    )
}

export default Map
