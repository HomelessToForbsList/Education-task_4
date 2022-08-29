import {configureStore} from '@reduxjs/toolkit'
import location from './locationSlice'
import data from './dataSlice'
import chartData from './chartDataSlice'

export default configureStore({
  reducer:{
    location,
    data,
    chartData
  }
})