import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanies, fetchLocationsByCompanyId, fetchAssetsByCompanyId } from '../../redux/slices';
import { RootState, AppDispatch } from '../../redux';
import styles from './style.module.scss';
import asset from '../../assets/asset.png';
import component from '../../assets/component.png';
import location from '../../assets/location.png';
import { IRenderTreeItem } from '../../interfaces';

export const AssetsBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companies, locations, assets, loading, error } = useSelector((state: RootState) => state.assetData);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (companies.length > 0) {
      const companyId = companies[0].id;
      dispatch(fetchLocationsByCompanyId(companyId));
      dispatch(fetchAssetsByCompanyId(companyId));
    }
  }, [companies, dispatch]);

  const renderTree = ( items: Partial<IRenderTreeItem[]>, type: string, parentId?: string | null) => {
    //primeiro loop vai pegar os items com null nos determinados campos
    return items
      ?.filter((item) =>
        type === 'location'
          ? item?.parentId === parentId // Se o item for uma location e tiver um parentId, ele é uma sublocation
          : item?.locationId === parentId || item?.parentId === parentId // Se o item for um asset e tiver um locationId ou parentId, ele tem uma outra location ou asset como parente
      )
      ?.map((item) => (
        <li key={item?.id} className={styles.treeItem}>
          <div className={styles.treeLabel}>
            <span className={styles.icon}>
              {type === 'location' ? (
                <img src={location} alt="Location" />
                //Se tiver um sensorType, ele é um componente
              ) : item?.sensorType ? (
                <img src={component} alt="Component" />
              ) : (
                <img src={asset} alt="Asset" />
              )}
            </span>
            {item?.name}
          </div>
          <ul className={styles.treeChildren}>
            {type === 'location'
              //Se o item for uma location, recursão para renderizar as sublocations
              ? renderTree(locations, 'location', item?.id)
              //Se o item for um asset, recursão para renderiza os subassets
              : renderTree(assets, 'asset', item?.id)}
          </ul>
        </li>
      ));
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{String(error)}</div>;

  return (
    <div className={styles.assetsBar}>
      <h2 className={styles.title}>Assets</h2>
      <ul className={styles.tree}>
        {renderTree(locations, 'location', null)}
        {renderTree(assets, 'asset', null )}
      </ul>
    </div>
  );
};

export default AssetsBar;
