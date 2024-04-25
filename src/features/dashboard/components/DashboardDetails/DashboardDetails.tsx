import {
  AnnouncementListContainer,
  StyledTextArea,
} from '@/features/announcement/components/elements';
import {
  StyledCard,
  StyledList,
  StyledText,
  Wrapper,
  WrapperContainer,
} from './elements';
import { Avatar, Form, Image, List, Row } from 'antd';
import { BACKEND_URL } from '@/config';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { formatDate } from '@/utils/format';
import { Announcement } from '@/features/announcement/types';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/Elements/Modal';
import { Setting, SettingRequest } from '@/core/domain/dto/settings.dto';
import { Controller, set, useForm } from 'react-hook-form';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';

type DashboardDetailsProps = {
  isFetchingAnnouncements?: boolean;
  announcements: Announcement[];
  setting: Setting;
  isLoadingSetting?: boolean;
  onSubmitSetting: (params: SettingRequest) => void;
  isSubmittingSetting?: boolean;
  isSuccessfullySubmittedSetting?: boolean;
};

const DashboardDetails = ({
  announcements,
  isFetchingAnnouncements,
  setting,
  isLoadingSetting,
  onSubmitSetting,
  isSubmittingSetting,
  isSuccessfullySubmittedSetting,
}: DashboardDetailsProps) => {
  const {
    useAuth: { accessType },
  } = useGlobalState();

  const [isEditVision, setIsEditVision] = useState(false);
  const [isEditMission, setIsEditMission] = useState(false);

  const {
    control: controlVision,
    handleSubmit: handleSubmitVision,
    reset: resetVision,
  } = useForm();

  const {
    control: controlMission,
    handleSubmit: handleSubmitMission,
    reset: resetMission,
  } = useForm();

  useEffect(() => {
    if (setting) {
      resetVision({ vision: setting.vision });
      resetMission({ mission: setting.mission });
    }
  }, [setting]);

  const handleSubmitSetting = (data: { vision?: string; mission?: string }) => {
    const { vision, mission } = data;

    const settingRequest: SettingRequest = {
      vision: (vision || setting.vision) as string,
      mission: (mission || setting.mission) as string,
    };

    onSubmitSetting(settingRequest);
  };

  useEffect(() => {
    if (isSuccessfullySubmittedSetting) {
      setIsEditVision(false);
      setIsEditMission(false);
      resetVision();
      resetMission();
    }
  }, [isSuccessfullySubmittedSetting]);

  return (
    <WrapperContainer>
      <Wrapper>
        <StyledCard
          title="Vision"
          bordered={false}
          isLoading={isLoadingSetting}
          actions={
            accessType === AccessType.Admin
              ? [
                  <EditOutlined
                    onClick={() => {
                      setIsEditVision(true);
                    }}
                    key="edit"
                  />,
                ]
              : []
          }>
          <StyledText>{setting.vision}</StyledText>
        </StyledCard>

        <StyledCard
          title="Mission"
          bordered={false}
          isLoading={isLoadingSetting}
          actions={
            accessType === AccessType.Admin
              ? [
                  <EditOutlined
                    onClick={() => {
                      setIsEditMission(true);
                    }}
                    key="edit"
                  />,
                ]
              : []
          }>
          <StyledText>{setting.mission}</StyledText>
        </StyledCard>
      </Wrapper>

      <AnnouncementListContainer>
        <h1>Announcements</h1>
        <StyledList
          loading={isFetchingAnnouncements}
          size="large"
          dataSource={announcements}
          itemLayout="vertical"
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                item.images?.length ? (
                  <Image.PreviewGroup
                    items={announcements.reduce((acc: string[], curr) => {
                      if (curr.images) {
                        curr.images.forEach((image) => {
                          acc.push(`${BACKEND_URL}/${image}`);
                        });
                      }
                      return acc;
                    }, [])}>
                    <Image
                      width={200}
                      src={`${BACKEND_URL}/${item.images[0]}`}
                    />
                  </Image.PreviewGroup>
                ) : null
              }>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<UserOutlined />}
                    src={`${BACKEND_URL}/${item.posted_by.profile_picture}`}
                  />
                }
                title={<a href="#">{item.title}</a>}
                description={`Posted by ${item.posted_by.first_name} ${
                  item.posted_by.last_name
                } - ${formatDate(
                  item.posted_at.toString(),
                  'MMMM DD, YYYY h:mm A',
                )}`}
              />
              {item.description}
            </List.Item>
          )}
        />
      </AnnouncementListContainer>

      <Modal
        title={`Edit Vision`}
        open={isEditVision}
        isLoading={isSubmittingSetting}
        onCancel={() => setIsEditVision(false)}
        onSubmit={handleSubmitVision(handleSubmitSetting)}>
        <Form layout="vertical">
          <Controller
            name="vision"
            control={controlVision}
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Vision">
                <StyledTextArea
                  rows={6}
                  cols={5}
                  value={value}
                  onChange={onChange}
                  placeholder={`Enter vision`}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>

      <Modal
        title={`Edit Mission`}
        open={isEditMission}
        isLoading={isSubmittingSetting}
        onCancel={() => setIsEditMission(false)}
        onSubmit={handleSubmitMission(handleSubmitSetting)}>
        <Form layout="vertical">
          <Controller
            name="mission"
            control={controlMission}
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Mission">
                <StyledTextArea
                  rows={6}
                  cols={5}
                  value={value}
                  onChange={onChange}
                  placeholder={`Enter mission`}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </WrapperContainer>
  );
};

export { DashboardDetails };
