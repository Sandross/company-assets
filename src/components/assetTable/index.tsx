import React, { useEffect } from 'react';
import { IAssetTableProps } from '../../interfaces';

const AssetTable:React.FC<IAssetTableProps> = ({selectedNode}) => {
    
  useEffect(() => {
    console.log(selectedNode);
  }, [selectedNode]);

  return (
    <div>
      <h1>Asset Table</h1>
      <h2>Nome: {selectedNode?.name}</h2>
      <h3>ID: {selectedNode?.id}</h3>
    </div>
  );
};

export default AssetTable;
