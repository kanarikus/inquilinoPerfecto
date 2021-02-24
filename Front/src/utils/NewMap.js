import { useCallback, useMemo, useRef, useState } from 'react'
import {MapContainer,Marker,TileLayer,Popup} from 'react-leaflet'

function NewMap({position, center, onChange}) {
    
      
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
            onChange(marker.getLatLng())
            }
        },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])
    
    return (
        <div className='page-map'>
            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            onChange={eventHandlers}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                {draggable
                    ? 'El marcador se mueve'
                    : 'Clicka para señalar tu casa'}
                </span>
            </Popup>
            </Marker>
            </MapContainer>
        </div>
        
    )
      
}

export default NewMap