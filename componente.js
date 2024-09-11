class ProdutoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const id = this.getAttribute('id');
        const imagem = this.getAttribute('imagem');
        const nome = this.getAttribute('nome');
        const precoOriginal = this.getAttribute('preco-original');
        const precoDesconto = this.getAttribute('preco-desconto');
        const parcelamento = this.getAttribute('parcelamento');

        this.shadowRoot.innerHTML = `
            <style>
                .produto-card {
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 15px;
                    text-align: center;
                    margin: 10px;
                }

                .produto-imagem {
                    max-width: 100%;
                    height: auto;
                }

                .produto-titulo {
                    font-size: 1.25em;
                    font-weight: bold;
                    margin: 10px 0;
                }

                .preco-original {
                    text-decoration: line-through;
                    color: red;
                }

                .preco-desconto {
                    font-size: 1.5em;
                    color: green;
                }

                .parcelamento {
                    font-size: 0.875em;
                    color: #555;
                }

                .link-detalhes {
                    display: block;
                    margin-top: 10px;
                    color: white;
                    background-color: #EF4D5C;
                    padding: 10px;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
            <div class="produto-card">
                <img class="produto-imagem" src="${imagem}" alt="${nome}" width="200" height="100">
                <div class="produto-titulo">${nome}</div>
                <div class="preco-original">De: R$${parseFloat(precoOriginal).toFixed(2)}</div>
                <div class="preco-desconto">Por: R$${parseFloat(precoDesconto).toFixed(2)}</div>
                ${parcelamento ? `<div class="parcelamento">${parcelamento}</div>` : ''}
                <a href="detalhes.html?id=${id}" class="link-detalhes">Ver Detalhes</a>
            </div>
        `;
    }
}

customElements.define('produto-item', ProdutoItem);

async function renderizarProdutos() {
    const apiUrl = "http://localhost:3000/produtos";
    
    try {
        const response = await fetch(apiUrl);
        const produtos = await response.json();

        const produtosContainer = document.getElementById('produtos-container');
        produtosContainer.innerHTML = '';

        produtos.forEach(produto => {
            const produtoItem = document.createElement('produto-item');
            produtoItem.setAttribute('id', produto.id);
            produtoItem.setAttribute('imagem', produto.imagem);
            produtoItem.setAttribute('nome', produto.nome);
            produtoItem.setAttribute('preco-original', produto.preco_original);
            produtoItem.setAttribute('preco-desconto', produto.preco_desconto);
            produtoItem.setAttribute('parcelamento', produto.parcelamento || '');
            
            produtosContainer.appendChild(produtoItem);
        });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}

document.addEventListener('DOMContentLoaded', renderizarProdutos);
