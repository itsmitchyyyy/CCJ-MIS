import { Avatar, List } from 'antd';
import {
  AddAnnouncementButton,
  AnnouncementHeader,
  AnnouncementListContainer,
  AnnouncementWrapper,
} from './elements';

const Announcement = () => {
  return (
    <AnnouncementWrapper>
      <AnnouncementHeader>
        <h1>Announcements</h1>

        <AddAnnouncementButton type="primary" size="large">
          Add Announcement
        </AddAnnouncementButton>
      </AnnouncementHeader>

      <AnnouncementListContainer>
        <List
          size="large"
          itemLayout="vertical"
          renderItem={(item) => (
            <List.Item
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                }
                title={<a href="#">Wew</a>}
                description="wew"
              />
              Test
            </List.Item>
          )}
        />
      </AnnouncementListContainer>
    </AnnouncementWrapper>
  );
};

export default Announcement;
