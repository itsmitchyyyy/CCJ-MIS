import { Form, Space, TableProps } from 'antd';
import { ErrorWrapper, StyledTable, StyledTextArea } from './elements';
import {
  FetchDocumentRequestsResponseDTO,
  UpdateDocumentRequestDTO,
} from '@/core/domain/dto/document.dto';
import { DocumentStatus } from '../types';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/config';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { rejectedValidationSchema } from './validation';
import { Modal } from '@/components/Elements/Modal';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  isFetchingDocumentRequests?: boolean;
  documentRequests: FetchDocumentRequestsResponseDTO[];
  isUpdatingDocumentRequest?: boolean;
  isUpdateDocumentRequestSuccess?: boolean;
  onUpdateDocumentRequest: (data: {
    id: string;
    params: UpdateDocumentRequestDTO;
  }) => void;
};

const RequestList = ({
  isFetchingDocumentRequests,
  documentRequests,
  isUpdatingDocumentRequest,
  isUpdateDocumentRequestSuccess,
  onUpdateDocumentRequest,
}: Props) => {
  const [selectedRequest, setSelectedRequest] =
    useState<FetchDocumentRequestsResponseDTO | null>(null);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);

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
        render: (_, record) => (
          <a
            href={`${BACKEND_URL}/${record.document.file_path}`}
            download
            target="_blank">
            {record.document.name}
          </a>
        ),
      },
      {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a
              onClick={() =>
                onUpdateDocumentRequest({
                  id: record.id,
                  params: { status: DocumentStatus.Approved },
                })
              }>
              Approve
            </a>
            <a
              onClick={() => {
                setSelectedRequest(record);
                setIsRejectModalVisible(true);
              }}>
              Reject
            </a>
          </Space>
        ),
      },
    ];

  const {
    control: controlRejection,
    handleSubmit: handleSubmitRejection,
    formState: { errors: errorsRejection },
    reset: resetRejection,
  } = useForm({
    resolver: yupResolver(rejectedValidationSchema),
    defaultValues: {
      rejected_reason: '',
    },
  });

  const onHandleSubmitRejectReason = (data: { rejected_reason: string }) => {
    const payload: UpdateDocumentRequestDTO = {
      ...data,
      status: DocumentStatus.Rejected,
    };

    onUpdateDocumentRequest({
      id: selectedRequest?.id || '',
      params: payload,
    });
  };

  useEffect(() => {
    if (isUpdateDocumentRequestSuccess) {
      setSelectedRequest(null);
      setIsRejectModalVisible(false);
      resetRejection();
    }
  }, [isUpdateDocumentRequestSuccess]);

  return (
    <div>
      <h2>Documents Request</h2>

      <StyledTable
        columns={TableColumnData}
        rowKey="id"
        loading={isFetchingDocumentRequests || isUpdatingDocumentRequest}
        dataSource={documentRequests}
      />

      <Modal
        isLoading={isUpdatingDocumentRequest}
        open={isRejectModalVisible}
        title="Rejection Reason"
        onCancel={() => {
          setSelectedRequest(null);
          setIsRejectModalVisible(false);
        }}
        onSubmit={handleSubmitRejection(onHandleSubmitRejectReason)}>
        <Form layout="vertical">
          <ErrorMessage
            name="rejected_reason"
            errors={errorsRejection}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={controlRejection}
            name="rejected_reason"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Reason">
                <StyledTextArea
                  value={value}
                  rows={5}
                  cols={5}
                  onChange={onChange}
                  placeholder="Enter rejection reason"
                  status={errorsRejection.rejected_reason && 'error'}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default RequestList;
