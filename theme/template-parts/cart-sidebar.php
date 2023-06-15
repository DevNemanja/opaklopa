<div class="cart-sidebar" data-module="CART_SIDEBAR">
  <div class="cart-sidebar__overlay"></div>
  <div class="cart-sidebar__sidebar">
    <button class="cart-sidebar__close-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" width="24px" height="24px">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h2 class="cart-sidebar__title">Vaša korpa</h2>
    <ul class="cart-sidebar__list">
      <!-- Populated via JS -->
    </ul>
    <div>
      <p>Sugestije:</p>
      <ul class="cart-sidebar__suggestion-list">
        <li>
          <button class="cart-sidebar__suggestion-button">
            <p class="cart-sidebar__suggestion-desc">Dodaj koka kolu</p>
            <img class="cart-sidebar__suggestion-img" src="https://online.idea.rs/images/products/473/473103763_1l.jpg?1677503729" alt="Koka kola" title="Dodaj Koka kolu">
          </button>
        </li>
          <button class="cart-sidebar__suggestion-button">
            <p class="cart-sidebar__suggestion-desc">Dodaj Pomfrit</p>
            <img class="cart-sidebar__suggestion-img" src="https://blog.kainexus.com/hubfs/French%20fries%202.jpeg" alt="Pomfrit" title="Dodaj pomfrit">
          </button>
        </li>
      </ul>
    </div>
    <button class="cart-sidebar__form-toggle">Vaši podaci</button>
    <form class="cart-sidebar__form">
      <div class="cart-sidebar__form-control">
        <input class="cart-sidebar__input writtable" placeholder="Ime i prezime" id="name" type="text">
      </div>
      <div class="cart-sidebar__form-control">
        <input class="cart-sidebar__input writtable" placeholder="Adresa" id="address" type="text">
      </div>
      <div class="cart-sidebar__form-control">
        <input class="cart-sidebar__input writtable" placeholder="Email" id="mail" type="mail">
      </div>
      <div class="cart-sidebar__form-control">
        <input class="cart-sidebar__input writtable" placeholder="Telefon" id="telefon" type="tel">
      </div>
      <div class="cart-sidebar__form-control">
        <textarea class="cart-sidebar__textarea writtable" placeholder="Poruka" id="poruka"></textarea>
      </div>
      <button class="cart-sidebar__submit-cart button">Naruči</button>
    </form>
  </div> 
</div>
