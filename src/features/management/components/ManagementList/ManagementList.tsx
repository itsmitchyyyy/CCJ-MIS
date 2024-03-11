import { Card, Col, Row } from 'antd';
import { ManagementWrapper, Wrapper } from './elements';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const ManagementList = () => {
  return (
    <ManagementWrapper>
      <h1>Subjects</h1>
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
