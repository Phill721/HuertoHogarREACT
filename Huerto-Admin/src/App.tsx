import { useState } from 'react';
import './styles/navbar.css';

function App() {
  const [paginaActual, setPaginaActual] = useState('admin'); // Página por defecto

  const renderPagina = () => {
    switch(paginaActual) {
      case 'admin':
        return <div>Página Admin - Próximamente</div>;
      case 'productos-admin':
        return <div>Página Productos Admin - Próximamente</div>;
      case 'usuarios':
        return <div>Página Usuarios - Próximamente</div>;
      case 'ventas':
        return <div>Página Ventas - Próximamente</div>;
      default:
        return <div>Página Admin - Próximamente</div>;
    }
  }

  return (
    <div className="App">
      <nav style={{ padding: '20px', background: '#f0f0f0', marginBottom: '20px' }}>
        <button onClick={() => setPaginaActual('admin')} style={{ margin: '5px' }}>Admin</button>
        <button onClick={() => setPaginaActual('productos-admin')} style={{ margin: '5px' }}>Productos</button>
        <button onClick={() => setPaginaActual('usuarios')} style={{ margin: '5px' }}>Usuarios</button>
        <button onClick={() => setPaginaActual('ventas')} style={{ margin: '5px' }}>Ventas</button>
      </nav>
      
      <main>
        {renderPagina()}
      </main>

      <footer style={{ marginTop: '50px', padding: '20px', background: '#333', color: 'white' }}>
        Panel de Administración - Próximamente
      </footer>
    </div>
  );
}

export default App;