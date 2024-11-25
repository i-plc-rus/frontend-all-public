import { appStore } from '@/app/appStore';
import { REQUIRED_MESSAGE } from '@/shared/lib';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { CreateCategoryForm } from './CreateCategoryForm';

const wrapper = (children: ReactNode) => {
  return <Provider store={appStore}>{children}</Provider>;
};
function setup(jsx: ReactNode) {
  return {
    ...render(wrapper(jsx)),
  };
}

describe('CreateCategoryForm', () => {
  test('renders form fields correctly', () => {
    setup(<CreateCategoryForm />);

    expect(screen.getByLabelText(/Category name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category budget/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\+ Add category/i })).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    setup(<CreateCategoryForm />);

    const nameField = screen.getByLabelText('Category name');
    const budgetField = screen.getByLabelText('Category budget');

    fireEvent.change(nameField, { target: { value: '' } });
    fireEvent.change(budgetField, { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /\+ Add category/i }));

    expect(await screen.findAllByText(REQUIRED_MESSAGE)).toHaveLength(2);
  });

  test('validates budget', async () => {
    setup(<CreateCategoryForm />);

    const budgetField = screen.getByLabelText('Category budget');

    fireEvent.change(budgetField, { target: { value: '-1' } });
    fireEvent.click(screen.getByRole('button', { name: /\+ Add category/i }));

    expect(await screen.findByText('Budget must be greater than 0')).toBeInTheDocument();
  });
});
