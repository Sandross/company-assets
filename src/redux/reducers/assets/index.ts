import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset, AssetsState, Company, Location } from '../../../interfaces';
import { fetchAssetsByCompanyId, fetchCompanies, fetchLocationsByCompanyId } from '../../slices';
import { applyFilters } from '../../../utils';

const initialState: AssetsState = {
  companies: [],
  locations: [],
  assets: [],
  filteredAssets: [],
  filteredLocations: [],
  searchQuery: '',
  filterByEnergySensors: false,
  filterByCriticalStatus: false,
  loading: false,
  error: null,
  selectedCompanyId: null,
};

const assetsSlice = createSlice({
  name: 'assetData',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    toggleEnergySensorsFilter: (state) => {
      state.filterByEnergySensors = !state.filterByEnergySensors;
      applyFilters(state);
    },
    toggleCriticalStatusFilter: (state) => {
      state.filterByCriticalStatus = !state.filterByCriticalStatus;
      applyFilters(state);
    },
    setSelectedCompanyId: (state, action: PayloadAction<string | null>) => {
      state.selectedCompanyId = action.payload;
    },
  },
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
        applyFilters(state);
      })
    //@ts-expect-error state
      .addCase(fetchLocationsByCompanyId.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.loading = false;
        state.locations = action.payload;
        applyFilters(state);
      })
      .addCase(fetchLocationsByCompanyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAssetsByCompanyId.pending, (state) => {
        state.loading = true;
        state.error = null;
        applyFilters(state);
      })
      .addCase(fetchAssetsByCompanyId.fulfilled, (state, action: PayloadAction<Asset[]>) => {
        state.loading = false;
        state.assets = action.payload;
        applyFilters(state);
      })
      .addCase(fetchAssetsByCompanyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, toggleEnergySensorsFilter, toggleCriticalStatusFilter, setSelectedCompanyId } = assetsSlice.actions;
export const assetsReducer = assetsSlice.reducer;
