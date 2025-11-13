import { render, cleanup } from '@testing-library/react';
import { Tabla } from '../../components/Tabla';

describe('Snapshot - Tabla', () => {
  afterEach(() => cleanup());

  it('renders table with 2 rows snapshot', () => {
    const data = [
      { id: '1', nombre: 'A', categoria: 'x', precio: 100, stock: 1, activo: true },
      { id: '2', nombre: 'B', categoria: 'y', precio: 200, stock: 2, activo: false }
    ];

    const cols = [
      { key: 'nombre' as any, header: 'Nombre' },
      { key: 'precio' as any, header: 'Precio' }
    ];

    const { container } = render(<Tabla data={data} cols={cols} /> as any);
    const html = container.querySelector('table')!.outerHTML.replace(/\s+/g, ' ').trim();

    // Simple stable assertion: table contains header and two rows
    expect(html.includes('Nombre')).toBeTruthy();
    expect((html.match(/<tr/g) || []).length).toBeGreaterThanOrEqual(3); // header + 2 rows
  });
});
