import { render, cleanup } from '@testing-library/react';
import { Loader } from '../../components/Loader';

describe('Component - Loader', () => {
  afterEach(() => cleanup());

  it('renders default medium size spinner', () => {
    const { getByRole } = render(<Loader /> as any);
    const spinner = getByRole('status');
    expect(spinner).toBeTruthy();
    // Check style width exists
    const width = (spinner as HTMLElement).style.width;
    expect(width).toBeTruthy();
  });
});
