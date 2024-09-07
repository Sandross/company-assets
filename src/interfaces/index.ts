export interface Company {
    id: string;
    name: string;
  }
  
export interface Location {
    id: string;
    name: string;
    parentId: string | null;
  }
  
export interface Asset {
    gateWayId: string;
    id: string;
    name: string;
    parentId: string | null;
    sensorId: string;
    locationId: string | null;
    sensorType?: string;
    status?: string;
  }
  
export interface AssetsState {
    companies: Company[];
    locations: Location[];
    assets: Asset[];
    loading: boolean;
    error: string | null;
    filteredAssets: Asset[];
    filteredLocations: Location[];
    searchQuery: string;
    filterByEnergySensors: boolean;
    filterByCriticalStatus: boolean;
    selectedCompanyId: string | null;
  }
  
export interface IRenderTreeItem{
    id: string;
    name: string;
    parentId?: string | null;
    locationId?: string | null;
    sensorType?: string | null;
    node?: IRenderTreeItem[];
    status?: string;
    type?: string;
  }

export interface IAssetImageObject{
    asset: string;
    component: string;
    location: string;
}

export interface ISearchInputProps {
    searchedValue: string;
}

export interface IAssetTableProps {
    selectedNode: Partial<IRenderTreeItem> | null
}

export interface IErrorProps {
    message: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}
