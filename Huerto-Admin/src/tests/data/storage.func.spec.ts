import { getProductos, setProductos, initializeStorageData } from '../../data/storage';
import { MOCK_PRODUCTOS } from '../../data/mock';

describe('Funcional - storage', () => {
  beforeEach(() => localStorage.clear());

  it('getProductos initializes localStorage with mock when empty', () => {
    const productos = getProductos();
    expect(productos).toEqual(MOCK_PRODUCTOS as any);
    // localStorage should now contain key
    expect(localStorage.getItem('huerto_productos')).toBeTruthy();
  });

  it('setProductos persists and getProductos returns updated list', () => {
    const newItems = [{ id: 'x', nombre: 'X', categoria: 'verduras', precio: 10, stock: 1, activo: true }];
    setProductos(newItems as any);
    const read = getProductos();
    expect(read.length).toBe(1);
    expect(read[0].id).toBe('x');
  });

  it('initializeStorageData sets all keys', () => {
    localStorage.clear();
    initializeStorageData();
    expect(localStorage.getItem('huerto_productos')).toBeTruthy();
    expect(localStorage.getItem('huerto_usuarios')).toBeTruthy();
    expect(localStorage.getItem('huerto_ventas')).toBeTruthy();
  });
});
