import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Location, Data } from '../types'



export const fetchData = createAsyncThunk(
  'data/fetchData',
  async function(location: Location){
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&limit=5&appid=1158024bd75e5c1b4bddd784d9154d98&units=metric`)
    const data = await res.json()
    return data as Data
  }
)

const dataSlice = createSlice({
  name: 'data',
  initialState:{
    data:{} as Data
  },
  reducers:{
    setData: (state, action: PayloadAction<Data>) => {state.data = action.payload}
  },
  extraReducers: builder => {
    builder.addCase( fetchData.fulfilled, (state, action) => {state.data = action.payload})
  }
})

export const {setData} = dataSlice.actions

export default dataSlice.reducer