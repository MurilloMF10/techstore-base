// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => {
    const preco = obterPrecoValido(produto)
    return preco === null ? total : total + preco
  }, 0)
}

export function obterPrecoValido(produto) {
  if (produto?.price === null || produto?.price === undefined || produto?.price === '') return null
  const preco = Number(produto.price)
  return Number.isFinite(preco) && preco >= 0 ? preco : null
}

export function calcularFreteGratis(total) {
  const limite = 200
  const valor = Number(total) || 0
  const falta = Math.max(0, Math.round((limite - valor + 0.01) * 100) / 100)
  return { atingido: valor > limite, falta: valor > limite ? 0 : falta }
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho.forEach((produto) => {
    const existente = itens.find((item) => item.produto.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })
  return itens
}
