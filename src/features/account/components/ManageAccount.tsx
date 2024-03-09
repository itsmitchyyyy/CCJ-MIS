import { Space, TableProps } from 'antd';
import {
  AccessTypeWrapper,
  CreateAccountButton,
  ManageAccountContainer,
  ManageAccountHeader,
  ManageAccountWrapper,
  StyledSelect,
  StyledTable,
} from './elements';
import { AccessType, AccountDetails } from '../types';
import { getEnumKeysByValue } from '@/utils/enums';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AccountAccessType = [
  {
    value: 'all',
    label: 'All',
  },
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

type Props = {
  isLoading?: boolean;
  data: AccountDetails[];
};

export const ManageAccount = ({ isLoading, data }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChangeAccessType = (value: any, _: any) => {
    if (value === 'all' && searchParams.has('access_type')) {
      searchParams.delete('access_type');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ access_type: value });
    }
  };

  const TableColumnData: TableProps<AccountDetails>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Role',
      dataIndex: 'access_type',
      key: 'access_type',
      render: (_, record) => (
        <AccessTypeWrapper>{record.access_type}</AccessTypeWrapper>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

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
          defaultValue="all"
          onChange={handleChangeAccessType}
          options={AccountAccessType}
        />
        <StyledTable
          columns={TableColumnData}
          dataSource={data}
          rowKey="id"
          loading={isLoading}
        />
      </ManageAccountContainer>
    </ManageAccountWrapper>
  );
};
