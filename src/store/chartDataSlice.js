import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchChartData = createAsyncThunk(
  'chartData/fetchChartData',
  async function(location){
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&limit=5&appid=1158024bd75e5c1b4bddd784d9154d98&units=metric`)
    const data = await res.json()
    return data
  }
)

const chartDataSlice = createSlice({
  name: 'chartData',
  initialState:{
    chartData: [],
    mark: ['main' ,'temp']
  },
  reducers:{
    setMark: (state, action)=>{ state.mark = action.payload.split('.')}
  },
  extraReducers:{
    [fetchChartData.fulfilled]: (state, action) => {
      let filtered = []
      for (let i = 0; i < 32; i += 7) {
        filtered.push(action.payload.list[i])
      }
      let newArr = []
      const mark = state.mark
      for (let j = 0; j < 5; j++) {
        let i = j
        newArr.push({ date: j===0 ? 'Today' : `Day ${i+1}`, mark:  filtered[j][mark[0]][mark[1]] })
      }
      state.chartData = newArr
    }
  }
})

export const {setMark} = chartDataSlice.actions

export default chartDataSlice.reducer