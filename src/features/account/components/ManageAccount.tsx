import { Table } from 'antd';
import {
  CreateAccountButton,
  ManageAccountContainer,
  ManageAccountHeader,
  ManageAccountWrapper,
  StyledSelect,
} from './elements';
import { TableColumnDummyData, TableDummyData } from '@/constants/dummyData';
import { AccessType } from '../types';
import { getEnumKeysByValue } from '@/utils/enums';
import { useNavigate } from 'react-router-dom';

const AccountAccessType = [
  {
    value: AccessType.Student,
    label: getEnumKeysByValue(AccessType, AccessType.Student),
  },
  {
    value: AccessType.Teacher,
    label: getEnumKeysByValue(AccessType, AccessType.Teacher),
  },
  {
    value: AccessType.Admin,
    label: getEnumKeysByValue(AccessType, AccessType.Admin),
  },
];

export const ManageAccount = () => {
  const navigate = useNavigate();

  const handleChangeAccessType = (value: any, _: any) => {
    console.log(value);
  };

  return (
    <ManageAccountWrapper>
      <ManageAccountHeader>
        <h1>Manage Account</h1>
        <CreateAccountButton
          type="primary"
          onClick={() => navigate('/account/create')}>
          Create Account
        </CreateAccountButton>
      </ManageAccountHeader>
      <ManageAccountContainer>
        <StyledSelect
          defaultValue={AccessType.Student}
          onChange={handleChangeAccessType}
          options={AccountAccessType}
        />
        <Table
          columns={TableColumnDummyData}
          dataSource={TableDummyData}
          rowKey="id"
        />
      </ManageAccountContainer>
    </ManageAccountWrapper>
  );
};
