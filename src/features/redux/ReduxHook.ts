import { useDispatch, useSelector } from 'react-redux'
import StoreRedux from '../../redux/Store'
import { Action, ThunkAction } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof StoreRedux.getState>
export type AppDispatch = typeof StoreRedux.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()