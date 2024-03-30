import {
  AddStudentButton,
  ErrorWrapper,
  GlobalStyle,
  StudentListContainer,
  StudentListHeader,
  StudentListWrapper,
  StudentSelectContainer,
  StyledDatePicker,
  StyledTable,
} from './elements';
import { StudentModal } from './StudentModal';
import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, TableProps } from 'antd';
import { Controller, set, useFieldArray, useForm } from 'react-hook-form';
import { User } from '@/core/domain/entities/user.entity';
import { FetchStudentSubjectResponseDTO } from '@/core/domain/dto/subject.dto';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { AttendanceOptions } from '@/constants/data';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import {
  AttendanceStatus,
  CreateAttendanceRequestDTO,
} from '@/core/domain/dto/attendance.dto';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';

type StudentListProps = {
  label: string;
  value: number;
};

type Props = {
  isLoading?: boolean;
  isSubmitting?: boolean;
  data: User[];
  subjectStudentData: FetchStudentSubjectResponseDTO[];
  onSubmit: (user_id: string[]) => void;
  onDelete: ({
    subjectId,
    studentId,
  }: {
    subjectId: string;
    studentId: string;
  }) => void;
  isAdded?: boolean;
  onCreateAttendance: (data: CreateAttendanceRequestDTO) => void;
};

export const StudentList = ({
  data,
  isLoading,
  onSubmit,
  isSubmitting,
  subjectStudentData,
  onDelete,
  isAdded,
  onCreateAttendance,
}: Props) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAttendanceModal, setOpenAttendanceModal] = useState(false);

  const { id } = useParams();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { user_id: [{ value: '', label: '' }] },
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit: onHandleSubmitAttendance, control: attendanceControl } =
    useForm({
      defaultValues: {
        date: new Date(),
        status: AttendanceOptions[0].value as AttendanceStatus,
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'user_id',
  });

  const [students, setStudents] = useState<StudentListProps[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  const onHandleSubmit = (data: { user_id: { value: string }[] }) => {
    const newData = data.user_id.map((user) => user.value.toString());
    onSubmit(newData);
  };

  const TableColumnData: TableProps<FetchStudentSubjectResponseDTO>['columns'] =
    [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'First Name',
        dataIndex: 'student',
        key: 'first_name',
        render: (record) => record.first_name,
      },
      {
        title: 'Last Name',
        dataIndex: 'student',
        key: 'last_name',
        render: (record) => record.last_name,
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            {accessType === AccessType.Admin && (
              <a
                onClick={() =>
                  onDelete({
                    studentId: record.student_id,
                    subjectId: record.subject_id,
                  })
                }>
                Delete
              </a>
            )}
            <a onClick={() => onClickMarkAttendance(record.student)}>
              Mark Attendance
            </a>
            {accessType === AccessType.Teacher && <a>Add Grade</a>}
          </Space>
        ),
      },
    ];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

  useEffect(() => {
    if (data.length && !isLoading) {
      const newStudents = data
        .map((student) => ({
          label: `${student.first_name} ${student.last_name}`,
          value: Number(student.id),
        }))
        .filter(
          (student) =>
            !subjectStudentData.some(
              (subjectStudent) =>
                subjectStudent.student_id.toString() ===
                student.value.toString(),
            ),
        ) as StudentListProps[];

      setStudents(newStudents);
    }
  }, [data, isLoading, subjectStudentData]);

  useEffect(() => {
    if (isAdded) {
      setOpenAddModal(false);
      setOpenAttendanceModal(false);
      reset();
    }
  }, [isAdded]);

  const onClickMarkAttendance = (student: User) => {
    setSelectedStudent(student);
    setOpenAttendanceModal(true);
  };

  const onSubmitAttendance = (data: {
    date: Date;
    status: AttendanceStatus;
  }) => {
    const newData = {
      ...data,
      user_id: selectedStudent?.id || '',
      subject_id: id || '',
    };
    onCreateAttendance(newData);
  };

  const onChangeStudent = (student: StudentListProps, options: any) => {
    const newData = students.filter(
      (data) => data.value.toString() !== student.value.toString(),
    ) as StudentListProps[];
    setStudents(newData);
  };

  const onRemoveStudent = (student: StudentListProps) => {
    setStudents((prev) => [...prev, student]);
  };

  return (
    <>
      <GlobalStyle />
      <StudentListWrapper>
        <StudentListHeader>
          <h1>Student List</h1>
          {accessType === AccessType.Admin && (
            <AddStudentButton
              type="primary"
              onClick={() => setOpenAddModal(true)}>
              Add Student
            </AddStudentButton>
          )}
        </StudentListHeader>
        <StudentListContainer>
          <StyledTable
            loading={isLoading}
            columns={TableColumnData}
            dataSource={subjectStudentData}
            rowKey="id"
          />
        </StudentListContainer>

        <StudentModal
          open={openAddModal}
          isLoading={isSubmitting}
          onCancel={() => setOpenAddModal(false)}
          onSubmit={handleSubmit(onHandleSubmit)}>
          <Form layout="vertical">
            {fields.map((field, index) => (
              <React.Fragment key={`fragment-${field.id}`}>
                <ErrorMessage
                  name={`user_id.${index}.value`}
                  errors={errors}
                  render={({ message }) => (
                    <ErrorWrapper>{message}</ErrorWrapper>
                  )}
                />

                <Controller
                  key={field.id}
                  name={`user_id.${index}`}
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Form.Item>
                        <StudentSelectContainer>
                          <Select
                            labelInValue
                            status={errors.user_id?.[index]?.value && 'error'}
                            loading={isLoading}
                            size="large"
                            value={value as any}
                            onChange={(
                              value: string,
                              options: StudentListProps | StudentListProps[],
                            ) => {
                              const selectedOption =
                                options as StudentListProps;
                              onChangeStudent(selectedOption, options);
                              onChange(value, options);
                            }}
                            options={students}
                          />
                          {fields.length > 1 && (
                            <Button
                              size="large"
                              danger
                              onClick={() => {
                                const student = data.find(
                                  (student) =>
                                    student.id.toString() ===
                                    value.value.toString(),
                                );

                                if (student) {
                                  onRemoveStudent({
                                    label: `${student?.first_name} ${student?.last_name}`,
                                    value: Number(student?.id),
                                  });
                                }

                                remove(index);
                              }}>
                              Remove
                            </Button>
                          )}
                        </StudentSelectContainer>
                      </Form.Item>
                    );
                  }}
                />
              </React.Fragment>
            ))}
          </Form>

          <Button
            type="primary"
            onClick={() => append({ value: '', label: '' })}>
            Add More Student
          </Button>
        </StudentModal>

        <StudentModal
          isLoading={isSubmitting}
          open={openAttendanceModal}
          onCancel={() => setOpenAttendanceModal(false)}
          onSubmit={onHandleSubmitAttendance(onSubmitAttendance)}>
          <Form layout="vertical">
            <Controller
              name="date"
              control={attendanceControl}
              render={({ field: { value, onChange } }) => (
                <Form.Item label="Attendance Date">
                  <StudentSelectContainer>
                    <StyledDatePicker
                      format="YYYY-MM-DD"
                      value={dayjs(value)}
                      onChange={(date: unknown, _: string | string[]) =>
                        onChange(date)
                      }
                      disabledDate={disabledDate}
                      size="large"
                    />
                  </StudentSelectContainer>
                </Form.Item>
              )}
            />

            <Controller
              name="status"
              control={attendanceControl}
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
        </StudentModal>
      </StudentListWrapper>
    </>
  );
};
