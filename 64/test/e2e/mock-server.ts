import express from 'express';
import cors from 'cors';

export interface MockRequestHandlerResult {
  data: any;
}
export interface MockServer {
  categoryMetadataHandler: () => MockRequestHandlerResult;
  transactionsHandler: (params: any) => MockRequestHandlerResult;
  transactionsAssert?: (query: any) => void;
  destroy(): Promise<void>;
  reset(): void;
}

export function setupMockServer(): Promise<MockServer> {
  return new Promise<MockServer>((resolve) => {
    const server = express();
    const port = 3001;
    server.use(cors());
    let serverInstance: ReturnType<typeof server.listen> | null = null;

    const defaultCategoryMetadataHandler = () => ({
      data: [
        {
          id: '1',
          text: 'Unspecified',
          iconUrl: ''
        },
        {
          id: '2',
          text: 'Restaurants',
          iconUrl: ''
        },
        {
          id: '3',
          text: 'Leisure',
          iconUrl: ''
        }
      ]
    });

    const defaultTransactionsHandler = () => ({
      data: [
        {
          id: '110001',
          amount: -120,
          category: '3',
          timestamp: 100
        },
        {
          id: '110002',
          amount: -4100,
          category: '2',
          timestamp: 101
        },
        {
          id: '5182',
          amount: 10600,
          category: '1',
          timestamp: 102
        }
      ]
    });

    const mockServer: MockServer = {
      categoryMetadataHandler: defaultCategoryMetadataHandler,
      transactionsHandler: defaultTransactionsHandler,
      destroy: () =>
        new Promise<void>((res, rej) => {
          serverInstance?.close((e) => (e ? rej(e) : res()));
          serverInstance = null;
        }),
      reset: () => {
        delete mockServer.transactionsAssert;
        mockServer.categoryMetadataHandler = defaultCategoryMetadataHandler;
        mockServer.transactionsHandler = defaultTransactionsHandler;
      }
    };

    server.get('/category-metadata', (req, res) => {
      const result = mockServer.categoryMetadataHandler();
      res.json(result.data);
    });

    server.get('/transactions', (req, res) => {
      mockServer.transactionsAssert?.(req.query);
      const result = mockServer.transactionsHandler(req.query);
      res.json(result.data);
    });

    serverInstance = server.listen(port, () => {
      resolve(mockServer);
    });
  });
}
