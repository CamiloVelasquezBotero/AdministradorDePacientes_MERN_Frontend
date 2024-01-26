import { useContext } from 'react'; 
import AuthContext from '../context/AuthProvider';

// CUSTOM HOOK
const useAuth = () => {
    return useContext(AuthContext); 
}

export default useAuth;

