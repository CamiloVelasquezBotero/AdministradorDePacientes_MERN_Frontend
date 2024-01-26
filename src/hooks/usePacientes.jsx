import { useContext } from 'react'; 
import PacientesContext from '../context/PacientesProvider';

// CUSTOM HOOK
const usePacientes = () => {

    return useContext(PacientesContext); 
}

export default usePacientes;