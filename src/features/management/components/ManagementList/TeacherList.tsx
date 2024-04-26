import { Form, Input, Select, Space, TableProps } from 'antd';
import {
  FilterWrapper,
  GlobalStyle,
  StyledDatePicker,
  StyledTable,
  TeacherListContainer,
  TeacherListHeader,
  TeacherListWrapper,
  TeacherSelectContainer,
} from './elements';
import { useEffect, useRef, useState } from 'react';
import { FetchTeachersResponseDTO } from '@/core/domain/dto/user.dto';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { Modal } from '@/components/Elements/Modal';
import { Controller, set, useForm } from 'react-hook-form';
import { AttendanceOptions } from '@/constants/data';
import dayjs from 'dayjs';
import {
  AttendanceStatus,
  CreateTeacherAttendanceRequestDTO,
} from '@/core/domain/dto/attendance.dto';
import { RangePickerProps } from 'antd/es/date-picker';

type Props = {
  isLoading?: boolean;
  teachers: FetchTeachersResponseDTO[];
  isPendingAttendance?: boolean;
  isSuccessAttendance?: boolean;
  onCreateTeacherAttendance: (data: CreateTeacherAttendanceRequestDTO) => void;
};

export const TeacherList = ({
  isLoading,
  teachers,
  isPendingAttendance,
  isSuccessAttendance,
  onCreateTeacherAttendance,
}: Props) => {
  const navigate = useNavigate();
  const [openAttendanceModal, setOpenAttendanceModal] =
    useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] =
    useState<FetchTeachersResponseDTO | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  const searchValue = searchParams.get('search') || '';

  const TableColumnData: TableProps<FetchTeachersResponseDTO>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'student',
      key: 'first_name',
      render: (_, record) => record.first_name,
    },
    {
      title: 'Last Name',
      dataIndex: 'student',
      key: 'last_name',
      render: (_, record) => record.last_name,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              navigate(
                PATHS.MANAGEMENT.TEACHER_SUBJECTS.replace(':id', record.id),
              )
            }>
            Subjects
          </a>
          <a
            onClick={() =>
              navigate(
                PATHS.MANAGEMENT.TEACHER_ATTENDANCE_RECORD.replace(
                  ':id',
                  record.id,
                ),
              )
            }>
            Attendance Records
          </a>
          <a onClick={() => onClickMarkAttendance(record)}>Mark Attendance</a>
        </Space>
      ),
    },
  ];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

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

  const onClickMarkAttendance = (teacher: FetchTeachersResponseDTO) => {
    setSelectedTeacher(teacher);
    setOpenAttendanceModal(true);
  };

  const onSubmitAttendance = (data: {
    date: Date;
    status: AttendanceStatus;
  }) => {
    const newData = {
      ...data,
      user_id: selectedTeacher?.id || '',
    };

    onCreateTeacherAttendance(newData);
  };

  const handleSearch = (keyword: string) => {
    setSearchParams({ search: keyword });

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(keyword);
    }, 300);
  };

  const performSearch = (keyword: string) => {
    // Perform search here
  };

  useEffect(() => {
    if (isSuccessAttendance) {
      setSelectedTeacher(null);
      setOpenAttendanceModal(false);
      reset();
    }
  }, [isSuccessAttendance]);

  // Cleanup the search timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <TeacherListWrapper>
        <TeacherListHeader>
          <h1>Teachers</h1>
        </TeacherListHeader>

        <TeacherListContainer>
          <FilterWrapper>
            <Input
              defaultValue={searchValue}
              size="large"
              placeholder="Search teacher..."
              onChange={(e) => {
                const { value } = e.target;
                handleSearch(value);
              }}
            />
          </FilterWrapper>

          <StyledTable
            rowKey="id"
            columns={TableColumnData}
            dataSource={teachers}
            loading={isLoading}
          />
        </TeacherListContainer>

        <Modal
          isLoading={isPendingAttendance}
          open={openAttendanceModal}
          onCancel={() => {
            setSelectedTeacher(null);
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
                  <TeacherSelectContainer>
                    <StyledDatePicker
                      format="YYYY-MM-DD"
                      value={dayjs(value)}
                      onChange={(date: unknown, _: string | string[]) =>
                        onChange(date)
                      }
                      disabledDate={disabledDate}
                      size="large"
                    />
                  </TeacherSelectContainer>
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
      </TeacherListWrapper>
    </>
  );
};
