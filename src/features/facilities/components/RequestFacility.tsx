import {
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  StyledButton,
  StyledTable,
} from './elements';
import { Popconfirm, Space, TableProps } from 'antd';
import {
  FacilityRequestDTO,
  UpdateFacilityRequestDTO,
} from '@/core/domain/dto/facility.dto';
import { FacilityType, RequestFacilityStatus } from '../types';
import { formatStringDate } from '@/utils/format';
import { CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { TabItemOptions } from '@/constants/data';

type RequestFacilityProps = {
  isPendingUpdate?: boolean;
  isFetching?: boolean;
  facilityRequests?: FacilityRequestDTO[];
  onUpdateRequest: (params: {
    requestId: string;
    data: UpdateFacilityRequestDTO;
  }) => void;
};

const RequestFacility = ({
  isPendingUpdate,
  isFetching,
  facilityRequests,
  onUpdateRequest,
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
      filters: TabItemOptions.map(({ label, key }) => ({
        text: label,
        value: key,
      })),
      onFilter: (value, record) =>
        record.facility.type.startsWith(value as string),
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
      filters: Object.entries(RequestFacilityStatus).map(([key, value]) => ({
        text: key,
        value,
      })),
      onFilter: (value, record) => record.status.startsWith(value as string),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            placement="topLeft"
            title="Approve Request"
            description="Are you sure you want to approve this request?"
            okText="Yes"
            cancelText="No"
            disabled={[
              RequestFacilityStatus.Approved,
              RequestFacilityStatus.Rejected,
              RequestFacilityStatus.Cancelled,
            ].includes(record.status)}
            onConfirm={() =>
              onUpdateRequest({
                requestId: record.id,
                data: { status: RequestFacilityStatus.Approved },
              })
            }
            okButtonProps={{ loading: isPendingUpdate }}
            icon={<CheckCircleOutlined style={{ color: 'green' }} />}>
            <StyledButton
              disabled={[
                RequestFacilityStatus.Approved,
                RequestFacilityStatus.Rejected,
                RequestFacilityStatus.Cancelled,
              ].includes(record.status)}
              type="link">
              Approve
            </StyledButton>
          </Popconfirm>
          <Popconfirm
            placement="topLeft"
            title="Reject Request"
            description="Are you sure you want to reject this request?"
            okText="Yes"
            cancelText="No"
            disabled={[
              RequestFacilityStatus.Approved,
              RequestFacilityStatus.Rejected,
              RequestFacilityStatus.Cancelled,
            ].includes(record.status)}
            onConfirm={() =>
              onUpdateRequest({
                requestId: record.id,
                data: { status: RequestFacilityStatus.Rejected },
              })
            }
            okButtonProps={{ danger: true, loading: isPendingUpdate }}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <StyledButton
              disabled={[
                RequestFacilityStatus.Approved,
                RequestFacilityStatus.Rejected,
                RequestFacilityStatus.Cancelled,
              ].includes(record.status)}
              type="text"
              danger>
              Reject
            </StyledButton>
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
          loading={isFetching || isPendingUpdate}
          columns={tableColumnData}
          dataSource={facilityRequests}
          rowKey="id"
        />
      </FacilitiesListContainer>
    </FacilitiesWrapper>
  );
};

export default RequestFacility;
