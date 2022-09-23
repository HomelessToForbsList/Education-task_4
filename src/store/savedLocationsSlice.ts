import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Location } from '../types'


interface LocationsList{
  list: Location[];
}

const savedLocations = createSlice({
  name: 'savedLocations',
  initialState:{
    list: localStorage.getItem('locations') ? JSON.parse(localStorage.getItem('locations') || '') : [],
  } as LocationsList,
  reducers:{
    setList: (state, action: PayloadAction<Location[]>)=>{ state.list = action.payload},
  }
})

export const {setList} = savedLocations.actions

export default savedLocations.reducer