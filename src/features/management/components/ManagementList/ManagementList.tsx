import { Card, Col, Row } from 'antd';
import {
  CreateSubjectButton,
  ManagementHeader,
  ManagementWrapper,
  Wrapper,
} from './elements';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';

const ManagementList = () => {
  const navigate = useNavigate();

  return (
    <ManagementWrapper>
      <ManagementHeader>
        <h1>Subjects</h1>
        <CreateSubjectButton
          type="primary"
          onClick={() => navigate(PATHS.MANAGEMENT.CREATE_SUBJECT)}>
          Add Subject
        </CreateSubjectButton>
      </ManagementHeader>
      <Wrapper>
        <Row gutter={[16, 16]}>
          {Array.from(Array(10)).map((_, index) => (
            <Col span={6} key={index}>
              <Card
                title="UCMN-221263 RECESS"
                actions={[
                  <UserOutlined key="students" />,
                  <ClockCircleOutlined key="attendance" />,
                ]}>
                Description here
              </Card>
            </Col>
          ))}
        </Row>
      </Wrapper>
    </ManagementWrapper>
  );
};

export default ManagementList;
