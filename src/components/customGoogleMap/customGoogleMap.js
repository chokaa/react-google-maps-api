import React, { useState } from 'react'
import { GoogleMap, LoadScript, Autocomplete, } from '@react-google-maps/api'
import { useDispatch, useSelector, } from 'react-redux'
import { setMapCenter, setAutocompleteValue, setZoom, addCustomMarker, } from '../../redux/actions'
import { mapContainerStyle, loadScriptPlaces, apiKey } from '../constants'
import CustomMarker from '../customMarker/customMarker'
import './customGoogleMap.scss'


const CustomGoogleMap = () => {

  const dispatch = useDispatch()

  const [ map, setMap ] = useState(null)
  const [ autocomplete, setAutocomplete ] = useState(null)
  const [ inputValue, setInputValue ] = useState('');

  const mapCenter = useSelector(state => state.mapCenter)
  const zoom = useSelector(state => state.zoom)
  const autocompleteValue = useSelector(state => state.autocompleteValue)
  const customMarkersArray = useSelector(state => state.customMarkersArray)

  const onAutoCompleteLoad = autocomplete => {
    setAutocomplete(autocomplete)
  }

  const onMapLoaded = map => {
    setMap(map)
  }

  const onAutocompletePlaceChanged = () => {
    if (autocomplete !== null) {
      const autocompletePlace = autocomplete.getPlace()
      if (autocompletePlace.geometry) {
        const currentCoordinates = { lat: autocompletePlace.geometry.location.lat(), lng: autocompletePlace.geometry.location.lng() }
        dispatch(setMapCenter(currentCoordinates))
        dispatch(setAutocompleteValue(autocompletePlace.formatted_address))
        setInputValue(autocompletePlace.formatted_address)
      }
      else {
        console.log('No location selected')
      }
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  const onMapZoomChanged = () => {
    if (map) {
      dispatch(setZoom(map.getZoom()))
    }
  }

  const onMapDragEnd = () => {
    if (map) {
      const center = { lat: map.getCenter().lat(), lng: map.getCenter().lng() }
      dispatch(setMapCenter(center))
    }
  }

  const onIputChange = (event) => {
    dispatch(setAutocompleteValue(''))
    setInputValue(event.target.value)
  }

  const onMapClick = (event) => {
    const marker = {
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      text: ''
    }
    dispatch(addCustomMarker(marker))
  }

  return (
    <LoadScript
      googleMapsApiKey={ apiKey }
      libraries={ loadScriptPlaces }
    >
      <GoogleMap
        id="maps-assignment"
        mapContainerStyle={ mapContainerStyle }
        center={ mapCenter }
        zoom={ zoom }
        onLoad={ onMapLoaded }
        onZoomChanged={ onMapZoomChanged }
        onDragEnd={ onMapDragEnd }
        onClick={ onMapClick }
      >
        <Autocomplete
          onLoad={ onAutoCompleteLoad }
          onPlaceChanged={ onAutocompletePlaceChanged }
        >
          <input
            type="text"
            className='autocomplete'
            onChange={ onIputChange }
            value={ autocompleteValue ? autocompleteValue : inputValue }
          />
        </Autocomplete>
        {
          customMarkersArray.length && customMarkersArray.map((marker, markerIdx) => {
            return <CustomMarker key={ markerIdx } position={ marker.position } text={ marker.text } markerIdx={ markerIdx } />
          })
        }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(CustomGoogleMap)