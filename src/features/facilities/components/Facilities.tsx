import {
  AddFacilityButton,
  ErrorWrapper,
  FacilitiesDateContainer,
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  StyledDatePicker,
  StyledTable,
  StyledTextArea,
} from './elements';
import { Form, Input, Popconfirm, Select, Space, TableProps, Tabs } from 'antd';
import {
  BorrowRequestFacility,
  FacilityType,
  RequestFacility,
  Tab,
} from '../types';
import { TabItemOptions } from '@/constants/data';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import {
  bookingValidationSchema,
  borrowValidationSchema,
  validationSchema,
} from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { FacilityDTO, StoreFacilityDTO } from '@/core/domain/dto/facility.dto';
import { useSearchParams } from 'react-router-dom';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

type FacilityProps = {
  onCreateFacility: (data: StoreFacilityDTO) => void;
  onDeleteFacility: (id: number) => void;
  onRequestFacility: (data: RequestFacility | BorrowRequestFacility) => void;
  facilities: FacilityDTO[];
  isSubmitting?: boolean;
  isCreateFacilitySuccess?: boolean;
  isFetching?: boolean;
  isDeleting?: boolean;
  isRequesting?: boolean;
  isRequestSuccess?: boolean;
};

const Facilities = ({
  onCreateFacility,
  onDeleteFacility,
  onRequestFacility,
  facilities,
  isSubmitting,
  isCreateFacilitySuccess,
  isFetching,
  isDeleting,
  isRequesting,
  isRequestSuccess,
}: FacilityProps) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();

  const [searchParams, setSearchParams] = useSearchParams();

  const [openFacility, setOpenFacility] = useState<boolean>(false);
  const [openBookARoom, setOpenBookARoom] = useState<boolean>(false);
  const [openBorrowEquipment, setOpenBorrowEquipment] =
    useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<FacilityDTO | null>(
    null,
  );
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
          {accessType === AccessType.Admin && (
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
          )}
          {accessType === AccessType.Teacher && (
            <>
              {record.type === FacilityType.Equipment ? (
                <a
                  onClick={() => {
                    setOpenBorrowEquipment(true);
                    setSelectedFacility(record);
                  }}>
                  Borrow Equipment
                </a>
              ) : (
                <a
                  onClick={() => {
                    setOpenBookARoom(true);
                    setSelectedFacility(record);
                  }}>
                  Reserve Room
                </a>
              )}
            </>
          )}
        </Space>
      ),
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

  const {
    handleSubmit: handleSubmitBookARoom,
    reset: resetBookARoom,
    control: controlBookARoom,
    formState: { errors: errorsBookARoom },
  } = useForm({
    resolver: yupResolver(bookingValidationSchema),
    defaultValues: {
      reservation_date: new Date(),
      reason: '',
    },
  });

  const {
    handleSubmit: handleSubmitBorrowEqupment,
    reset: resetBorrowEquipment,
    control: controlBorrowEquipment,
    formState: { errors: errorsBorrowEquipment },
  } = useForm({
    resolver: yupResolver(borrowValidationSchema),
    defaultValues: {
      borrowed_date: new Date(),
      reason: '',
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

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const onTabChange = (key: string) => {
    setSearchParams({ type: key });
  };

  const onHandleSubmitBookARoom = (data: {
    reservation_date: Date;
    reason?: string;
  }) => {
    const payload: RequestFacility = {
      ...data,
      facility_id: selectedFacility?.id as string,
      user_id: id,
    };

    onRequestFacility(payload);
  };

  const onHandleSubmitBorrowEquipment = (data: {
    borrowed_date: Date;
    reason?: string;
  }) => {
    const payload: BorrowRequestFacility = {
      ...data,
      facility_id: selectedFacility?.id as string,
      user_id: id,
    };

    onRequestFacility(payload);
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

  useEffect(() => {
    if (isRequestSuccess) {
      setOpenBookARoom(false);
      setOpenBorrowEquipment(false);
      resetBookARoom();
    }
  }, [isRequestSuccess]);

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

      <Modal
        title="Book a room"
        isLoading={isRequesting}
        open={openBookARoom}
        onCancel={() => {
          setOpenBookARoom(false);
          setSelectedFacility(null);
        }}
        onSubmit={handleSubmitBookARoom(onHandleSubmitBookARoom)}>
        <Form layout="vertical">
          <ErrorMessage
            name="reservation_date"
            errors={errorsBookARoom}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlBookARoom}
            name="reservation_date"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Reservation Date">
                <FacilitiesDateContainer>
                  <StyledDatePicker
                    value={dayjs(value)}
                    onChange={onChange}
                    size="large"
                    disabledDate={disabledDate}
                  />
                </FacilitiesDateContainer>
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="reason"
            errors={errorsBookARoom}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlBookARoom}
            name="reason"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Reason">
                <StyledTextArea
                  value={value}
                  onChange={onChange}
                  rows={5}
                  cols={10}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>

      <Modal
        title="Borrow equipment"
        isLoading={isRequesting}
        open={openBorrowEquipment}
        onCancel={() => {
          setOpenBorrowEquipment(false);
          setSelectedFacility(null);
        }}
        onSubmit={handleSubmitBorrowEqupment(onHandleSubmitBorrowEquipment)}>
        <Form layout="vertical">
          <ErrorMessage
            name="borrowed_date"
            errors={errorsBorrowEquipment}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlBorrowEquipment}
            name="borrowed_date"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Borrow Date">
                <FacilitiesDateContainer>
                  <StyledDatePicker
                    value={dayjs(value)}
                    onChange={onChange}
                    size="large"
                    disabledDate={disabledDate}
                  />
                </FacilitiesDateContainer>
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="reason"
            errors={errorsBorrowEquipment}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlBorrowEquipment}
            name="reason"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Reason">
                <StyledTextArea
                  value={value}
                  onChange={onChange}
                  rows={5}
                  cols={10}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </FacilitiesWrapper>
  );
};

export default Facilities;
