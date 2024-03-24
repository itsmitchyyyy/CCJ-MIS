import DocumentRepositoryInterface from '@/core/usecases/ports/document.repository';

export interface IDocumentProvider {
  documentRepository: DocumentRepositoryInterface;
}

const documentProvider = ({
  documentRepository,
}: {
  documentRepository: DocumentRepositoryInterface;
}): IDocumentProvider => {
  return { documentRepository };
};

export default documentProvider;
