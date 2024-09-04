import { Asset, AssetsState, IAssetImageObject } from '../interfaces';
import asset from '../assets/asset.png';
import component from '../assets/component.png';
import location from '../assets/location.png';


export const AssetsImageObject: IAssetImageObject = { 
  'asset': asset,
  'component': component,
  'location': location 
};

export const applyFilters = (state: AssetsState) => {
  let filteredAssets = state.assets;
  
  if (state.searchQuery) {
    filteredAssets = filteredAssets.filter((asset) =>
      asset.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }
  
  if (state.filterByEnergySensors) {
    filteredAssets = filteredAssets.filter((asset) => asset.sensorType === 'energy');
  }
  
  if (state.filterByCriticalStatus) {
    filteredAssets = filteredAssets.filter((asset) => asset.status === 'critical');
  }
  
  filteredAssets = filteredAssets.filter((asset) => isInAssetPath(asset, filteredAssets, state.assets));
  
  state.filteredAssets = filteredAssets;
};
  
export const isInAssetPath = (asset: Asset, filteredAssets: Asset[], allAssets: Asset[]): boolean => {
  if (filteredAssets.includes(asset)) return true;
  
  const parent = allAssets.find((a) => a.id === asset.parentId);
  return parent ? isInAssetPath(parent, filteredAssets, allAssets) : false;
};
