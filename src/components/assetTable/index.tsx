import React, { useEffect } from 'react';
import { IAssetTableProps } from '../../interfaces';
import styles from './style.module.scss';
import bolt from '../../assets/bolt.png';
const AssetTable: React.FC<IAssetTableProps> = ({ selectedNode }) => {
  useEffect(() => {
    console.log(selectedNode);
  }, [selectedNode]);

  return (
    <div className={styles.assetContainer}>
      <h1>{selectedNode?.name}</h1>
      <div className={styles.detailRow}>
        <div className="label">ID:</div>
        <div className="value">{selectedNode?.id}</div>
      </div>
      <div className={styles.detailRow}>
        <div className="label">Status:</div>
        <div className="value">
          {selectedNode?.status === 'operating' ? 'Operational' : 'Critical'}
          {selectedNode?.sensorType === 'energy' && (
            <img src={bolt} alt="Energy Sensor" className={styles.statusIcon} />
          )}
        </div>
      </div>
      <div className={styles.detailRow}>
        <div className="label">Tipo de Equipamento:</div>
        <div className="value">{selectedNode?.type || 'N/A'}</div>
      </div>
    </div>
  );
};

export default AssetTable;
