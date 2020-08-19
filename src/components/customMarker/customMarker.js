import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Marker, InfoBox, } from '@react-google-maps/api'
import { updateMarkerValue } from '../../redux/actions'
import { infoBoxOptions } from '../constants'
import './customMarker.scss'


const CustomMarker = ({ position, text, markerIdx }) => {

  const dispatch = useDispatch()

  const [ inputValue, setInputValue ] = useState(text)

  const onIputChange = (event) => {
    setInputValue(event.target.value)
    dispatch(updateMarkerValue(markerIdx, event.target.value))
  }

  return (
    <div>
      <Marker
        position={ position }
      />
      <InfoBox
        options={ infoBoxOptions }
        position={ position }
      >
        <div className='input-container'>
          <input className='input-element' onChange={ onIputChange } value={ inputValue } />
        </div>
      </InfoBox>
    </div>
  )
}

export default CustomMarker