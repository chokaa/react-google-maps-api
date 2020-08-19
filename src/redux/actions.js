import {
    SET_MAP_CENTER,
    SET_AUTOCOMPLETE_VALUE,
    SET_ZOOM,
    ADD_CUSTOM_MARKER,
    UPDATE_MARKER_VALUE,
} from './constants'

export const setMapCenter = mapCenter => ({ type: SET_MAP_CENTER, mapCenter })

export const setAutocompleteValue = autocompleteValue => ({ type: SET_AUTOCOMPLETE_VALUE, autocompleteValue })

export const setZoom = zoom => ({ type: SET_ZOOM, zoom })

export const addCustomMarker = marker => ({ type: ADD_CUSTOM_MARKER, marker })

export const updateMarkerValue = (markerIdx, updatedTextValue) => ({ type: UPDATE_MARKER_VALUE, markerIdx, updatedTextValue })