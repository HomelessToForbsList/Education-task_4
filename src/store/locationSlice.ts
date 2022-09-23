import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type { Location } from '../types'

interface DefaultLocation{
  location: {
    value: string;
    name:string;
    country:string;
    state:string;
    lat: number;
    lon: number;
  };
  options: (Location )[];
}

export const fetchOptions = createAsyncThunk(
  'location/fetchLocation',
  async function(searchText: string){
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=1158024bd75e5c1b4bddd784d9154d98`)
    const arr: any[] = await  res.json()
    let filtered = arr.filter(el => ( el.country !== 'NO' && el.name.length > 1))
    let newArr: (Location)[] = filtered.map(el => el = {
      value: `${el.name} ${el.state ? el.state : ''} ${el.country}`,
      country: el.country,
      state: el.state,
      name: el.name,
      lat: el.lat,
      lon: el.lon
    })
    let data=[]
    for(let i=0; i < newArr.length; i++){
      const sameItems = newArr.filter(el => el?.value === newArr[i]?.value)
      if(sameItems.length <= 1) data.push(newArr[i])
      //else newArr[i] = null
    }
    return data
  }
)

export const fetchGeoLocation = createAsyncThunk(
  'location/fetchGeoLocation',
  async function(position: {lat: number; lon: number}){
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.lat}&lon=${position.lon}&limit=1&appid=1158024bd75e5c1b4bddd784d9154d98`)
    const arr = await res.json()
    return arr[0]
  }
)

const locationSlice = createSlice({
  name: 'location',
  initialState:{
    location: {
    value: '',
    name:'',
    country:'',
    state:'',
    lat: 0,
    lon:0
  },
  options:[]
  } as DefaultLocation,
  reducers:{
    setLocation: (state, action) =>{ state.location = action.payload}
  },
  extraReducers: builder => {
    builder.addCase( fetchOptions.fulfilled, (state, action) => {state.options = action.payload})
    builder.addCase(fetchGeoLocation.fulfilled, (state,action) => {
      state.location = {
          value: `${action.payload.name} ${action.payload.state ? action.payload.state : ''} ${action.payload.country}`,
          name: action.payload.name,
          country: action.payload.country,
          state: action.payload.state,
          lat: action.payload.lat,
          lon: action.payload.lon
    }})
  }
})

export const {setLocation} = locationSlice.actions

export default locationSlice.reducer

