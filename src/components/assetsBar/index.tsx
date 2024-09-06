import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanies, fetchLocationsByCompanyId, fetchAssetsByCompanyId } from '../../redux/slices';
import { RootState, AppDispatch } from '../../redux';
import styles from './style.module.scss';
import { IRenderTreeItem } from '../../interfaces';
import { AssetsImageObject } from '../../utils';
import { SearchInput } from '../searchInput';
import AssetTable from '../assetTable';
import Loading from '../loading';
import Error from '../error';
import greenCircleIcon from '../../assets/elipseVerde.png';
import redCircleIcon from '../../assets/elipseVermelha.png';
import lightningIcon from '../../assets/bolt.png'; 

const ITEMS_PER_PAGE = 10;

export const AssetsBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companies, locations, filteredAssets, loading, error, selectedCompanyId } = useSelector(
    (state: RootState) => state.assetData
  );

  const [selectedNode, setSelectedNode] = useState<IRenderTreeItem | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const currCompanyName = companies?.filter((e) => e.id === selectedCompanyId)[0]?.name;

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (companies.length > 0) {
      const companyId = companies[0].id;
      dispatch(fetchLocationsByCompanyId(selectedCompanyId || companyId));
      dispatch(fetchAssetsByCompanyId(selectedCompanyId || companyId));
    }
  }, [companies, dispatch, selectedCompanyId]);

  const toggleNode = (nodeId: string, nodeData: IRenderTreeItem) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
    setSelectedNode(nodeData);
  };

  const getPaginatedItems = useCallback(
    (items: IRenderTreeItem[]) => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return items.slice(startIndex, endIndex);
    },
    [currentPage]
  );

  const rootLocations = useMemo(
    () => locations?.filter((location) => !location.parentId),
    [locations]
  );

  const rootAssets = useMemo(
    () => filteredAssets?.filter((asset) => !asset.parentId && !asset.locationId),
    [filteredAssets]
  );

  const renderAssetTree = useCallback(
    (locationId: string | null, parentAssetId?: string | null) => {
      const assetItems = filteredAssets?.filter((asset) => {
        if (!asset.parentId && !asset.locationId) return false;
        return asset.locationId === locationId || asset.parentId === parentAssetId;
      });

      return assetItems?.map((asset) => {
        const isExpanded = expandedNodes[asset.id];
        const hasChildren = filteredAssets?.some((child) => child.parentId === asset.id);

        let statusIcon;
        if (asset.sensorType === 'energy') {
          statusIcon = lightningIcon;
        } else {
          statusIcon = asset.status === 'operating' ? greenCircleIcon : redCircleIcon;
        }

        return (
          <li key={asset.id} className={styles.treeItem}>
            <div className={styles.treeLabel} onClick={() => toggleNode(asset.id, asset)}>
              <span className={styles.icon}>
                {asset.sensorType ? (
                  <img src={AssetsImageObject['component']} alt="Component" />
                ) : (
                  <img src={AssetsImageObject['asset']} alt="Asset" />
                )}
              </span>
              {asset.name}
              <img src={statusIcon} alt={asset.status} className={styles.statusIcon} />
            </div>
  
            {isExpanded && hasChildren && (
              <ul className={styles.treeChildren}>
                {renderAssetTree(null, asset.id)}
              </ul>
            )}
          </li>
        );
      });
    },
    [filteredAssets, expandedNodes, toggleNode]
  );
  
  const renderLocationTree = useCallback(
    (parentLocationId: string | null) => {
      const locationItems = locations?.filter((location) => location.parentId === parentLocationId);
      return locationItems?.map((location) => {
        const isExpanded = expandedNodes[location.id];
        return (
          <li key={location.id} className={styles.treeItem}>
            <div className={styles.treeLabel} onClick={() => toggleNode(location.id, location)}>
              <span className={styles.icon}>
                <img src={AssetsImageObject['location']} alt="Location" />
              </span>
              {location.name}
            </div>
  
            {isExpanded && (
              <ul className={styles.treeChildren}>
                {renderLocationTree(location?.id)}
                {renderAssetTree(location?.id)}
              </ul>
            )}
          </li>
        );
      });
    },
    [locations, expandedNodes, toggleNode, renderAssetTree]
  );

  const totalPages = Math.ceil(rootLocations.length / ITEMS_PER_PAGE);
  const paginatedLocations = useMemo(() => getPaginatedItems(rootLocations), [rootLocations, getPaginatedItems]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className={styles.assetsBar}>
      <div className={styles.tree}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Ativos /</h2>
          <h3 className={styles.title}>{currCompanyName}</h3>
        </div>
        <SearchInput searchedValue="" />
  
        <ul className={styles.tree}>
          {paginatedLocations?.map((location) => (
            <li key={location.id} className={styles.treeItem}>
              <div className={styles.treeLabel} onClick={() => toggleNode(location.id, location)}>
                <span className={styles.icon}>
                  <img src={AssetsImageObject['location']} alt="Location" />
                </span>
                {location.name}
              </div>
  
              {expandedNodes[location.id] && (
                <ul className={styles.treeChildren}>
                  {renderLocationTree(location.id)}
                  {renderAssetTree(location.id)}
                </ul>
              )}
            </li>
          ))}

          {rootAssets?.map((asset) => {
            const isExpanded = expandedNodes[asset.id];
            const hasChildren = filteredAssets?.some((child) => child.parentId === asset.id);
            let statusIcon;
            if (asset.sensorType === 'energy') {
              statusIcon = lightningIcon; 
            } else {
              statusIcon = asset.status === 'operating' ? greenCircleIcon : redCircleIcon;
            }

            return (
              <li key={asset.id} className={styles.treeItem}>
                <div className={styles.treeLabel} onClick={() => toggleNode(asset.id, asset)}>
                  <span className={styles.icon}>
                    {asset.sensorType ? (
                      <img src={AssetsImageObject['component']} alt="Component" />
                    ) : (
                      <img src={AssetsImageObject['asset']} alt="Asset" />
                    )}
                  </span>
                  {asset.name}
                  <img src={statusIcon} alt={asset.status} className={styles.statusIcon} />
                </div>
      
                {isExpanded && hasChildren && (
                  <ul className={styles.treeChildren}>
                    {renderAssetTree(null, asset.id)}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
  
        <div className={styles.pagination}>
          <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
      </div>
      <div className={styles.table}>
        <AssetTable selectedNode={selectedNode} />
      </div>
    </div>
  );
};

export default AssetsBar;
