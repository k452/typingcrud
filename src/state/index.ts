import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import exampleSlice, { exampleThunk } from 'state/example'
import authFormSlice from 'state/authForm'
import authSlice, { authThunk } from 'state/auth'
import settingSlice, { settingThunk } from 'state/setting'
import gameFormSlice, { gameFormThunk } from 'state/game/gameForm'
import gameListSlice, { gameListThunk } from 'state/game/gameList'
import gamePlaySlice, { gamePlayThunk } from 'state/game/gamePlay'
import gameParamsSlice  from 'state/game/gameParams'


export const store = configureStore({
  reducer: {
    [exampleSlice.name]: exampleSlice.reducer,
    [authFormSlice.name]: authFormSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [settingSlice.name]: settingSlice.reducer,
    [gameFormSlice.name]: gameFormSlice.reducer,
    [gameListSlice.name]: gameListSlice.reducer,
    [gamePlaySlice.name]: gamePlaySlice.reducer,
    [gameParamsSlice.name]: gameParamsSlice.reducer,
  }
})

export const actions = {
  [exampleSlice.name]: exampleSlice.actions,
  [authFormSlice.name]: authFormSlice.actions,
  [authSlice.name]: authSlice.actions,
  [settingSlice.name]: settingSlice.actions,
  [gameFormSlice.name]: gameFormSlice.actions,
  [gameListSlice.name]: gameListSlice.actions,
  [gamePlaySlice.name]: gamePlaySlice.actions,
  [gameParamsSlice.name]: gameParamsSlice.actions,
}

export const thunkActions = {
  [exampleSlice.name]: exampleThunk,
  [authSlice.name]: authThunk,
  [settingSlice.name]: settingThunk,
  [gameFormSlice.name]: gameFormThunk,
  [gameListSlice.name]: gameListThunk,
  [gamePlaySlice.name]: gamePlayThunk,
}


export type AppState = ReturnType<typeof store.getState>
export const useAppSelector: <TSelected>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => TSelected = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
