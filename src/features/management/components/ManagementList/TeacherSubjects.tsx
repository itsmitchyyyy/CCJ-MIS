import { Card, Col, Row } from 'antd';
import {
  ManagementHeader,
  ManagementWrapper,
  StyledCardContent,
  StyledCardContentDescription,
  StyledCardContentWrapper,
  Wrapper,
} from './elements';
import Meta from 'antd/es/card/Meta';
import {
  ClockCircleOutlined,
  ReadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { formatStringDate } from '@/utils/format';
import { useNavigate } from 'react-router-dom';
import { FetchSubjectResponseDTO } from '@/core/domain/dto/subject.dto';

type Props = {
  isLoading?: boolean;
  subjects: FetchSubjectResponseDTO[];
};

const TeacherSubjecs = ({ subjects, isLoading }: Props) => {
  const navigate = useNavigate();

  return (
    <ManagementWrapper>
      <ManagementHeader>
        <h1>Subjects</h1>
      </ManagementHeader>
      <Wrapper>
        <Row gutter={[16, 16]}>
          {isLoading ? (
            <>
              {Array.from(Array(5)).map((_, index) => (
                <Col span={6} key={index}>
                  <Card loading={isLoading}>
                    <Meta
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                </Col>
              ))}
            </>
          ) : (
            <>
              {subjects.map((subject, index) => (
                <Col span={6} key={`${subject.id}-${index}`}>
                  <Card
                    loading={isLoading}
                    actions={[
                      <UserOutlined
                        key="students"
                        onClick={() =>
                          navigate(
                            `/management/subject/${subject.id}/student-list`,
                          )
                        }
                      />,
                      <ClockCircleOutlined
                        onClick={() =>
                          navigate(
                            `/management/subject/${subject.id}/attendance`,
                          )
                        }
                        key="attendance"
                      />,
                      <ReadOutlined
                        onClick={() =>
                          navigate(
                            `/management/subject/${subject.id}/assignments`,
                          )
                        }
                        key="assignments"
                      />,
                    ]}>
                    <Meta
                      title={subject.name}
                      description={
                        <StyledCardContent>
                          <StyledCardContentWrapper>
                            <span>Hour:</span>
                            <span>
                              {formatStringDate(subject.time_start, 'HH:mm A')}{' '}
                              - {formatStringDate(subject.time_end, 'HH:mm A')}
                            </span>
                          </StyledCardContentWrapper>
                          <StyledCardContentWrapper>
                            <span>Room:</span>
                            <span>{subject.room}</span>
                          </StyledCardContentWrapper>
                          <StyledCardContentWrapper>
                            <span>Schedule Days:</span>
                            <span>{subject.days}</span>
                          </StyledCardContentWrapper>

                          <StyledCardContentDescription>
                            {subject.description}
                          </StyledCardContentDescription>
                        </StyledCardContent>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Wrapper>
    </ManagementWrapper>
  );
};

export default TeacherSubjecs;
