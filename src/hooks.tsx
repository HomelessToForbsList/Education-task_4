import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useLocationSelector = () => { return  useAppSelector((state: RootState) => state.location.location)}
export const useListSelector = () => {return useAppSelector((state ) => state.savedLocations.list)}
export const useOptionsSelector = () => { return useAppSelector(state => state.location.options)}
export const useDataSelector = () => { return useAppSelector(state => state.data.data)}
export const useChartDataSelector = () => { return useAppSelector(state => state.chartData.chartData)}

