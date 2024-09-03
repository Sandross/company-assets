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
    id: string;
    name: string;
    parentId: string | null;
    locationId: string | null;
    sensorType?: string;
  }
  
export interface AssetsState {
    companies: Company[];
    locations: Location[];
    assets: Asset[];
    loading: boolean;
    error: string | null;
  }
  
export interface IRenderTreeItem{
    id: string;
    name: string;
    parentId?: string | null;
    locationId?: string | null;
    sensorType?: string | null;
  }
