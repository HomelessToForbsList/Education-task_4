import {configureStore} from '@reduxjs/toolkit'
import location from './locationSlice'
import data from './dataSlice'
import chartData from './chartDataSlice'
import savedLocations from './savedLocationsSlice'

export default configureStore({
  reducer:{
    location,
    data,
    chartData,
    savedLocations
  }
})