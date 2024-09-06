import { Asset, AssetsState } from '../interfaces';
import asset from '../assets/asset.png';
import component from '../assets/component.png';
import location from '../assets/location.png';

export const AssetsImageObject: Record<string, string> = {
  'asset': asset,
  'component': component,
  'location': location,
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
  
  const resultAssets = new Set(filteredAssets);
  
  filteredAssets.forEach((asset) => {
    addParentsToResult(asset, state.assets, resultAssets);
    addChildrenToResult(asset, state.assets, resultAssets);
  });
  
  state.filteredAssets = Array.from(resultAssets);
};
  
const addParentsToResult = (
  asset: Asset,
  allAssets: Asset[],
  resultAssets: Set<Asset>
) => {
  const parent = allAssets.find((a) => a.id === asset.parentId || a.id === asset.locationId);
  
  if (parent && !resultAssets.has(parent)) {
    resultAssets.add(parent);
    addParentsToResult(parent, allAssets, resultAssets);
  }
};
  
const addChildrenToResult = (
  asset: Asset,
  allAssets: Asset[],
  resultAssets: Set<Asset>
) => {
  const children = allAssets.filter((a) => a.parentId === asset.id);
  
  children.forEach((child) => {
    if (!resultAssets.has(child)) {
      resultAssets.add(child);
      addChildrenToResult(child, allAssets, resultAssets);
    }
  });
};
  
