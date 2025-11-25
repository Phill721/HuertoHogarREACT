import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';

describe('Snapshot - AdminLayout', () => {
  afterEach(() => cleanup());

  it('renders sidebar links and topbar', () => {
    const { container, getByText } = render(
      <MemoryRouter initialEntries={["/admin"]}>
        <AdminLayout />
      </MemoryRouter>
    );

    // Sidebar links
    expect(getByText('Panel Principal')).toBeTruthy();
    expect(getByText('Productos')).toBeTruthy();
    expect(getByText('Usuarios')).toBeTruthy();

    // Topbar header exists
    expect(container.querySelector('.topbar')).toBeTruthy();
  });
});
