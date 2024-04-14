import { AttendanceOptions } from '@/constants/data';
import {
  AttendanceListContainer,
  AttendanceListHeader,
  AttendanceListWrapper,
  AttendanceSelectContainer,
  AttendanceWrapper,
  FilterWrapper,
  MarkAttendanceButton,
  StyledDatePicker,
  StyledSelect,
  StyledTable,
} from './elements';
import { Attendance, TeacherAttendance } from '../../types';
import { DatePicker, Form, Select, TableProps } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { User } from '@/core/domain/entities/user.entity';
import dayjs from 'dayjs';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { Controller, useForm } from 'react-hook-form';
import {
  AttendanceStatus,
  CreateTeacherAttendanceRequestDTO,
} from '@/core/domain/dto/attendance.dto';
import { useEffect, useState } from 'react';
import { RangePickerProps } from 'antd/es/date-picker';
import { Modal } from '@/components/Elements/Modal';

const _AttendanceOptions = [
  {
    value: 'all',
    label: 'All',
  },
  ...AttendanceOptions,
];

type Props = {
  data: Attendance[] | TeacherAttendance[];
  user: User;
  isLoading?: boolean;
  isPendingAttendance?: boolean;
  onCreateTeacherAttendance?: (data: CreateTeacherAttendanceRequestDTO) => void;
  isSuccessAttendance?: boolean;
};

export const AttendanceRecord = ({
  data,
  user,
  isLoading,
  isPendingAttendance,
  onCreateTeacherAttendance,
  isSuccessAttendance,
}: Props) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  const [searchParams, setSearchParams] = useSearchParams();
  const [openAttendanceModal, setOpenAttendanceModal] =
    useState<boolean>(false);

  const {
    handleSubmit: onHandleSubmitAttendance,
    control,
    reset,
  } = useForm({
    defaultValues: {
      date: new Date(),
      status: AttendanceOptions[0].value as AttendanceStatus,
    },
  });

  const TableColumnData: TableProps<Attendance>['columns'] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => moment(date).format('MMMM DD, YYYY'),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <AttendanceWrapper status={record.status}>
          {record.status.toUpperCase()}
        </AttendanceWrapper>
      ),
    },
  ];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

  const handleChangeStatus = (value: any, _: any) => {
    if (value === 'all' && searchParams.has('status')) {
      searchParams.delete('status');
    } else {
      searchParams.set('status', value);
    }

    setSearchParams(searchParams);
  };

  const handleChangeDate = (_: dayjs.Dayjs, dates: string | string[]) => {
    if (dates.length === 0 && searchParams.has('date')) {
      searchParams.delete('date');
    } else {
      searchParams.set('date', dates as string);
    }

    setSearchParams(searchParams);
  };

  const onSubmitAttendance = (data: {
    date: Date;
    status: AttendanceStatus;
  }) => {
    const newData = {
      ...data,
      user_id: user.id || '',
    };

    if (onCreateTeacherAttendance) {
      onCreateTeacherAttendance(newData);
    }
  };

  useEffect(() => {
    if (isSuccessAttendance) {
      setOpenAttendanceModal(false);
      reset();
    }
  }, [isSuccessAttendance]);

  return (
    <AttendanceListWrapper>
      <AttendanceListHeader>
        <h1>
          {accessType !== AccessType.Student
            ? `${user.first_name} ${user.last_name}`
            : 'My'}{' '}
          Attendance Record
        </h1>
        {accessType === AccessType.Admin && (
          <MarkAttendanceButton
            onClick={() => setOpenAttendanceModal(true)}
            type="primary">
            Mark Attendance
          </MarkAttendanceButton>
        )}
      </AttendanceListHeader>
      <AttendanceListContainer>
        <FilterWrapper>
          <StyledSelect
            defaultValue={searchParams.get('status') || 'all'}
            onChange={handleChangeStatus}
            options={_AttendanceOptions}
          />

          <DatePicker onChange={handleChangeDate} />
        </FilterWrapper>

        <StyledTable
          columns={TableColumnData}
          loading={isLoading}
          dataSource={data}
          rowKey="id"
        />
      </AttendanceListContainer>

      {accessType === AccessType.Admin && (
        <Modal
          isLoading={isPendingAttendance}
          open={openAttendanceModal}
          onCancel={() => {
            setOpenAttendanceModal(false);
          }}
          title="Mark Attendance"
          onSubmit={onHandleSubmitAttendance(onSubmitAttendance)}>
          <Form layout="vertical">
            <Controller
              name="date"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Form.Item label="Attendance Date">
                  <AttendanceSelectContainer>
                    <StyledDatePicker
                      format="YYYY-MM-DD"
                      value={dayjs(value)}
                      onChange={(date: unknown, _: string | string[]) =>
                        onChange(date)
                      }
                      disabledDate={disabledDate}
                      size="large"
                    />
                  </AttendanceSelectContainer>
                </Form.Item>
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Form.Item label="Status">
                  <Select
                    size="large"
                    onChange={onChange}
                    value={value}
                    options={AttendanceOptions}
                  />
                </Form.Item>
              )}
            />
          </Form>
        </Modal>
      )}
    </AttendanceListWrapper>
  );
};
