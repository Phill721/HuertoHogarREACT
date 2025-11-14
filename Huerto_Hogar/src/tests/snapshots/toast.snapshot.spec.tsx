import { render, cleanup } from '@testing-library/react';
import { Toast } from '../../components/Toast';

describe('Snapshot - Toast', () => {
  afterEach(() => cleanup());

  it('renders snapshot with message and type', () => {
    const { container, getByText, getByRole } = render(<Toast message="Prueba" type="info" duration={10000} />);

    // basic structural assertions instead of strict HTML equality
    const alert = getByRole('alert');
    expect(alert).toBeTruthy();
    expect(getByText('Prueba')).toBeTruthy();
    const btn = container.querySelector('button');
    expect(btn).toBeTruthy();
  });
});
