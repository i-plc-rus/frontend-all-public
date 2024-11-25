import { categoryHandlers } from '@/entities/category';
import { transactionHandlers } from '@/entities/transaction';
import { setupWorker } from 'msw/browser';

const apiMockWorker = setupWorker(...categoryHandlers, ...transactionHandlers);

export async function startApiMockWorker() {
  await apiMockWorker.start({
    onUnhandledRequest(request, print) {
      const url = new URL(request.url);

      if (/\.png|jpg|svg|tsx?|css|jsx?|woff2$/.test(url.pathname)) {
        return;
      }

      print.warning();
    },
  });
}
