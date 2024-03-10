import React, { useEffect, useRef } from 'react';
import { Avatar, Badge, Button, Col, Flex, Form, Input, Row } from 'antd';
import {
  AvatarWrapper,
  ChangePasswordWrapper,
  Container,
  HiddenInput,
  ImageWrapper,
  StyledCloudUpload,
  StyledFlex,
  Wrapper,
} from './elements';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { validationSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { BACKEND_URL } from '@/config';
import {
  ChangePasswordRequest,
  ProfileDetail,
  UpdateAccountDetails,
} from '../../types';
import ChangePasswordModal from '../ChangePasswordModal';

type Props = {
  detail: ProfileDetail;
  onSubmit: (data: UpdateAccountDetails & { id: string }) => void;
  isSuccess?: boolean;
  isLoading?: boolean;
};

const Profile = ({ detail, onSubmit, isSuccess, isLoading }: Props) => {
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    `${BACKEND_URL}/${detail.profilePicture}`,
  );

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: detail.firstName,
      last_name: detail.lastName,
      email: detail.email,
      contact_number: detail.contactNumber,
    },
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onClickSubmit = (data: UpdateAccountDetails) => {
    const newData = file ? { ...data, profile_picture: file } : data;
    onSubmit({ ...newData, id: detail.id });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEdit(false);
    }
  }, [isSuccess]);

  return (
    <Container>
      <h1>
        <div>Account Information</div>
      </h1>
      <Wrapper>
        <Row>
          <Col span={24}>
            <AvatarWrapper>
              {isEdit ? (
                <ImageWrapper onClick={() => fileRef.current?.click()}>
                  <Badge count={<StyledCloudUpload />}>
                    <Avatar size={68} src={imageUrl} icon={<UserOutlined />} />
                    <HiddenInput
                      type="file"
                      ref={fileRef}
                      onChange={handleChangeFile}
                    />
                  </Badge>
                </ImageWrapper>
              ) : (
                <Avatar size={68} src={imageUrl} icon={<UserOutlined />} />
              )}
            </AvatarWrapper>
          </Col>
        </Row>
        <Form layout="vertical">
          <Flex gap="middle">
            <StyledFlex vertical>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <Form.Item label="First Name" required>
                    <Input
                      name="first_name"
                      disabled={!isEdit}
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Last Name" required>
                    <Input
                      disabled={!isEdit}
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="contact_number"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Contact Number" required>
                    <Input
                      disabled={!isEdit}
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Form.Item>
                )}
              />

              <Form.Item>
                <Flex gap="middle">
                  {!isEdit ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => setIsEdit(true)}>
                      Edit
                    </Button>
                  ) : (
                    <React.Fragment>
                      <Button
                        block
                        type="default"
                        size="large"
                        disabled={isLoading}
                        onClick={() => setIsEdit(false)}>
                        Cancel
                      </Button>
                      <Button
                        block
                        type="primary"
                        size="large"
                        disabled={isLoading}
                        onClick={handleSubmit(onClickSubmit)}>
                        Save
                      </Button>
                    </React.Fragment>
                  )}
                </Flex>
              </Form.Item>
            </StyledFlex>
            <StyledFlex vertical>
              <Form.Item label="User ID">
                <Input disabled size="large" value={detail.username} />
              </Form.Item>

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Email" required>
                    <Input
                      type="email"
                      disabled={!isEdit}
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Form.Item>
                )}
              />

              <ChangePasswordWrapper
                onClick={() => setOpenChangePasswordModal(true)}>
                Change Password
              </ChangePasswordWrapper>
            </StyledFlex>
          </Flex>
        </Form>
        <ChangePasswordModal
          onOk={(data: ChangePasswordRequest) => {
            console.log(data);
          }}
          open={openChangePasswordModal}
          onCancel={() => setOpenChangePasswordModal(false)}
        />
      </Wrapper>
    </Container>
  );
};

export default Profile;
