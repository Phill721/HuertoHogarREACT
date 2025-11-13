import { render, cleanup } from '@testing-library/react';
import ProductosAdmin from '../../pages/ProductosAdmin';
import * as storage from '../../data/storage';
import { MOCK_PRODUCTOS } from '../../data/mock';

describe('Snapshot - ProductosAdmin', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('renders list with mock productos', () => {
    // Ensure storage returns known data
    vi.spyOn(storage, 'getProductos').mockReturnValue(MOCK_PRODUCTOS as any);

    const { container } = render(<ProductosAdmin /> as any);
    const html = container.innerHTML.replace(/\s+/g, ' ').trim();

    // Expect cards and table title to be present
    expect(html.includes('Gestión de Productos')).toBeTruthy();
    expect(html.includes('Lista de Productos')).toBeTruthy();
  });
});
