
class Shop {
  carrinho;
  render() {
    const renderHook = document.getElementById('app');
    this.carrinho = new CarrinhoCompras();
    const cartEl = this.carrinho.render();
    const produtosVenda = new ListaProdutos();
    const itensVendaEl = produtosVenda.render();
    renderHook.append(cartEl);
    renderHook.append(itensVendaEl);
  }
}

class CarrinhoCompras {
  itens = [];
  totalOutput;

  addProduct(produto) {
    const atualizar_itens = [...this.itens];
    atualizar_itens.push(produto);
    this.cartItems = atualizar_itens;
  }
  produtosEncomendados() {
    for(const show_itens of this.itens){
      console.log('========== Produto Encomendado ==========');
      for (const key in show_itens) {
          console.log(`${key} : ${show_itens[key]}`);
      }
    }
  }

  set cartItems(value) {
    this.itens = value;
    this.totalOutput.innerHTML = `<h2>\$${this.total.toFixed(2)}</h2>`;
  }

  get total() {
    const soma = this.itens.reduce((valor_anterior, valor_atual) => {
      return valor_anterior + valor_atual.preco;}, 0
      );
    return soma;
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
            <h2>Total: ${0}\$00</h2>
            <button>Encomendar</button>
        `;
    const orderButton = cartEl.querySelector("button");
    orderButton.addEventListener("click", this.produtosEncomendados.bind(this));
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}
class Produto {
  titulo = 'DEFAULT';
  imageURL;
  descricao;
  preco;

  constructor(titulo, imageURL, descricao, preco) {
    this.titulo = titulo;
    this.imageURL = imageURL;
    this.descricao = descricao;
    this.preco = preco;
  }
}

class ItemVenda {
  constructor(produto) {
    this.produto = produto;
  }

  addToCart() {
    App.addProductToCart(this.produto);
  }

  render() {
    const prodEl = document.createElement('li');

    prodEl.innerHTML = `
                <div><img src="${this.produto.imageURL}" alt="${this.produto.titulo}">
                  <div class="product-item__content">
                  <h2>${this.produto.titulo}</h2>
                  <h3>${this.produto.preco}\$00</h3>
                  <p>${this.produto.descricao}</p>
                  <button>Adicionar Cart</button></div>
              </div>
              `;
    prodEl.className = 'product-item';
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class App {
  static carrinho;
  static init() {
    const shop = new Shop();
    shop.render();
    this.carrinho = shop.carrinho;
  }
  static addProductToCart(produto) {
    this.carrinho.addProduct(produto);
  }
}

class ListaProdutos {
  produtos = [
    new Produto(
      'Laptop',
      'https://img.freepik.com/free-psd/digital-device-screen-mockup-vector-with-laptop-smartphone-with-gradient-wallpapers_53876-129214.jpg?t=st=1650013859~exp=1650014459~hmac=60a47c73333070750cc193e914bbd61a240d7dee79e68a40bfe4c457fd907318&w=740',
      'Laptop',
      500
    ),
    new Produto(
      'Mesa',
      'https://img.freepik.com/free-vector/wood-picnic-table-with-benches-wooden-furniture-white-background_107791-5536.jpg?w=740',
      'Uma mesa simples',
      50
    ),
  ];

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.produtos) {
      const itemVenda = new ItemVenda(prod);
      prodList.appendChild(itemVenda.render());
    }
    return prodList;
  }
}

// const shop = new Shop();
// shop.render();
App.init();
