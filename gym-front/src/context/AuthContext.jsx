import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Importar prop-types


export const AuthContext = createContext();

export const useAuth = () => {
const context = useContext(AuthContext)
if(!context) {
    throw new Error("Error")
}
return context;

}


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({}); 
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [logeado, setLogeado] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logeado,setLogeado }}>
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validar que children sea un nodo React
};
