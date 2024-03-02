import { ToastContainerProps, ToastContainer } from 'react-toastify';

export const Toast = (props: ToastContainerProps) => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      theme="light"
      className="toast-container-cy"
      {...props}
    />
  );
};
