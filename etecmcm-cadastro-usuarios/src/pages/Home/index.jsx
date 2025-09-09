import './style.css'
import Lixeira from '../../assets/lixeira.png'

function Home() {
  const usuarios = [
  {
    id: 'jhfdjhjsdhfjh',
    nome: 'Teste',
    idade: 30,
    email: 'teste@email.com'
  },
  {
    id: '1374878ehhwe',
    nome: 'Aline',
    idade: 28,
    email: 'aline@email.com'
  }
]

  return (
    <div className='container'>
  <form>
    <h1>Cadastro de Usuários</h1>
    <input name='nome' type='text' />
    <input name='idade' type='number' />
    <input name='email' type='email' />
    <button type='button'>Cadastrar</button>
  </form>
  {usuarios.map(usuario => (
    <div key={usuario.id} className='card'>
    
    <div>
      <p>Nome: {usuario.nome}</p>
      <p>Idade: {usuario.idade}</p>
      <p>Email: {usuario.email}</p>
    </div>
    <button>
      <img src={Lixeira} />
    </button>
  </div>
))}


  <div>
    <div>
      <p>Nome: </p>
      <p>Idade: </p>
      <p>Email: </p>
    </div>
    <button>
       <img src={Lixeira}/>
    </button>
  </div>
</div>

    
    
  )
}


export default Home
