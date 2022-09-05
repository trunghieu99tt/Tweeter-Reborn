/// <reference types="@welldone-software/why-did-you-render" />
// import './wdyr';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppProvider from '@context/app.context';

import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

import 'react-image-lightbox/style.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

import './i18.config';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AppProvider>
          <RecoilRoot>
            <HelmetProvider>
              <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                  <App />
                </QueryClientProvider>
              </Provider>
            </HelmetProvider>
          </RecoilRoot>
        </AppProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
