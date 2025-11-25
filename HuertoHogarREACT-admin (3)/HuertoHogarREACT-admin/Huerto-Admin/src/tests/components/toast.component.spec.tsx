import { render, fireEvent, cleanup } from '@testing-library/react';
import { Toast } from '../../components/Toast';

describe('Component - Toast', () => {
  afterEach(() => cleanup());

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    const { getByRole, queryByText } = render(<Toast message="Cerrar" onClose={onClose} duration={10000} />);

    const btn = getByRole('button');
    fireEvent.click(btn);

    expect(onClose).toHaveBeenCalled();
    expect(queryByText('Cerrar')).toBeNull();
  });
});
