import { render, cleanup } from '@testing-library/react';
import Admin from '../../pages/Admin';

describe('Snapshot - Admin', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders main headings and estadísticas básicas', () => {
    const { container, getByText } = render(<Admin /> as any);

    // Presencia de títulos principales
    expect(getByText('Panel de Administración')).toBeTruthy();
    expect(getByText('Accesos Rápidos')).toBeTruthy();

    // Comprobación simple en HTML para estadísticas
    const html = container.innerHTML.replace(/\s+/g, ' ').trim();
    expect(html.includes('Productos Activos')).toBeTruthy();
    expect(html.includes('Usuarios Activos')).toBeTruthy();
  });
});
