import { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom'; 
import Alerta from '../components/Alerta'; 
import clienteAxios from '../config/axios'; 

const NuevoPassword = () => {
  const [password, setPassword] = useState(''); 
  const [alerta, setAlerta] = useState({}); 
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams(); 
  const { token } = params; 

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`); 
        setAlerta({
          msg: 'Coloca tu nuevo Password', 
          alerta: false
        });
        setTokenValido(true); 
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error en el enlace',
          error: true
        });
      }
    }
    comprobarToken(); 
  }, []) 

  const { msg } = alerta; 

  const handleSubmit = async e => { 
    e.preventDefault(); 

    if(password.length < 6) {
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password }); 

      setAlerta({ 
        msg: data.msg,
        error: false
      })

      setPasswordModificado(true); 
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu password y no pierdas acceso a tus {""} 
          <span className=" text-black"> Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { msg && <Alerta alerta={alerta} />} 
        { tokenValido && ( 
          <> 
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                <input type="password" placeholder="Tu password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                /> 
              </div>

              <input 
                type="submit" 
                value="Guardar Nuevo Password"
                className="bg-indigo-700 w-full px-10 py-3 rounded-xl text-white 
                uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              /> 
            </form>
            
            { passwordModificado && 
              <Link 
                className='block text-center my-5 text-gray-500' 
                to="/">Iniciar Sesion</Link>
            }
          </>
        )}
      
      </div>
    </>
  )
}

export default NuevoPassword