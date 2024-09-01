import apiRequest from './axios';

export const getCompanies = async () => {
  try{
    const response = await apiRequest.get('/companies');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
