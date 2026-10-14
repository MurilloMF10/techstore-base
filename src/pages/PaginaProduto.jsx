import { useState } from 'react'
import { Link, useParams } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { obterPrecoValido } from '../utils/carrinho'
import { formatarPreco } from '../utils/formatarPreco'
import { registrarAvisoReposicao } from '../services/avisosReposicao'

export default function PaginaProduto({ produtos, onAdicionar }) {
  const { id } = useParams()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const produto = produtos.find((item) => item.id === id)

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const relacionados = produtos
    .filter((item) => item.category === produto.category && item.id !== produto.id)
    .slice(0, 4)

  function solicitarAviso(evento) {
    evento.preventDefault()
    if (!nome.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMensagem('Informe seu nome e um e-mail válido.')
      return
    }
    try {
      registrarAvisoReposicao({ produtoId: produto.id, nome, email })
      setMensagem('Solicitação registrada! Avisaremos quando houver reposição.')
      setNome('')
      setEmail('')
    } catch (erro) {
      setMensagem(erro.message || 'Não foi possível registrar sua solicitação.')
    }
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">{obterPrecoValido(produto) !== null ? formatarPreco(produto.price) : 'Preço indisponível'}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>

          {produto.estoque > 0 ? <button
            className="botao botao-grande"
            onClick={() => onAdicionar(produto)}
            disabled={obterPrecoValido(produto) === null}
          >
            Adicionar ao carrinho
          </button> : <form className="form-aviso" onSubmit={solicitarAviso}>
            <h2>Avise-me quando voltar</h2>
            <label className="rotulo" htmlFor="aviso-nome">Nome</label>
            <input id="aviso-nome" required value={nome} onChange={(evento) => setNome(evento.target.value)} />
            <label className="rotulo" htmlFor="aviso-email">E-mail</label>
            <input id="aviso-email" required type="email" value={email} onChange={(evento) => setEmail(evento.target.value)} />
            <button className="botao botao-grande">Solicitar aviso</button>
            {mensagem && <p className="aviso">{mensagem}</p>}
            <small>Solicitações salvas neste navegador.</small>
          </form>}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />)}
      </div>
    </section>
  )
}
