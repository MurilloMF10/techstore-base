# Requisitos da TechStore

Última atualização: março de 2026

## Loja

* A página inicial lista todos os produtos do catálogo.
* O cliente pode filtrar os produtos por categoria.
* Cada produto é exibido em um card com imagem, nome, avaliação e preço.
* Clicar no card abre a página do produto.

## Produtos esgotados

* Produtos sem unidades em estoque não aparecem na loja, mas continuam disponíveis por link direto e na área interna.
* A página de produto esgotado permite solicitar aviso de reposição com nome e e-mail.
* Solicitações são deduplicadas por e-mail e produto e ficam no armazenamento local do navegador.

## Produtos sem preço

* Produtos sem preço definido não podem ser vendidos.

## Página do produto

* Exibe imagem, nome, avaliação, preço, descrição e unidades disponíveis.
* Exibe até 4 produtos relacionados da mesma categoria.

## Carrinho

* Lista os produtos adicionados, com a quantidade de cada um.
* Permite remover unidades.
* Permite aplicar cupons de desconto.
* Exibe o total da compra.
* Produtos sem preço válido não podem ser adicionados ao carrinho.
* O frete grátis é concedido quando o total após descontos ultrapassa R$ 200; o carrinho informa o valor que falta.
* Os cards da loja, relacionados e sugestões usam o mesmo componente visual.
