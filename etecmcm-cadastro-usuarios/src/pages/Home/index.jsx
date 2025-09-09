import './style.css'
import Lixeira from '../../assets/lixeira.png'
import api from '../../services/api'
import { useEffect  } from 'react'

function Home() {
  
  let usuarios = []

  async function getUsuarios(){
    usuarios = await api.get('/cadastro')
    console.log(usuarios)
  }

  useEffect(()=>{
    getUsuarios()
  },[])


  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type='text' placeholder='Nome' />
        <input name='idade' type='number' placeholder='Idade' />
        <input name='email' type='email' placeholder='Email' />
        <button type='button'>Cadastrar</button>
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div className='card-info'>
            <p>Nome: <span>{usuario.nome}</span></p>
            <p>Idade: <span>{usuario.idade}</span></p>
            <p>Email: <span>{usuario.email}</span></p>
          </div>
          <button className='delete-btn'>
            <img src={Lixeira} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
