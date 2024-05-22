import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  List,
  Space,
  UploadFile,
  message,
} from 'antd';
import {
  ActionsWrapper,
  FormWrapper,
  HeaderWithButton,
  MessageWrapper,
  MessagetHeader,
  ReplyFormContainer,
  ReplyFormWrapper,
  StyledList,
  Wrapper,
} from './elements';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  SendOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Message as MessageDTO,
  MessageThreadResponse,
  MessageType,
  ReplyMessageParams,
} from '@/core/domain/dto/message.dto';
import { useGlobalState } from '@/hooks/global';
import { BACKEND_URL } from '@/config';
import { useEffect, useState } from 'react';
import { StyledTextArea } from '@/features/announcement/components/elements';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageValidationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorWrapper } from '@/features/account/components/elements';
import { formatDate } from '@/utils/format';
import Upload, { RcFile } from 'antd/es/upload';

type Props = {
  messageThread: MessageThreadResponse;
  isFetchingThread?: boolean;
  sendMessage: (data: ReplyMessageParams) => void;
  isSendingMessage?: boolean;
  isSendingSuccess?: boolean;
};

const Message = ({
  messageThread,
  isFetchingThread,
  sendMessage,
  isSendingMessage,
  isSendingSuccess,
}: Props) => {
  const {
    useAuth: { id, avatar },
  } = useGlobalState();
  const { id: messageThreadId } = useParams();
  const navigate = useNavigate();
  const [showReply, setShowReply] = useState<boolean>(false);
  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      description: '',
    },
    resolver: yupResolver(messageValidationSchema),
  });

  const handleBeforeUploadFile = (_: RcFile, fileList: RcFile[]) => {
    setDocumentFiles([...documentFiles, ...fileList]);
    return false;
  };

  const handleOnRemoveFile = (file: UploadFile) => {
    const index = documentFiles.indexOf(file);
    const newDocumentFiles = documentFiles.slice();
    newDocumentFiles.splice(index, 1);
    setDocumentFiles(newDocumentFiles);
  };

  const onHandleSubmitReply = ({ description }: { description: string }) => {
    const payload: ReplyMessageParams = {
      message: description,
      send_from_id: id,
      to_id:
        messageThread.user_one_id === id
          ? messageThread.user_two_id
          : messageThread.user_one_id,
      type: MessageType.SENT,
      message_thread_id: messageThreadId || '',
      attachment: documentFiles,
    };

    sendMessage(payload);
  };

  useEffect(() => {
    if (isSendingSuccess) {
      reset();
      setShowReply(false);
      setDocumentFiles([]);
    }
  }, [isSendingSuccess]);

  return (
    <MessageWrapper>
      <MessagetHeader>
        <HeaderWithButton>
          <Button
            size="large"
            ghost
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined style={{ color: 'black' }} />}
          />
          <h1>{messageThread?.subject}</h1>
        </HeaderWithButton>
      </MessagetHeader>

      <Wrapper>
        <StyledList
          bordered
          itemLayout="vertical"
          dataSource={messageThread?.messages as MessageDTO[]}
          loading={isFetchingThread}
          renderItem={(item) => (
            <List.Item
              extra={
                <small>{formatDate(item.sent_at, 'MMM DD, YYYY, h:mmA')}</small>
              }>
              <List.Item.Meta
                title={`${item.send_from?.first_name} ${item.send_from?.last_name}`}
                avatar={
                  <Avatar
                    src={
                      `${BACKEND_URL}/${item.send_from?.profile_picture}` || ''
                    }
                    alt="avatar"
                  />
                }
                description={item.send_from?.email}
              />
              <div>
                <div>
                  <p>{item.message}</p>
                </div>
                {item.attachment && item.attachment?.length > 0 && (
                  <>
                    <Divider />
                    <div>
                      <h4>Attachments</h4>
                      <Space direction="vertical">
                        {item.attachment.map((file, index) => (
                          <a
                            key={index}
                            href={`${BACKEND_URL}/${file}`}
                            target="_blank"
                            rel="noreferrer">
                            {file.replace('message_attachments/', '')}
                          </a>
                        ))}
                      </Space>
                    </div>
                  </>
                )}
              </div>
            </List.Item>
          )}
        />

        <ActionsWrapper>
          {!showReply && !isFetchingThread && (
            <Button
              size="large"
              icon={<SendOutlined />}
              onClick={() => setShowReply(true)}
              type="primary">
              Reply
            </Button>
          )}

          {showReply && (
            <ReplyFormContainer>
              <ReplyFormWrapper>
                <div>
                  <Avatar src={`${BACKEND_URL}/${avatar}` || ''} alt="avatar" />
                </div>
                <FormWrapper>
                  <Form layout="vertical">
                    <ErrorMessage
                      errors={errors}
                      name="description"
                      render={({ message }) => (
                        <ErrorWrapper>{message}</ErrorWrapper>
                      )}
                    />
                    <Controller
                      name="description"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Item>
                          <StyledTextArea
                            onChange={onChange}
                            value={value}
                            rows={6}
                            status={errors.description ? 'error' : ''}
                          />
                        </Form.Item>
                      )}
                    />

                    <Form.Item label="Attachments" name="files">
                      <Upload
                        fileList={documentFiles}
                        multiple
                        beforeUpload={handleBeforeUploadFile}
                        onRemove={handleOnRemoveFile}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Form>
                </FormWrapper>
              </ReplyFormWrapper>
              <ReplyFormWrapper style={{ marginTop: '0' }}>
                <span style={{ width: '32px' }}></span>
                <Button
                  loading={isSendingMessage}
                  size="large"
                  onClick={handleSubmit(onHandleSubmitReply)}
                  type="primary">
                  Send
                </Button>
                <Button
                  loading={isSendingMessage}
                  icon={<DeleteOutlined />}
                  size="large"
                  onClick={() => setShowReply(false)}>
                  Cancel
                </Button>
              </ReplyFormWrapper>
            </ReplyFormContainer>
          )}
        </ActionsWrapper>
      </Wrapper>
    </MessageWrapper>
  );
};

export default Message;
