import { createAsyncThunk } from '@reduxjs/toolkit';
import { Asset, Company } from '../../interfaces';
import { getAssetsByCompanyId, getCompanies, getLocationsByCompanyId } from '../../service/companies';

export const fetchCompanies = createAsyncThunk<Company[], void>(
  'assetData/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const companies = await getCompanies();
      return companies;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Erro ao buscar empresas');
    }
  }
);
  
export const fetchLocationsByCompanyId = createAsyncThunk<Location[], string>(
  'assetData/fetchLocationsByCompanyId',
  async (companyId: string, { rejectWithValue }) => {
    try {
      const locations = await getLocationsByCompanyId(companyId);
      return locations;
    } catch (error) {
      console.error(error);
      return rejectWithValue(`Erro ao buscar localizações para a empresa ${companyId}`);
    }
  }
);
  
export const fetchAssetsByCompanyId = createAsyncThunk<Asset[], string>(
  'assetData/fetchAssetsByCompanyId',
  async (companyId: string, { rejectWithValue }) => {
    try {
      const assets = await getAssetsByCompanyId(companyId);
      return assets;
    } catch (error) {
      console.error(error);
      return rejectWithValue(`Erro ao buscar ativos para a empresa ${companyId}`);
    }
  }
);
  