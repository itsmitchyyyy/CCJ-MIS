import {
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  StyledTable,
} from './elements';
import { Button, Popconfirm, Space, TableProps } from 'antd';
import { FacilityRequestDTO } from '@/core/domain/dto/facility.dto';
import { FacilityType } from '../types';
import { formatStringDate } from '@/utils/format';
import { CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

type RequestFacilityProps = {
  isFetching?: boolean;
  facilityRequests?: FacilityRequestDTO[];
};

const RequestFacility = ({
  isFetching,
  facilityRequests,
}: RequestFacilityProps) => {
  const tableColumnData: TableProps<FacilityRequestDTO>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      key: 'facility_type',
      render: (_, record) => record.facility.type.toLocaleUpperCase(),
    },
    {
      title: 'Room/Equipment Name',
      key: 'facility_name',
      render: (_, record) => record.facility.name,
    },
    {
      title: 'Requestor',
      key: 'user_id',
      render: (_, record) =>
        `${record.user.first_name} ${record.user.last_name}`,
    },
    {
      title: 'Date Reserve/Borrowed',
      key: 'date_requested',
      render: (_, record) =>
        record.facility.type === FacilityType.Equipment
          ? formatStringDate(record.borrowed_date || '', 'MMM DD, YYYY')
          : formatStringDate(record.reservation_date || '', 'MMM DD, YYYY'),
    },
    {
      title: 'Date Returned',
      key: 'date_returned',
      render: (_, record) =>
        record.returned_date
          ? formatStringDate(record.returned_date, 'MMM DD, YYYY')
          : record.facility.type === FacilityType.Equipment
          ? 'TBD'
          : 'N/A',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => record.status.toLocaleUpperCase(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            placement="topLeft"
            title="Approve Request"
            description="Are you sure you want to approve this request?"
            okText="Yes"
            cancelText="No"
            icon={<CheckCircleOutlined style={{ color: 'green' }} />}>
            <Button type="link">Approve</Button>
          </Popconfirm>
          <Popconfirm
            placement="topLeft"
            title="Reject Request"
            description="Are you sure you want to reject this request?"
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <Button type="text" danger>
              Reject
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <FacilitiesWrapper>
      <FacilitiesHeader>
        <h1>Facility Requests</h1>
      </FacilitiesHeader>

      <FacilitiesListContainer>
        <StyledTable
          loading={isFetching}
          columns={tableColumnData}
          dataSource={facilityRequests}
          rowKey="id"
        />
      </FacilitiesListContainer>
    </FacilitiesWrapper>
  );
};

export default RequestFacility;
