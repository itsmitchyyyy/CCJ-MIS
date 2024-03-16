import { TableDummyData } from '@/constants/dummyData';
import {
  AddStudentButton,
  GlobalStyle,
  StudentListContainer,
  StudentListHeader,
  StudentListWrapper,
  StudentSelectContainer,
  StyledTable,
} from './elements';
import { AddStudentModal } from './AddStudentModal';
import { useEffect, useState } from 'react';
import { Button, Form, Select, Space, TableProps } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { User } from '@/core/domain/entities/user.entity';
import { FetchStudentSubjectResponseDTO } from '@/core/domain/dto/subject.dto';

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
};

export const StudentList = ({
  data,
  isLoading,
  onSubmit,
  isSubmitting,
  subjectStudentData,
}: Props) => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: { user_id: [{ value: '' }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'user_id',
  });

  const [students, setStudents] = useState<StudentListProps[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<StudentListProps[]>(
    [],
  );

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
            <a>Delete</a>
            <a>Update</a>
          </Space>
        ),
      },
    ];

  useEffect(() => {
    setStudents(
      students.filter(
        (student) =>
          !selectedStudents.some(
            (selectedStudent) => selectedStudent.value === student.value,
          ),
      ),
    );
  }, [selectedStudents]);

  useEffect(() => {
    if (data.length && !isLoading) {
      const newStudents = data.map((student) => ({
        label: `${student.first_name} ${student.last_name}`,
        value: Number(student.id),
      })) as StudentListProps[];

      setStudents(newStudents);
    }
  }, [data, isLoading]);

  return (
    <>
      <GlobalStyle />
      <StudentListWrapper>
        <StudentListHeader>
          <h1>Student List</h1>
          <AddStudentButton
            type="primary"
            onClick={() => setOpenAddModal(true)}>
            Add Student
          </AddStudentButton>
        </StudentListHeader>
        <StudentListContainer>
          <StyledTable
            loading={isLoading}
            columns={TableColumnData}
            dataSource={subjectStudentData}
            rowKey="id"
          />
        </StudentListContainer>

        <AddStudentModal
          open={openAddModal}
          isLoading={isSubmitting}
          onCancel={() => setOpenAddModal(false)}
          onSubmit={handleSubmit(onHandleSubmit)}>
          <Form layout="vertical">
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`user_id.${index}.value`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Form.Item>
                    <StudentSelectContainer>
                      <Select
                        loading={isLoading}
                        size="large"
                        value={value}
                        onChange={(
                          value: string,
                          options: StudentListProps | StudentListProps[],
                        ) => {
                          const selectedOption = options as StudentListProps;
                          setSelectedStudents((prev) => [
                            ...prev,
                            selectedOption,
                          ]);
                          onChange(value, options);
                        }}
                        options={students}
                      />
                      {fields.length > 1 && (
                        <Button
                          size="large"
                          danger
                          onClick={() => {
                            setStudents((prev) => [
                              ...prev,
                              ...selectedStudents,
                            ]);
                            remove(index);
                          }}>
                          Remove
                        </Button>
                      )}
                    </StudentSelectContainer>
                  </Form.Item>
                )}
              />
            ))}
          </Form>

          {fields.length < data.length && (
            <Button type="primary" onClick={() => append({ value: '' })}>
              Add More Student
            </Button>
          )}
        </AddStudentModal>
      </StudentListWrapper>
    </>
  );
};
