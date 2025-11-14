// src/huerto-admin/components/Tabla.tsx
type Col<T> = { 
  key: keyof T; 
  header: string; 
  render?: (row: T) => React.ReactNode;
  className?: string;
};

export function Tabla<T extends { id: string }>({
  data,
  cols,
  onEdit,
  onDelete,
  className = ''
}: {
  data: T[];
  cols: Col<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  className?: string;
}) {
  return (
    <div className="table-responsive">
      <table className={`table table-hover ${className}`}>
        <thead>
          <tr>
            {cols.map(c => (
              <th 
                key={String(c.key)} 
                className={c.className}
                style={{ 
                  backgroundColor: 'var(--accent-green)',
                  color: 'white',
                  fontWeight: '500'
                }}
              >
                {c.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th style={{ 
              backgroundColor: 'var(--accent-green)',
              color: 'white',
              fontWeight: '500'
            }}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.id} className="align-middle">
              {cols.map(c => (
                <td key={String(c.key)} className={c.className}>
                  {c.render ? c.render(r) : String(r[c.key])}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="text-end">
                  {onEdit && (
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onEdit(r)}
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                      <span className="ms-1 d-none d-md-inline">Editar</span>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        if (window.confirm('¿Está seguro de eliminar este elemento?')) {
                          onDelete(r);
                        }
                      }}
                      title="Eliminar"
                    >
                      <i className="fas fa-trash-alt"></i>
                      <span className="ms-1 d-none d-md-inline">Eliminar</span>
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center text-muted py-4">
          No hay datos para mostrar
        </div>
      )}
    </div>
  );
}
