import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import tractianLogo from '../../assets/logo.png';
import { RootState } from '../../redux';
import { setSelectedCompanyId } from '../../redux/reducers/assets'; 

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { companies, selectedCompanyId } = useSelector((state: RootState) => state.assetData);

  useEffect(() => {
    dispatch(setSelectedCompanyId(companies[0]?.id));
  }, [companies]);

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCompanyId(event.target.value));
  };

  return (
    <div className={styles.container}>
      <img src={tractianLogo} alt="logo" className={styles['container-logo']} />

      <div className={styles['select-container']}>
        <label htmlFor="companies" className={styles['select-label']}>
          Empresa:
        </label>
        <select
          id="companies"
          className={styles['select-companies']}
          value={selectedCompanyId || ''}
          onChange={handleCompanyChange}
        >
          <option value="" disabled>
            Selecione uma empresa
          </option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
