import {
  AddFacilityButton,
  ErrorWrapper,
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  StyledTable,
  StyledTextArea,
} from './elements';
import { Form, Input, Popconfirm, Select, Space, TableProps, Tabs } from 'antd';
import { FacilityType, Tab } from '../types';
import { TabItemOptions } from '@/constants/data';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { validationSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { FacilityDTO, StoreFacilityDTO } from '@/core/domain/dto/facility.dto';
import { useSearchParams } from 'react-router-dom';

type FacilityProps = {
  onCreateFacility: (data: StoreFacilityDTO) => void;
  onDeleteFacility: (id: number) => void;
  facilities: FacilityDTO[];
  isSubmitting?: boolean;
  isCreateFacilitySuccess?: boolean;
  isFetching?: boolean;
  isDeleting?: boolean;
};

const Facilities = ({
  onCreateFacility,
  onDeleteFacility,
  facilities,
  isSubmitting,
  isCreateFacilitySuccess,
  isFetching,
  isDeleting,
}: FacilityProps) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  const [searchParams, setSearchParams] = useSearchParams();

  const [openFacility, setOpenFacility] = useState<boolean>(false);
  const [type, setType] = useState<FacilityType>(
    TabItemOptions[0].key as FacilityType,
  );

  const filterFacilityType =
    (searchParams.get('type') as FacilityType) || FacilityType.Regular;

  const tableColumnData: TableProps<FacilityDTO>['columns'] = [
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
      title: 'Room Number',
      dataIndex: 'room_number',
      key: 'room_number',
      hidden: filterFacilityType === FacilityType.Equipment,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            placement="topRight"
            title="Delete the task"
            description="Are you sure you want delete this task?"
            onConfirm={() => onDeleteFacility(Number(record.id))}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ loading: isDeleting }}
            cancelButtonProps={{ loading: isDeleting }}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
      hidden: accessType !== AccessType.Admin,
    },
  ];

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      type: TabItemOptions[0].key as FacilityType,
      name: '',
      description: '',
      room_number: '',
    },
  });

  const tabItems: Tab[] = TabItemOptions.map((item) => ({
    label: item.label,
    key: item.key,
    children: (
      <StyledTable
        loading={isFetching}
        columns={tableColumnData}
        dataSource={facilities}
        rowKey="id"
      />
    ),
  }));

  const onTabChange = (key: string) => {
    setSearchParams({ type: key });
  };

  useEffect(() => {
    const subscription = watch(({ type }) => {
      setType(type as FacilityType);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isCreateFacilitySuccess) {
      setOpenFacility(false);
      reset();
    }
  }, [isCreateFacilitySuccess]);

  return (
    <FacilitiesWrapper>
      <FacilitiesHeader>
        <h1>Facilities</h1>

        {accessType === AccessType.Admin && (
          <AddFacilityButton
            size="large"
            type="primary"
            onClick={() => setOpenFacility(true)}>
            Add Facility or Equipment
          </AddFacilityButton>
        )}
      </FacilitiesHeader>
      <FacilitiesListContainer>
        <Tabs
          activeKey={filterFacilityType}
          onChange={onTabChange}
          tabPosition="left"
          items={tabItems}
        />
      </FacilitiesListContainer>

      <Modal
        title="Add Facility or Equipment"
        open={openFacility}
        onCancel={() => setOpenFacility(false)}
        onSubmit={handleSubmit(onCreateFacility)}
        isLoading={isSubmitting}>
        <Form layout="vertical">
          <ErrorMessage
            name="type"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Type" required>
                <Select
                  size="large"
                  options={TabItemOptions.map((option) => ({
                    label: option.label,
                    value: option.key,
                  }))}
                  value={value}
                  onChange={onChange}
                />
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="name"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Name" required>
                <Input value={value} onChange={onChange} size="large" />
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="description"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Description">
                <StyledTextArea
                  rows={5}
                  cols={10}
                  value={value}
                  onChange={onChange}
                />
              </Form.Item>
            )}
          />

          {type !== FacilityType.Equipment && (
            <>
              <ErrorMessage
                name="room_number"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                control={control}
                name="room_number"
                render={({ field: { value, onChange } }) => (
                  <Form.Item label="Room Number" required>
                    <Input value={value} onChange={onChange} size="large" />
                  </Form.Item>
                )}
              />
            </>
          )}
        </Form>
      </Modal>
    </FacilitiesWrapper>
  );
};

export default Facilities;
