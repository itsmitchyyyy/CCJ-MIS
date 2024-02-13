import React, { useRef } from 'react';
import { Avatar, Badge, Button, Col, Flex, Form, Input, Row } from 'antd';
import {
  AvatarWrapper,
  Container,
  HiddenInput,
  ImageWrapper,
  StyledCloudUpload,
  StyledFlex,
  Wrapper,
} from './elements';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

const Profile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

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
                    <Avatar size={68} icon={<UserOutlined />} />
                    <HiddenInput type="file" ref={fileRef} />
                  </Badge>
                </ImageWrapper>
              ) : (
                <Avatar size={68} icon={<UserOutlined />} />
              )}
            </AvatarWrapper>
          </Col>
        </Row>
        <Form layout="vertical">
          <Flex gap="middle">
            <StyledFlex vertical>
              <Form.Item label="First Name" required>
                <Input disabled={!isEdit} size="large" />
              </Form.Item>
              <Form.Item label="Last Name" required>
                <Input disabled={!isEdit} size="large" />
              </Form.Item>
              <Form.Item label="Contact Number" required>
                <Input disabled={!isEdit} size="large" />
              </Form.Item>
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
                        onClick={() => setIsEdit(false)}>
                        Cancel
                      </Button>
                      <Button block type="primary" size="large">
                        Save
                      </Button>
                    </React.Fragment>
                  )}
                </Flex>
              </Form.Item>
            </StyledFlex>
            <StyledFlex vertical>
              <Form.Item label="User ID">
                <Input disabled size="large" />
              </Form.Item>
              <Form.Item label="Email" required>
                <Input type="email" disabled={!isEdit} size="large" />
              </Form.Item>
            </StyledFlex>
          </Flex>
          {/* <Row gutter={[16, 24]}>
            <Col span={12}>
              <Form.Item label="First Name" required>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="First Name" required>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="First Name" required>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="First Name" required>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="First Name" required>
                <Input />
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Profile;
