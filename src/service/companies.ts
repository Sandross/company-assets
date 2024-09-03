import apiRequest from './axios';

export const getCompanies = async () => {
  try {
    const response = await apiRequest.get('/companies');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getLocationsByCompanyId = async (companyId: string) => {
  try {
    const response = await apiRequest.get(`/companies/${companyId}/locations`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAssetsByCompanyId = async (companyId: string) => {
  try {
    const response = await apiRequest.get(`/companies/${companyId}/assets`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
