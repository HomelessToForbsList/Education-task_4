import {createSlice} from '@reduxjs/toolkit'



const savedLocations = createSlice({
  name: 'savedLocations',
  initialState:{
    list: localStorage.getItem('locations') ? JSON.parse(localStorage.getItem('locations')) : [],
  },
  reducers:{
    setList: (state, action)=>{ state.list = action.payload},
  },

})

export const {setList} = savedLocations.actions

export default savedLocations.reducer