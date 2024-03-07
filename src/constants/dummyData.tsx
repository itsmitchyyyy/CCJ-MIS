import { Space, TableProps } from 'antd';

export const TableDummyData: Account[] = [
  {
    id: '1',
    name: 'John Brown',
  },
  {
    id: '2',
    name: 'John Green',
  },
  {
    id: '3',
    name: 'John Black',
  },
];

export const TableColumnDummyData: TableProps<Account>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
