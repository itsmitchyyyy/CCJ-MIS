import {
  ErrorWrapper,
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  StyledButton,
  StyledTable,
} from './elements';
import { Form, Popconfirm, Select, Space, TableProps } from 'antd';
import {
  FacilityRequestDTO,
  UpdateFacilityQuery,
  UpdateFacilityRequestDTO,
} from '@/core/domain/dto/facility.dto';
import {
  EquipmentStatus,
  FacilityStatus,
  FacilityType,
  RequestFacilityStatus,
} from '../types';
import { formatDate } from '@/utils/format';
import { CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { EquipmentStatusOptions, TabItemOptions } from '@/constants/data';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { equipmentValidationSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';

type RequestFacilityProps = {
  isPendingUpdate?: boolean;
  isFetching?: boolean;
  facilityRequests?: FacilityRequestDTO[];
  isPendingUpdateFacility?: boolean;
  isSuccessfulUpdateFacility?: boolean;
  onUpdateRequest: (params: {
    requestId: string;
    data: UpdateFacilityRequestDTO;
  }) => void;
  onUpdateFacility: (params: {
    id: number;
    query: UpdateFacilityQuery;
  }) => void;
};

const RequestFacility = ({
  isPendingUpdate,
  isFetching,
  facilityRequests,
  isPendingUpdateFacility,
  isSuccessfulUpdateFacility,
  onUpdateRequest,
  onUpdateFacility,
}: RequestFacilityProps) => {
  const [selectedRequest, setSelectedRequest] =
    useState<FacilityRequestDTO | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          ? formatDate(record.borrowed_date || '', 'MMM DD, YYYY')
          : formatDate(
              `${record.reservation_date} ${record.reservation_time}` || '',
              'MMM DD, YYYY hh:mm A',
            ),
    },
    {
      title: 'Date Returned',
      key: 'date_returned',
      render: (_, record) =>
        record.returned_date
          ? formatDate(record.returned_date, 'MMM DD, YYYY')
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
          {record.returned_date && (
            <StyledButton
              onClick={() => {
                setSelectedRequest(record);
                setIsModalVisible(true);
              }}
              disabled={!!record.equipmentStatus}
              type="text">
              {record.equipmentStatus
                ? `Returned as ${
                    EquipmentStatusOptions.filter(
                      (option) => option.value === record.equipmentStatus,
                    ).at(0)?.label
                  }`
                : 'Mark as Returned'}
            </StyledButton>
          )}
        </Space>
      ),
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(equipmentValidationSchema),
    defaultValues: {
      equipmentStatus: EquipmentStatus.Perfect,
    },
  });

  const onHandleSubmitEquipmentStatus = (data: {
    equipmentStatus: EquipmentStatus;
  }) => {
    const payload: UpdateFacilityQuery = {
      ...data,
      request_id: selectedRequest?.id,
      status: FacilityStatus.Available,
    };

    onUpdateFacility({
      id: Number(selectedRequest?.facility.id),
      query: payload,
    });
  };

  useEffect(() => {
    if (isSuccessfulUpdateFacility) {
      setSelectedRequest(null);
      setIsModalVisible(false);
      reset();
    }
  }, [isSuccessfulUpdateFacility]);

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

      <Modal
        isLoading={isPendingUpdateFacility}
        open={isModalVisible}
        title="Mark as Returned"
        onCancel={() => {
          setSelectedRequest(null);
          setIsModalVisible(false);
        }}
        onSubmit={handleSubmit(onHandleSubmitEquipmentStatus)}>
        <Form layout="vertical">
          <ErrorMessage
            name="equipmentStatus"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="equipmentStatus"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Equipment Status">
                <Select
                  size="large"
                  value={value}
                  onChange={onChange}
                  options={EquipmentStatusOptions}
                  status={errors.equipmentStatus && 'error'}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </FacilitiesWrapper>
  );
};

export default RequestFacility;
