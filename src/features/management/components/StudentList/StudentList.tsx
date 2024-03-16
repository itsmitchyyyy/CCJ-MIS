import { TableColumnDummyData, TableDummyData } from '@/constants/dummyData';
import {
  AddStudentButton,
  StudentListContainer,
  StudentListHeader,
  StudentListWrapper,
  StudentSelectContainer,
  StyledTable,
} from './elements';
import { AddStudentModal } from './AddStudentModal';
import { useEffect, useState } from 'react';
import { Button, Form, Select } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

type StudentListProps = {
  label: string;
  value: number;
};

export const StudentList = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { control } = useForm({ defaultValues: { user_id: [{ value: '' }] } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'user_id',
  });

  const students: StudentListProps[] = [
    { label: 'Student 1', value: 1 },
    { label: 'Student 2', value: 2 },
  ];

  const [selectedStudents, setSelectedStudents] = useState<StudentListProps[]>(
    [],
  );
  const [filteredStudents, setFilteredStudents] =
    useState<StudentListProps[]>(students);

  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (student) =>
          !selectedStudents.some(
            (selectedStudent) => selectedStudent.value === student.value,
          ),
      ),
    );
  }, [selectedStudents]);

  return (
    <StudentListWrapper>
      <StudentListHeader>
        <h1>Student List</h1>
        <AddStudentButton type="primary" onClick={() => setOpenAddModal(true)}>
          Add Student
        </AddStudentButton>
      </StudentListHeader>
      <StudentListContainer>
        <StyledTable
          columns={TableColumnDummyData}
          dataSource={TableDummyData}
          rowKey="id"
        />
      </StudentListContainer>

      <AddStudentModal
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        onSubmit={() => {}}>
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
                      options={filteredStudents}
                    />
                    {fields.length > 1 && (
                      <Button
                        size="large"
                        danger
                        onClick={() => {
                          setFilteredStudents((prev) => [
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

        {fields.length < students.length && (
          <Button type="primary" onClick={() => append({ value: '' })}>
            Add More Student
          </Button>
        )}
      </AddStudentModal>
    </StudentListWrapper>
  );
};
