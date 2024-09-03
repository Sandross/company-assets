import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset, AssetsState, Company } from '../../../interfaces';
import { fetchAssetsByCompanyId, fetchCompanies, fetchLocationsByCompanyId } from '../../slices';

const initialState: AssetsState = {
  companies: [],
  locations: [],
  assets: [],
  loading: false,
  error: null,
};

const assetsSlice = createSlice({
  name: 'assetData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<Company[]>) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLocationsByCompanyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationsByCompanyId.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.loading = false;
        //@ts-expect-error state
        state.locations = action.payload;
      })
      .addCase(fetchLocationsByCompanyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAssetsByCompanyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetsByCompanyId.fulfilled, (state, action: PayloadAction<Asset[]>) => {
        state.loading = false;
        state.assets = action.payload;
      })
      .addCase(fetchAssetsByCompanyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const assetsReducer = assetsSlice.reducer;
