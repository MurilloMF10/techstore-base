const CHAVE = 'techstore:avisos-reposicao'

export function buscarAvisosReposicao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE) || '[]')
  } catch {
    return []
  }
}

export function registrarAvisoReposicao({ produtoId, nome, email }) {
  const avisos = buscarAvisosReposicao()
  const emailNormalizado = email.trim().toLowerCase()
  if (avisos.some((aviso) => aviso.produtoId === produtoId && aviso.email.toLowerCase() === emailNormalizado)) {
    throw new Error('Este e-mail já está cadastrado para receber aviso deste produto.')
  }
  const novoAviso = { produtoId, nome: nome.trim(), email: email.trim(), criadoEm: new Date().toISOString() }
  localStorage.setItem(CHAVE, JSON.stringify([...avisos, novoAviso]))
  return novoAviso
}
