import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Asset {
  id: string;
  name: string;
}

interface AssetsState {
  assets: Asset[];
}

const initialState: AssetsState = {
  assets: [],
};

export const getAllAssets = createAsyncThunk<Asset[], void>(
  'assets/getAllAssetsThunk',
  async () => {
    return [];
  }
);

export const getAssetsByRegion = createAsyncThunk<Asset[], string>(
  'assets/getAssetsByRegion',
  async (region: string) => {
    return region as unknown as Asset[] || [];
  }
);

const assetsReducer = createSlice({
  name: 'assetsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAssets.fulfilled, (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    });
    builder.addCase(getAssetsByRegion.fulfilled, (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    });
  },
});

export type RootState = ReturnType<typeof assetsReducer.reducer>;

export default assetsReducer.reducer;
