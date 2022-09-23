import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Location } from '../types'


interface ChartData {
  chartData: {date: string; mark: number}[];
  mark: string[];
}

interface Response {
  coord: { lat: number, lon: number };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  cnt: number;
  cod: string;
  list: any[]
}

export const fetchChartData = createAsyncThunk(
  'chartData/fetchChartData',
  async function (location: Location) {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&limit=5&appid=1158024bd75e5c1b4bddd784d9154d98&units=metric`)
    const data: Response = await res.json()
    return data
  }
)



const chartDataSlice = createSlice({
  name: 'chartData',
  initialState: {
    chartData: [],
    mark: ['main', 'temp']
  } as ChartData,
  reducers: {
    setMark: (state, action: PayloadAction<string>) => { state.mark = action.payload.split('.') }
  },
  extraReducers: builder => {
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      let filtered = []
      for (let i = 0; i < 32; i += 7) {
        filtered.push(action.payload.list[i])
      }
      let newArr = []
      const mark = state.mark
      for (let j = 0; j < 5; j++) {
        let i = j
        newArr.push({ date: j === 0 ? 'Today' : `Day ${i + 1}`, mark: filtered[j][mark[0]][mark[1]] })
      }
      state.chartData = newArr
    })
  }
})

export const { setMark } = chartDataSlice.actions

export default chartDataSlice.reducer