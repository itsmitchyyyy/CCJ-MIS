import { TableColumnDummyData, TableDummyData } from '@/constants/dummyData';
import {
  AddFacilityButton,
  ErrorWrapper,
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  StyledTable,
  StyledTextArea,
} from './elements';
import { Form, Input, Select, Tabs } from 'antd';
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
import { StoreFacilityDTO } from '@/core/domain/dto/facility.dto';

type FacilityProps = {
  onCreateFacility: (data: StoreFacilityDTO) => void;
  isSubmitting?: boolean;
  isCreateFacilitySuccess?: boolean;
};

const Facilities = ({
  onCreateFacility,
  isSubmitting,
  isCreateFacilitySuccess,
}: FacilityProps) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  const [openFacility, setOpenFacility] = useState<boolean>(false);
  const [type, setType] = useState<FacilityType>(
    TabItemOptions[0].key as FacilityType,
  );

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

  const tabItems: Tab[] = TabItemOptions.map((item) => {
    return {
      label: item.label,
      key: item.key,
      children: (
        <StyledTable
          columns={TableColumnDummyData}
          dataSource={TableDummyData}
          rowKey="id"
        />
      ),
    };
  });

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
        <Tabs tabPosition="left" items={tabItems} />
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
