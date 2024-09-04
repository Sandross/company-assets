import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanies, fetchLocationsByCompanyId, fetchAssetsByCompanyId } from '../../redux/slices';
import { RootState, AppDispatch } from '../../redux';
import styles from './style.module.scss';
import { IRenderTreeItem } from '../../interfaces';
import { AssetsImageObject } from '../../utils';

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
    return items
      ?.filter((item) =>
        type === 'location'
          ? item?.parentId === parentId
          : item?.locationId === parentId || item?.parentId === parentId
      )
      ?.map((item) => (
        <li key={item?.id} className={styles.treeItem}>
          <div className={styles.treeLabel}>
            <span className={styles.icon}>
              <img src={AssetsImageObject[type as keyof typeof AssetsImageObject]} alt={type} />
            </span>
            {item?.name}
          </div>
          <ul className={styles.treeChildren}>
            {type === 'location'
              ? renderTree(locations, 'location', item?.id)
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
