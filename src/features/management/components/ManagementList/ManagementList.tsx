import { Card, Col, Row, Table } from 'antd';
import {
  CreateSubjectButton,
  ManagementHeader,
  ManagementWrapper,
  StyledCardContent,
  StyledCardContentDescription,
  StyledCardContentWrapper,
  Wrapper,
} from './elements';
import {
  AuditOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import Meta from 'antd/es/card/Meta';
import { FetchSubjectResponseDTO, Grade } from '@/core/domain/dto/subject.dto';
import { formatStringDate } from '@/utils/format';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { Modal } from '@/components/Elements/Modal';
import { useState } from 'react';

type Props = {
  isLoading?: boolean;
  subjects: FetchSubjectResponseDTO[];
  grades?: { user_id: string; subject_id: string; grade: Grade }[];
};

const ManagementList = ({ subjects, isLoading, grades }: Props) => {
  const {
    useAuth: { accessType, id },
  } = useGlobalState();
  const navigate = useNavigate();

  const [openGrade, setOpenGrade] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  const TableColumnData = [
    {
      title: 'Period',
      key: 'period',
      render: (record: { period: string }) => record.period,
    },
    {
      title: 'Grade',
      key: 'grade',
      render: (record: { grade: string }) => record.grade,
    },
  ];

  const getGrade = () => {
    if (selectedGrade) {
      const { midterm, final } = selectedGrade;
      return [
        { period: 'Midterm', grade: midterm },
        { period: 'Final', grade: final },
      ];
    }

    return [];
  };

  return (
    <ManagementWrapper>
      <ManagementHeader>
        <h1>Subjects</h1>
        {accessType === AccessType.Admin && (
          <CreateSubjectButton
            type="primary"
            onClick={() => navigate(PATHS.MANAGEMENT.CREATE_SUBJECT)}>
            Add Subject
          </CreateSubjectButton>
        )}
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
                    actions={
                      accessType === AccessType.Student
                        ? [
                            <ReadOutlined
                              onClick={() =>
                                navigate(
                                  `/management/subject/${subject.id}/assignments`,
                                )
                              }
                              key="assignments"
                            />,
                            <ClockCircleOutlined
                              onClick={() =>
                                navigate(
                                  `/management/subject/${subject.id}/attendance/${id}`,
                                )
                              }
                              key="attendance"
                            />,
                            <AuditOutlined
                              onClick={() => {
                                grades?.map((grade) => {
                                  if (grade.subject_id === subject.id) {
                                    setSelectedGrade(grade.grade);
                                  }
                                });

                                setOpenGrade(true);
                              }}
                              key="grade"
                            />,
                          ]
                        : [
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
                          ]
                    }>
                    <Meta
                      title={subject.name}
                      description={
                        <StyledCardContent>
                          <StyledCardContentWrapper>
                            <span>Teacher:</span>
                            <span>
                              {' '}
                              {`${subject.user.first_name} ${subject.user.last_name}`}
                            </span>
                          </StyledCardContentWrapper>
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

      <Modal
        title="Grade"
        onSubmit={() => {}}
        open={openGrade}
        onCancel={() => {
          setOpenGrade(false);
          setSelectedGrade(null);
        }}
        footer={null}>
        <div>
          <Table
            rowKey="period"
            pagination={false}
            columns={TableColumnData}
            dataSource={selectedGrade ? getGrade() : []}
          />
        </div>
      </Modal>
    </ManagementWrapper>
  );
};

export default ManagementList;
