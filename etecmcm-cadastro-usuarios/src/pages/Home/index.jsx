import './style.css'
import Lixeira from '../../assets/lixeira.png'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  const [editandoId, setEditandoId] = useState(null)

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputIdade = useRef()

  async function getUsuarios() {
    const usuariosDaApi = await api.get('/cadastro')
    setUsuarios(usuariosDaApi.data)
  }

  async function createUsuarios() {
    await api.post('/cadastro',{
      email: inputEmail.current.value,
      nome: inputNome.current.value,
      idade: inputIdade.current.value
    })
    limparInputs()
    getUsuarios()
  }

  async function deleteUsuarios(id) {
    await api.delete(`/cadastro/${id}`) 
    getUsuarios()   // 👈 agora atualiza a lista
  }

  async function updateUsuario(id) {
    await api.put(`/cadastro/${id}`, {
      email: inputEmail.current.value,
      nome: inputNome.current.value,
      idade: inputIdade.current.value
    })
    limparInputs()
    setEditandoId(null)
    getUsuarios()
  }

  function editar(usuario) {
    inputNome.current.value = usuario.nome
    inputEmail.current.value = usuario.email
    inputIdade.current.value = usuario.idade
    setEditandoId(usuario.id)
  }

  function limparInputs() {
    inputNome.current.value = ""
    inputEmail.current.value = ""
    inputIdade.current.value = ""
  }

  useEffect(() =>{
    getUsuarios()
  },[])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu Nome' name="nome" type="text" ref={inputNome}/>
        <input placeholder='Digite sua Idade' name="idade" type="number" ref={inputIdade}/>
        <input placeholder='Digite seu Email' name="email" type="email" ref={inputEmail}/>
        
        {editandoId ? (
          <button type='button' onClick={() => updateUsuario(editandoId)}>Atualizar</button>
        ) : (
          <button type='button' onClick={createUsuarios}>Cadastrar</button>
        )}
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: {usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <p>Email: {usuario.email}</p>
          </div>
          <button onClick={()=> deleteUsuarios(usuario.id)}>
            <img src={Lixeira} alt="Deletar" style={{ width: '40px', height: '40px' }} />
          </button>
          <button onClick={() => editar(usuario)}>Editar</button>
        </div>
      ))}
    </div>
  )
}

export default Home
