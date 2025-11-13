import { render, fireEvent, cleanup } from '@testing-library/react';
import { Tabla } from '../../components/Tabla';

describe('Component - Tabla actions', () => {
  afterEach(() => cleanup());

  it('calls onEdit when Edit button clicked and onDelete when confirmed', () => {
    const data = [{ id: '1', nombre: 'A', categoria: 'x', precio: 10, stock: 1, activo: true }];
    const cols = [{ key: 'nombre' as any, header: 'Nombre' }];
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    vi.spyOn(window, 'confirm').mockReturnValue(true);

    const { getByText } = render(<Tabla data={data} cols={cols} onEdit={onEdit as any} onDelete={onDelete as any} /> as any);

    const editBtn = getByText('Editar');
    fireEvent.click(editBtn);
    expect(onEdit).toHaveBeenCalled();

    const delBtn = getByText('Eliminar');
    fireEvent.click(delBtn);
    expect(onDelete).toHaveBeenCalled();
  });
});
