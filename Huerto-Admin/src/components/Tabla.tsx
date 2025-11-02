// src/huerto-admin/components/Tabla.tsx
type Col<T> = { key: keyof T; header: string; render?:(row:T)=>React.ReactNode };
export function Tabla<T extends { id:string }>({
  data, cols, onEdit, onDelete,
}:{ data:T[]; cols:Col<T>[]; onEdit?:(row:T)=>void; onDelete?:(row:T)=>void }) {
  return (
    <table className="table table-striped">
      <thead><tr>{cols.map(c=> <th key={String(c.key)}>{c.header}</th>)}<th>Acciones</th></tr></thead>
      <tbody>
        {data.map(r=>(
          <tr key={r.id}>
            {cols.map(c=> <td key={String(c.key)}>{c.render?c.render(r):String(r[c.key])}</td>)}
            <td className="text-end">
              {onEdit && <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>onEdit(r)}>Editar</button>}
              {onDelete && <button className="btn btn-sm btn-outline-danger" onClick={()=>onDelete(r)}>Eliminar</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
