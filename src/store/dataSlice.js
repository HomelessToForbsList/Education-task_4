import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async function(location){
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&limit=5&appid=1158024bd75e5c1b4bddd784d9154d98&units=metric`)
    const data = await res.json()
    return data
  }
)

const dataSlice = createSlice({
  name: 'data',
  initialState:{
    data: {}
  },
  reducers:{
    setData: (state, action) => {state.data = action.payload}
  },
  extraReducers:{
    [fetchData.fulfilled]: (state, action) => {state.data = action.payload}
  }
})

export const {setData} = dataSlice.actions

export default dataSlice.reducer