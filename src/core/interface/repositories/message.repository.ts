import urls from '@/constants/urls';
import { MessageParams } from '@/core/domain/dto/message.dto';
import { HttpAdapter } from '@/core/usecases/ports/httpAdapter.interface';
import MessageRepositoryInterface from '@/core/usecases/ports/message.repository.interface';

export default class MessageRepository implements MessageRepositoryInterface {
  httpAdapter: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  sendMessage = async (data: MessageParams): Promise<void> => {
    const formData = new FormData();

    if (data.attachment) {
      data.attachment.forEach((file) => {
        formData.append('attachment[]', file as unknown as Blob);
      });
    }

    formData.append('to_id', data.to_id);
    formData.append('message', data.message);
    formData.append('send_from_id', data.send_from_id);
    formData.append('subject', data.subject);
    formData.append('type', data.type);

    return await this.httpAdapter.post(urls.messages.base, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };
}
