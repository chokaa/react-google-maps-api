import { loadState } from './localStorage'
import { withReduxStateSync } from 'redux-state-sync'
import {
    SET_MAP_CENTER,
    SET_AUTOCOMPLETE_VALUE,
    SET_ZOOM,
    ADD_CUSTOM_MARKER,
    UPDATE_MARKER_VALUE,
} from './constants'

const mapReducer = (state = loadState(), action) => {
    switch (action.type) {
      case SET_MAP_CENTER: {
        const { mapCenter } = action
        return { ...state, mapCenter }
      }
      case SET_AUTOCOMPLETE_VALUE: {
        const { autocompleteValue } = action
        return { ...state, autocompleteValue }
      }
      case SET_ZOOM: {
        const { zoom } = action
        return { ...state, zoom }
      }
      case ADD_CUSTOM_MARKER: {
        const { marker } = action
        return { ...state, customMarkersArray: [ ...state.customMarkersArray, marker ] }
      }
      case UPDATE_MARKER_VALUE: {
        const { markerIdx, updatedTextValue } = action
        const updatedMarkerArray = state.customMarkersArray.reduce((acc, mark, idx) => {
          const updatedMarker = idx === markerIdx ? { ...mark, text: updatedTextValue } : mark
          return [ ...acc, updatedMarker ]
        }, [])
        return { ...state, customMarkersArray: updatedMarkerArray }
      }
      default:
        return { ...state }
    }
}

export default withReduxStateSync(mapReducer)
