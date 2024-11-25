import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Balance from '../Balance';

const mockStore = configureStore([]);

describe('Balance component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      budget: {
        categories: [
          { id: 1, name: 'Food', budget: 300 },
          { id: 2, name: 'Entertainment', budget: 100 },
        ],
        transactions: [
          { id: 1, amount: 50, categoryId: 1 },
          { id: 2, amount: 30, categoryId: 2 },
        ],
      },
    });
  });

  test('renders balance correctly', () => {
    render(
      <Provider store={store}>
        <Balance />
      </Provider>
    );

    const balanceElement = screen.getByText(/\$320\.00/);
    expect(balanceElement).toBeInTheDocument();
  });
});