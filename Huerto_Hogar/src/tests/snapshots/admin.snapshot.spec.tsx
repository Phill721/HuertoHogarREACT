import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Admin from '../../pages/Admin';

// Mock services to avoid real HTTP requests during the snapshot/unit test
vi.mock('../../services/productoService', () => ({
  default: { getAll: async () => [{ id: 1, nombre: 'Mock', activo: true }] }
}));
vi.mock('../../services/usuarioService', () => ({
  default: { getAll: async () => [{ id: 1, nombre: 'User', activo: true }] }
}));
vi.mock('../../services/ventaService', () => ({
  default: { getAll: async () => [{ id: 1, fecha: new Date().toISOString(), total: 100 }] }
}));

// Mock react-icons to avoid rendering issues in test environment
vi.mock('react-icons/fa', () => ({
  FaBox: () => React.createElement('span', { 'data-testid': 'icon-FaBox' }),
  FaUsers: () => React.createElement('span', { 'data-testid': 'icon-FaUsers' }),
  FaShoppingCart: () => React.createElement('span', { 'data-testid': 'icon-FaShoppingCart' }),
  FaChartLine: () => React.createElement('span', { 'data-testid': 'icon-FaChartLine' }),
}));

// Admin imports Link from 'react-router' (not 'react-router-dom') — mock it so Link works in tests
vi.mock('react-router', () => ({
  Link: (props: any) => React.createElement('a', { href: props.to || '#', children: props.children }),
}));

describe('Snapshot - Admin', () => {
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('renders main headings and estadísticas básicas', async () => {
    const { container, findByText } = render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    // Presencia de títulos principales (están en el markup inicial)
    expect(await findByText('Panel de Administración')).toBeTruthy();
    expect(await findByText('Accesos Rápidos')).toBeTruthy();

    // Comprobación simple en HTML para estadísticas (etiquetas estáticas)
    const html = container.innerHTML.replace(/\s+/g, ' ').trim();
    expect(html.includes('Productos Activos')).toBeTruthy();
    expect(html.includes('Usuarios Activos')).toBeTruthy();
  });
});
