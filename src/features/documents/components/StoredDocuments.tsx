import { AccessType } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { capitalizeStringWithSpace } from '@/utils/string';
import { FolderOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';

type Props = {
  storedDocuments: string[];
  isFetchingStoredDocuments?: boolean;
};

const StoredDocuments = ({
  storedDocuments,
  isFetchingStoredDocuments,
}: Props) => {
  console.log(storedDocuments);
  const {
    useAuth: { accessType },
  } = useGlobalState();

  return (
    <div>
      <h2>Stored Documents</h2>

      {accessType !== AccessType.Admin && (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
          dataSource={storedDocuments}
          renderItem={(item) => (
            <List.Item>
              <Button
                size="large"
                type="primary"
                style={{
                  width: '200px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                icon={<FolderOutlined />}>
                <span style={{ display: 'inline' }}>
                  {capitalizeStringWithSpace(item.replace(/_/g, ' '))}
                </span>
              </Button>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default StoredDocuments;
