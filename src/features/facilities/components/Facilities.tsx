import {
  AddFacilityButton,
  ErrorWrapper,
  FacilitiesDateContainer,
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  StyledButton,
  StyledDatePicker,
  StyledInputNumber,
  StyledTable,
  StyledTextArea,
  StyledTimePicker,
} from './elements';
import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  Popconfirm,
  Select,
  Space,
  TableProps,
  Tabs,
  Upload,
  message,
} from 'antd';
import {
  BorrowRequestFacility,
  FacilityStatus,
  FacilityType,
  RequestFacility,
  RequestFacilityStatus,
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
import {
  FacilityDTO,
  FacilityRequestDTO,
  StoreFacilityDTO,
  UpdateFacilityRequestDTO,
} from '@/core/domain/dto/facility.dto';
import { useSearchParams } from 'react-router-dom';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { capitalizeString } from '@/utils/string';
import { formatStringDate } from '@/utils/format';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/es/upload';
import { BACKEND_URL } from '@/config';

type FacilityProps = {
  onCreateFacility: (data: StoreFacilityDTO) => void;
  onDeleteFacility: (id: number) => void;
  onRequestFacility: (data: RequestFacility | BorrowRequestFacility) => void;
  onUpdateRequest: (params: {
    requestId: string;
    data: UpdateFacilityRequestDTO;
  }) => void;
  facilities: FacilityDTO[] | FacilityRequestDTO[];
  isSubmitting?: boolean;
  isCreateFacilitySuccess?: boolean;
  isFetching?: boolean;
  isDeleting?: boolean;
  isRequesting?: boolean;
  isRequestSuccess?: boolean;
  isPendingUpdate?: boolean;
};

const Facilities = ({
  onCreateFacility,
  onDeleteFacility,
  onRequestFacility,
  onUpdateRequest,
  facilities,
  isSubmitting,
  isCreateFacilitySuccess,
  isFetching,
  isDeleting,
  isRequesting,
  isRequestSuccess,
  isPendingUpdate,
}: FacilityProps) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();

  const [messageApi, contextHolder] = message.useMessage();
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
  const [borrowDate, setBorrowDate] = useState(new Date());
  const [reservationTime, setReservationTime] = useState(new Date());

  const [requestForm, setRequestForm] = useState<UploadFile[]>([]);

  const filterFacilityType =
    (searchParams.get('type') as FacilityType) || FacilityType.Regular;

  const tableColumnData: TableProps<
    FacilityDTO | FacilityRequestDTO
  >['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Form Attachment',
      key: 'form_attachment',
      render: (_, record) => {
        const data = record as FacilityRequestDTO;
        return <Image width={50} src={`${BACKEND_URL}/${data.attachment}`} />;
      },
      hidden: filterFacilityType !== FacilityType.MyRequest,
    },
    {
      title: 'Type',
      key: 'type',
      render: (_, record) =>
        capitalizeString((record as FacilityRequestDTO).facility.type),
      hidden: filterFacilityType !== FacilityType.MyRequest,
    },
    {
      title: 'Request Reason',
      key: 'reason',
      render: (_, record) => {
        const requestRecord = record as FacilityRequestDTO;

        return <span>{requestRecord.reason}</span>;
      },
      hidden: filterFacilityType !== FacilityType.MyRequest,
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, data) => {
        const record = data as FacilityDTO;
        const requestRecord = data as FacilityRequestDTO;

        return (
          <>
            {filterFacilityType === FacilityType.MyRequest ? (
              <span>{requestRecord.facility.name}</span>
            ) : (
              <span>{record.name}</span>
            )}
          </>
        );
      },
    },
    {
      title: 'Description',
      render: (_, data) => {
        const record = data as FacilityDTO;
        const requestRecord = data as FacilityRequestDTO;

        return (
          <>
            {filterFacilityType === FacilityType.MyRequest ? (
              <span>{requestRecord.facility.description}</span>
            ) : (
              <span>{record.description}</span>
            )}
          </>
        );
      },
      key: 'description',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (_, record) => {
        const requestRecord = record as FacilityRequestDTO;

        return filterFacilityType === FacilityType.Equipment
          ? requestRecord.quantity
          : 'N/A';
      },
      hidden: filterFacilityType !== FacilityType.MyRequest,
    },
    {
      title: 'Room Number',
      key: 'room_number',
      render: (_, data) => {
        const record = data as FacilityDTO;
        const requestRecord = data as FacilityRequestDTO;

        return (
          <>
            {filterFacilityType === FacilityType.MyRequest ? (
              <span>{requestRecord.facility.room_number}</span>
            ) : (
              <span>{record.room_number}</span>
            )}
          </>
        );
      },
      hidden: filterFacilityType === FacilityType.Equipment,
    },
    {
      title: 'Date Due',
      key: 'date_due',
      render: (_, record) => {
        const requestRecord = record as FacilityRequestDTO;

        return filterFacilityType === FacilityType.Equipment
          ? formatStringDate(
              requestRecord.borrow_end_date || '',
              'MMM DD, YYYY',
            )
          : formatStringDate(
              `${requestRecord.reservation_date} ${requestRecord.reservation_end_time}` ||
                '',
              'MMM DD, YYYY hh:mm A',
            );
      },
      hidden: filterFacilityType !== FacilityType.MyRequest,
    },
    {
      title: 'Status',

      key: 'status',
      render: (_, record) => capitalizeString(record.status),
    },
    {
      title: 'Rejection Reason',
      key: 'rejected_reason',
      render: (_, data) => {
        const record = data as FacilityRequestDTO;

        return (
          <>{record.rejected_reason && <span>{record.rejected_reason}</span>}</>
        );
      },
      hidden: filterFacilityType !== FacilityType.MyRequest,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, data) => {
        const record = data as FacilityDTO;
        const requestRecord = data as FacilityRequestDTO;

        return (
          <Space size="middle">
            <>
              {filterFacilityType === FacilityType.MyRequest ? (
                <>
                  {requestRecord.status === RequestFacilityStatus.Approved && (
                    <Popconfirm
                      disabled={!!requestRecord.returned_date}
                      placement="topRight"
                      title={
                        requestRecord.facility.type === FacilityType.Equipment
                          ? 'Return equipment'
                          : 'Cancel Reservation'
                      }
                      description={`Are you sure you want ${
                        requestRecord.facility.type === FacilityType.Equipment
                          ? 'return'
                          : 'cancel'
                      } this ${
                        requestRecord.facility.type === FacilityType.Equipment
                          ? 'equipment'
                          : 'reservation'
                      }?`}
                      onConfirm={() =>
                        onUpdateRequest({
                          requestId: requestRecord.id,
                          data: {
                            status:
                              requestRecord.facility.type ===
                              FacilityType.Equipment
                                ? RequestFacilityStatus.Approved
                                : RequestFacilityStatus.Cancelled,
                            returned_date:
                              requestRecord.facility.type ===
                              FacilityType.Equipment
                                ? new Date()
                                : undefined,
                          },
                        })
                      }
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{ loading: isPendingUpdate }}
                      cancelButtonProps={{ loading: isPendingUpdate }}>
                      <StyledButton
                        type="link"
                        disabled={!!requestRecord.returned_date}>
                        {requestRecord.facility.type === FacilityType.Equipment
                          ? 'Return equipment'
                          : 'Cancel Reservation'}
                      </StyledButton>
                    </Popconfirm>
                  )}
                </>
              ) : (
                <>
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
                        <StyledButton
                          disabled={[
                            FacilityStatus.Booked,
                            FacilityStatus.Unavailable,
                          ].includes(
                            record.status.toLocaleLowerCase() as FacilityStatus,
                          )}
                          type="link"
                          onClick={() => {
                            setOpenBorrowEquipment(true);
                            setSelectedFacility(record);
                          }}>
                          Borrow Equipment{' '}
                        </StyledButton>
                      ) : (
                        <StyledButton
                          disabled={
                            record.status.toLocaleLowerCase() ===
                            FacilityStatus.Booked
                          }
                          type="link"
                          onClick={() => {
                            setOpenBookARoom(true);
                            setSelectedFacility(record);
                          }}>
                          Reserve Room
                        </StyledButton>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          </Space>
        );
      },
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
    watch: watchBookARoom,
  } = useForm({
    resolver: yupResolver(bookingValidationSchema),
    defaultValues: {
      reservation_date: new Date(),
      reservation_time: dayjs().hour(24).minute(0).toDate(),
      reservation_end_time: dayjs().hour(24).minute(0).toDate(),
      reason: '',
    },
  });

  const {
    handleSubmit: handleSubmitBorrowEqupment,
    reset: resetBorrowEquipment,
    control: controlBorrowEquipment,
    formState: { errors: errorsBorrowEquipment },
    watch: watchEquipment,
  } = useForm({
    resolver: yupResolver(borrowValidationSchema),
    defaultValues: {
      borrowed_date: new Date(),
      reason: '',
      borrow_end_date: new Date(),
      quantity: 1,
    },
  });

  const tabItems: Tab[] = TabItemOptions.map((item) => ({
    label: item.label,
    key: item.key,
    children: (
      <>
        {item.key === FacilityType.Equipment ? (
          <>
            <Alert
              showIcon
              message="Borrowing Disclaimer"
              type="info"
              closable
              description={
                <div
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                    marginBottom: '1em',
                  }}>
                  <span>
                    By borrowing items, you agree to the following terms:
                  </span>
                  <ol>
                    <li>
                      <b>Responsibility: </b>
                      <span>
                        You are responsible for any damage, loss, or theft of
                        borrowed items.
                      </span>
                    </li>
                    <li>
                      <b>Care: </b>
                      <span>
                        Handle items with care and report any pre-existing
                        damage immediately.
                      </span>
                    </li>
                    <li>
                      <b>Return: </b>
                      <span>
                        Return items by the due date. Late returns may incur
                        fees.
                      </span>
                    </li>
                    <li>
                      <b>Damages: </b>
                      <span>
                        You will pay for repairs or replacement if items are
                        damaged or lost.
                      </span>
                    </li>
                    <li>
                      <b>Usage: </b>
                      <span>
                        Borrowed items are for personal use only and must not be
                        transferred to others.
                      </span>
                    </li>
                    <li>
                      <b>Indemnity: </b>
                      <span>
                        You agree to indemnify the school against any claims
                        arising from misuse.
                      </span>
                    </li>
                  </ol>

                  <span>By borrowing, you agree to these terms.</span>
                </div>
              }
            />

            <StyledTable
              loading={isFetching}
              columns={tableColumnData}
              dataSource={facilities}
              rowKey="id"
            />
          </>
        ) : (
          <StyledTable
            loading={isFetching}
            columns={tableColumnData}
            dataSource={facilities}
            rowKey="id"
          />
        )}
      </>
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
    reservation_time: Date;
    reservation_end_time: Date;
    reason?: string;
  }) => {
    if (requestForm.length === 0) {
      messageApi.error('Please select a file to upload');
      return;
    }

    const payload: RequestFacility = {
      ...data,
      facility_id: selectedFacility?.id as string,
      user_id: id,
      attachment: requestForm[0],
    };

    onRequestFacility(payload);
  };

  const onHandleSubmitBorrowEquipment = (data: {
    borrowed_date: Date;
    reason?: string;
    borrow_end_date: Date;
    quantity: number;
  }) => {
    if (requestForm.length === 0) {
      messageApi.error('Please select a file to upload');
      return;
    }

    const payload: BorrowRequestFacility = {
      ...data,
      facility_id: selectedFacility?.id as string,
      user_id: id,
      attachment: requestForm[0],
    };

    onRequestFacility(payload);
  };

  const handleBeforeUploadFile = (_: RcFile, fileList: RcFile[]) => {
    let isAllFilesValid = true;
    if (fileList.length > 0) {
      isAllFilesValid = fileList.every((file) => {
        const extension = file.name.split('.').pop() as string;

        return ['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase());
      });
    }

    if (isAllFilesValid) {
      setRequestForm([...requestForm, ...fileList]);
    } else {
      messageApi.error('Invalid file type');
    }

    return false;
  };

  const handleOnRemoveFile = (file: UploadFile) => {
    const index = requestForm.indexOf(file);
    const newRequestForm = requestForm.slice();
    newRequestForm.splice(index, 1);
    setRequestForm(newRequestForm);
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
      resetBorrowEquipment();
      setRequestForm([]);
    }
  }, [isRequestSuccess]);

  useEffect(() => {
    const subscription = watchEquipment(({ borrowed_date }) => {
      setBorrowDate(borrowed_date || new Date());
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = watchBookARoom(({ reservation_time }) => {
      setReservationTime(reservation_time || new Date());
    });

    return () => subscription.unsubscribe();
  });

  return (
    <FacilitiesWrapper>
      {contextHolder}
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
          items={
            accessType === AccessType.Teacher
              ? [
                  ...tabItems,
                  {
                    label: 'My Request',
                    key: 'my-request',
                    children: (
                      <StyledTable
                        loading={isFetching}
                        columns={tableColumnData}
                        dataSource={facilities}
                        rowKey="id"
                      />
                    ),
                  },
                ]
              : tabItems
          }
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
          setRequestForm([]);
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
            name="reservation_time"
            errors={errorsBookARoom}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlBookARoom}
            name="reservation_time"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Start Time">
                <FacilitiesDateContainer>
                  <StyledTimePicker
                    status={errorsBookARoom.reservation_time && 'error'}
                    size="large"
                    value={dayjs(new Date(value))}
                    use12Hours
                    format="h:mm a"
                    onChange={onChange}
                    needConfirm={false}
                    minuteStep={30}
                  />
                </FacilitiesDateContainer>
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="reservation_end_time"
            errors={errorsBookARoom}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlBookARoom}
            name="reservation_end_time"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="End Time">
                <FacilitiesDateContainer>
                  <StyledTimePicker
                    status={errorsBookARoom.reservation_end_time && 'error'}
                    size="large"
                    value={dayjs(new Date(value))}
                    use12Hours
                    format="h:mm a"
                    onChange={onChange}
                    needConfirm={false}
                    minuteStep={30}
                    disabledTime={() => ({
                      disabledHours: () => {
                        const beforeHours = [];
                        const afterHours = [];
                        const getSelectedTime = dayjs(reservationTime).hour();

                        for (let i = 0; i <= getSelectedTime; i++) {
                          beforeHours.push(i);
                        }

                        for (let i = getSelectedTime + 11; i < 24; i++) {
                          afterHours.push(i);
                        }

                        return [...beforeHours, ...afterHours];
                      },
                    })}
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

          <Form.Item label="Form">
            <Upload
              accept="image/*"
              fileList={requestForm}
              beforeUpload={handleBeforeUploadFile}
              onRemove={handleOnRemoveFile}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Borrow equipment"
        isLoading={isRequesting}
        open={openBorrowEquipment}
        onCancel={() => {
          setRequestForm([]);
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
              <Form.Item label="Start Date">
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
            name="borrow_end_date"
            errors={errorsBorrowEquipment}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlBorrowEquipment}
            name="borrow_end_date"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Borrow End Date">
                <StyledDatePicker
                  value={dayjs(value)}
                  onChange={onChange}
                  size="large"
                  minDate={dayjs(borrowDate)}
                  maxDate={dayjs(borrowDate).add(2, 'day')}
                />
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="quantity"
            errors={errorsBorrowEquipment}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlBorrowEquipment}
            name="quantity"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Item Quantity">
                <StyledInputNumber
                  value={value}
                  onChange={(value) => onChange(value)}
                  min={1}
                />
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

          <Form.Item label="Form">
            <Upload
              accept="image/*"
              fileList={requestForm}
              beforeUpload={handleBeforeUploadFile}
              onRemove={handleOnRemoveFile}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </FacilitiesWrapper>
  );
};

export default Facilities;
