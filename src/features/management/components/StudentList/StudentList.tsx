import {
  AddStudentButton,
  ErrorWrapper,
  FilterWrapper,
  GlobalStyle,
  StudentListContainer,
  StudentListHeader,
  StudentListWrapper,
  StudentSelectContainer,
  StyledDatePicker,
  StyledTable,
} from './elements';
import { StudentModal } from './StudentModal';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Select, Space, TableProps } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { User } from '@/core/domain/entities/user.entity';
import {
  FetchStudentSubjectResponseDTO,
  Grade,
  GradeEnum,
} from '@/core/domain/dto/subject.dto';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { AttendanceOptions, GradeOptions } from '@/constants/data';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import {
  AttendanceStatus,
  CreateAttendanceRequestDTO,
} from '@/core/domain/dto/attendance.dto';
import { useParams, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { gradeValidationSchema, validationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { Modal } from '@/components/Elements/Modal';

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
  onUpdateGrade: (data: {
    studentId: string;
    grade: { [key in GradeEnum]: string };
  }) => void;
  isUpdatingGrade?: boolean;
  isSuccessUpdatingGrade?: boolean;
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
  onUpdateGrade,
  isUpdatingGrade,
  isSuccessUpdatingGrade,
}: Props) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openAttendanceModal, setOpenAttendanceModal] =
    useState<boolean>(false);
  const [openGradeModal, setOpenGradeModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  const searchValue = searchParams.get('search') || '';

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

  const {
    handleSubmit: onHandleSubmitGrade,
    control: gradeControl,
    formState: { errors: gradeErrors },
    reset: resetGrade,
  } = useForm({
    resolver: yupResolver(gradeValidationSchema),
    defaultValues: {
      period: GradeEnum.MIDTERM,
      grade: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'user_id',
  });

  const [students, setStudents] = useState<StudentListProps[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<
    (User & { grade?: Grade }) | null
  >(null);

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
        key: 'first_name',
        render: (_, record) => record.student.first_name,
      },
      {
        title: 'Last Name',
        key: 'last_name',
        render: (_, record) => record.student.last_name,
      },
      {
        title: 'Grade',
        key: 'grade',
        render: (_, record) => (
          <Space size="small" direction="vertical">
            {Object.entries(record.grade).map(([key, value]) => {
              if (
                [GradeEnum.MIDTERM, GradeEnum.FINAL].includes(key as GradeEnum)
              ) {
                return (
                  <span
                    key={`grade-${key}`}>{`${key.toLocaleUpperCase()}: ${value}`}</span>
                );
              }
            })}
          </Space>
        ),
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
            {accessType === AccessType.Teacher && (
              <a
                onClick={() =>
                  onClickAddGrade({ ...record.student, grade: record.grade })
                }>
                Add Grade
              </a>
            )}
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

  const onClickAddGrade = (student: User & { grade?: Grade }) => {
    setSelectedStudent(student);
    setOpenGradeModal(true);
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

  const onChangeStudent = (student: StudentListProps, _: any) => {
    const newData = students.filter(
      (data) => data.value.toString() !== student.value.toString(),
    ) as StudentListProps[];
    setStudents(newData);
  };

  const onRemoveStudent = (student: StudentListProps) => {
    setStudents((prev) => [...prev, student]);
  };

  const onSubmitGrade = (data: { period: GradeEnum; grade: string }) => {
    const { period, grade } = data;
    let grades: Grade = {
      prelim: 'NG',
      midterm: 'NG',
      semifinal: 'NG',
      final: 'NG',
    };

    Object.entries(selectedStudent?.grade || {}).map(([key, value]) => {
      if (key === data.period) {
        grades[period] = grade;
      } else {
        grades[key as GradeEnum] = value;
      }
    });

    onUpdateGrade({ studentId: selectedStudent?.id || '', grade: grades });
  };

  const handleSearch = (keyword: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(keyword);
    }, 300);
  };

  const performSearch = (keyword: string) => {
    setSearchParams({ search: keyword });
  };

  useEffect(() => {
    if (isSuccessUpdatingGrade) {
      setOpenGradeModal(false);
      resetGrade();
    }
  }, [isSuccessUpdatingGrade]);

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
          <FilterWrapper>
            <Input
              defaultValue={searchValue}
              size="large"
              placeholder="Search students..."
              onChange={(e) => {
                const { value } = e.target;
                handleSearch(value);
              }}
            />
          </FilterWrapper>

          <StyledTable
            loading={isLoading}
            columns={TableColumnData}
            dataSource={subjectStudentData}
            rowKey="id"
          />
        </StudentListContainer>

        <Modal
          onSubmit={onHandleSubmitGrade(onSubmitGrade)}
          open={openGradeModal}
          isLoading={isUpdatingGrade}
          onCancel={() => {
            setSelectedStudent(null);
            setOpenGradeModal(false);
          }}
          title="Add Grade">
          <Form layout="vertical">
            <ErrorMessage
              name="period"
              errors={gradeErrors}
              render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
            />
            <Controller
              name="period"
              control={gradeControl}
              render={({ field: { value, onChange } }) => (
                <Form.Item label="Period" required>
                  <Select
                    onChange={onChange}
                    value={value}
                    size="large"
                    options={GradeOptions.filter(
                      (option) =>
                        option.value !== 'prelim' &&
                        option.value !== 'semifinal',
                    )}
                  />
                </Form.Item>
              )}
            />

            <ErrorMessage
              name="grade"
              errors={gradeErrors}
              render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
            />
            <Controller
              name="grade"
              control={gradeControl}
              render={({ field: { value, onChange } }) => (
                <Form.Item label="Grade" required>
                  <Input onChange={onChange} value={value} size="large" />
                </Form.Item>
              )}
            />
          </Form>
        </Modal>

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
          onCancel={() => {
            setSelectedStudent(null);
            setOpenAttendanceModal(false);
          }}
          title="Mark Attendance"
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
