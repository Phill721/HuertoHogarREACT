import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { currentUser } = useContext(UserContext);

  const isDomainAdmin = currentUser?.correo?.endsWith('@profesor.duoc.cl');
  const isRoleAdmin = currentUser?.rol === 'admin';

  if (!currentUser || !(isDomainAdmin || isRoleAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAdmin;
