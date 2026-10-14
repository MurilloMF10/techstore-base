import { useEffect, useState } from 'react'
import { buscarAvisosReposicao } from '../services/avisosReposicao'

// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos }) {
  const [avisos, setAvisos] = useState(() => buscarAvisosReposicao())
  useEffect(() => {
    function atualizar() { setAvisos(buscarAvisosReposicao()) }
    window.addEventListener('storage', atualizar)
    window.addEventListener('focus', atualizar)
    return () => { window.removeEventListener('storage', atualizar); window.removeEventListener('focus', atualizar) }
  }, [])
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Avisos de reposição</h2>
      <p className="aviso">Os registros ficam armazenados neste navegador e não são compartilhados entre dispositivos.</p>
      {avisos.length === 0 ? <p className="aviso">Ainda não há solicitações.</p> : (
        <div className="tabela-moldura">
          <table className="tabela">
            <thead><tr><th>Produto</th><th>Cliente</th><th>E-mail</th></tr></thead>
            <tbody>{avisos.map((aviso, indice) => {
              const produto = produtos.find((item) => item.id === aviso.produtoId)
              return <tr key={`${aviso.produtoId}-${aviso.email}-${indice}`}><td>{produto?.title || aviso.produtoId}</td><td>{aviso.nome}</td><td>{aviso.email}</td></tr>
            })}</tbody>
          </table>
        </div>
      )}
    </section>
  )
}
