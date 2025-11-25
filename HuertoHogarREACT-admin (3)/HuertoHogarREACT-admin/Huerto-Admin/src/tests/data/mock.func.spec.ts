import { MOCK_VENTAS } from '../../data/mock';

describe('Funcional - mock data', () => {
  it('each venta total equals sum of detalles subtotals', () => {
    for (const v of MOCK_VENTAS) {
      const suma = v.detalles.reduce((s, d) => s + d.subtotal, 0);
      expect(v.total).toBe(suma);
    }
  });
});
