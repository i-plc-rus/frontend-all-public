import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CategoryForm from '../CategoryForm';

const mockStore = configureStore([]);

describe('CategoryForm component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      budget: {
        categories: [],
      },
    });
    store.dispatch = jest.fn();
  });

  test('submits form with category data', () => {
    render(
      <Provider store={store}>
        <CategoryForm />
      </Provider>
    );

    const nameInput = screen.getByLabelText('Category name');
    const budgetInput = screen.getByLabelText('Category budget');
    const submitButton = screen.getByText('Add Category');

    fireEvent.change(nameInput, { target: { value: 'Food' } });
    fireEvent.change(budgetInput, { target: { value: '300' } });
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: { name: 'Food', budget: 300 },
      })
    );
  });
});