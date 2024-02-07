import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <Row>
          <Col>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          </Col>
        </Row>
      }>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </React.Suspense>
  );
};
