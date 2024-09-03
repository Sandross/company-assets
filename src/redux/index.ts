import { configureStore } from '@reduxjs/toolkit';
import {assetsReducer} from '../redux/reducers/assets';

export const store = configureStore({
  reducer: {
    assetData: assetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
