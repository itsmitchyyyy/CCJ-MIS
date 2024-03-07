import { Table } from 'antd';
import {
  CreateAccountButton,
  ManageAccountHeader,
  ManageAccountWrapper,
} from './elements';
import { TableColumnDummyData, TableDummyData } from '@/constants/dummyData';

export const ManageAccount = () => {
  return (
    <ManageAccountWrapper>
      <ManageAccountHeader>
        <h1>Manage Account</h1>
        <CreateAccountButton type="primary">Create Account</CreateAccountButton>
      </ManageAccountHeader>
      <div>
        <Table columns={TableColumnDummyData} dataSource={TableDummyData} />
      </div>
    </ManageAccountWrapper>
  );
};
