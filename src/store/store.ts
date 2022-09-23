import {configureStore} from '@reduxjs/toolkit'
import location from './locationSlice'
import data from './dataSlice'
import chartData from './chartDataSlice'
import savedLocations from './savedLocationsSlice'

const store =  configureStore({
  reducer:{
    location,
    data,
    chartData,
    savedLocations
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch