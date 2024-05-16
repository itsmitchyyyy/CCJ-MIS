import { BACKEND_URL } from '@/config';
import { FetchDocumentRequestsResponseDTO } from '@/core/domain/dto/document.dto';
import { TableProps } from 'antd';
import { StyledTable } from './elements';
import { DocumentRequestStatus } from '../types';

type Props = {
  isFetchingDocumentRequests?: boolean;
  documentRequests: FetchDocumentRequestsResponseDTO[];
};

const MyRequestList = ({
  isFetchingDocumentRequests,
  documentRequests,
}: Props) => {
  const TableColumnData: TableProps<FetchDocumentRequestsResponseDTO>['columns'] =
    [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Requestor',
        key: 'requestor',
        render: (_, record) =>
          `${record.user.first_name} ${record.user.last_name}`,
      },
      {
        title: 'File',
        key: 'file',
        render: (_, record) =>
          record.status === DocumentRequestStatus.Approved ? (
            <a
              href={`${BACKEND_URL}/${record.document.file_path}`}
              download
              target="_blank">
              {record.document.name}
            </a>
          ) : (
            <a>{record.document.name}</a>
          ),
      },
      {
        title: 'Reason for requesting',
        dataIndex: 'reason',
        key: 'reason',
      },
      {
        title: 'Reason for rejecting',
        dataIndex: 'rejected_reason',
        key: 'rejected_reason',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
    ];

  return (
    <div>
      <h2>My Request</h2>

      <StyledTable
        columns={TableColumnData}
        rowKey="id"
        loading={isFetchingDocumentRequests}
        dataSource={documentRequests}
      />
    </div>
  );
};

export default MyRequestList;
