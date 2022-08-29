import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchOptions = createAsyncThunk(
  'location/fetchLocation',
  async function(searchText){
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=1158024bd75e5c1b4bddd784d9154d98`)
    const arr = await  res.json()
    let filtered = arr.filter(el => ( el.country !== 'NO' && el.name.length > 1))
    let newArr = filtered.map(el => el = {
      value: `${el.name} ${el.state ? el.state : ''} ${el.country}`,
      country: el.country,
      state: el.state,
      name: el.name,
      lat: el.lat,
      lon: el.lon
    })
    let data=[]
    for(let i=0; i < newArr.length; i++){
      const sameItems = newArr.filter(el => el?.value === newArr[i].value)
      if(sameItems.length <= 1) data.push(newArr[i])
      else newArr[i] = null
    }
    return data
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
    lat: '',
    lon:''
  },
  options:[]
  },
  reducers:{
    setLocation: (state, action) =>{ state.location = action.payload}
  },
  extraReducers:{
    [fetchOptions.fulfilled]: (state, action) => {state.options = action.payload}
  }
})

export const {setLocation} = locationSlice.actions

export default locationSlice.reducer