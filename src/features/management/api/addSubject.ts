import dependencies from '@/core/dependencies';
import { AddSubjectRequest } from '@/core/domain/dto/subject.dto';
import { ErrorMessageObject } from '@/features/account/types';
import { useGlobalState } from '@/hooks/global';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const addSubject = async (data: AddSubjectRequest): Promise<void> => {
  return await dependencies.subjectProvider.subjectRepository.addSubject(data);
};

const useAddSubject = () => {
  const {
    useSubject: { setSubjectError },
  } = useGlobalState();

  const query = useMutation({
    mutationKey: ['addSubject'],
    onSuccess: () => {
      toast.success('Subject added');
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as ErrorMessageObject;
      const mappedErrorData = Object.keys(errorData.errors).map((key) => ({
        [key]: errorData.errors[key][0],
      }));

      const errors = mappedErrorData.reduce((arr, obj: any) => {
        const key = Object.keys(obj)[0];
        const value = Object.values(obj)[0];
        arr[key] = value;

        return arr;
      }, {});

      setSubjectError({ ...errorData, errors });
    },
    mutationFn: addSubject,
  });

  return query;
};

export { useAddSubject };
