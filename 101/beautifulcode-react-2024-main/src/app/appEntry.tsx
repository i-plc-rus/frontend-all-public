import '@/shared/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import { appStore } from './appStore';

async function initApp() {
  const module = await import('@/app/apiMockWorker');
  await module.startApiMockWorker();
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

void initApp().then(() => {
  root.render(
    <StrictMode>
      <Provider store={appStore}>
        <RouterProvider router={appRouter()} />
      </Provider>
    </StrictMode>,
  );
});
