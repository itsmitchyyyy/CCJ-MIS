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
import { useState } from 'react';
import { Button, Form, Select } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

export const StudentList = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { control } = useForm({ defaultValues: { user_id: [{ value: '' }] } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'user_id',
  });

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
                      onChange={onChange}
                      options={[
                        { label: 'Student 1', value: 1 },
                        { label: 'Student 2', value: 2 },
                      ]}
                    />
                    {fields.length > 1 && (
                      <Button size="large" danger onClick={() => remove(index)}>
                        Remove
                      </Button>
                    )}
                  </StudentSelectContainer>
                </Form.Item>
              )}
            />
          ))}
        </Form>
        <Button type="primary" onClick={() => append({ value: '' })}>
          Add More Student
        </Button>
      </AddStudentModal>
    </StudentListWrapper>
  );
};
