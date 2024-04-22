import { AnnouncementListContainer } from '@/features/announcement/components/elements';
import {
  StyledCard,
  StyledList,
  StyledText,
  Wrapper,
  WrapperContainer,
} from './elements';
import { Avatar, Image, List } from 'antd';
import { BACKEND_URL } from '@/config';
import { UserOutlined } from '@ant-design/icons';
import { formatDate } from '@/utils/format';
import { Announcement } from '@/features/announcement/types';

type DashboardDetailsProps = {
  isFetchingAnnouncements: boolean;
  announcements: Announcement[];
};

const DashboardDetails = ({
  announcements,
  isFetchingAnnouncements,
}: DashboardDetailsProps) => {
  return (
    <WrapperContainer>
      <Wrapper>
        <StyledCard title="Vision" bordered={false}>
          <StyledText>
            To provide our customers with the most convenient shoppingexperience
          </StyledText>
        </StyledCard>
        <StyledCard title="Mission">
          <StyledText>To be the world's leading online retailer.</StyledText>
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
    </WrapperContainer>
  );
};

export { DashboardDetails };
