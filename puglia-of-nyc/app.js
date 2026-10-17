/* Original Puglia concept site — progressive, dependency-free interactions. */
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Navigation: mobile menu closes on selection, outside click, and Escape.
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#primary-navigation');
function closeNavigation() {
  if (!navToggle || !navigation) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
if (navToggle && navigation) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !navToggle.contains(event.target)) closeNavigation();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeNavigation();
  });
}

// Scroll progress and low-cost in-view reveals (native IntersectionObserver; no AOS runtime).
const progressBar = document.querySelector('#reading-progress-bar');
let progressQueued = false;
function updateProgress() {
  if (!progressBar) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
  progressBar.style.transform = `scaleX(${progress})`;
  progressQueued = false;
}
window.addEventListener('scroll', () => {
  if (!progressQueued) {
    progressQueued = true;
    window.requestAnimationFrame(updateProgress);
  }
}, { passive: true });
updateProgress();

const revealObserver = ('IntersectionObserver' in window && !reduceMotion.matches)
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -36px 0px' })
  : null;
function observeReveals(nodes = document.querySelectorAll('[data-reveal]')) {
  nodes.forEach(node => {
    if (!revealObserver) node.classList.add('is-visible');
    else revealObserver.observe(node);
  });
}
observeReveals();

// Menu catalogue transcribed from Puglia's public menu pages; prices are presented as published, not verified in-store.
const menuItems = [
  // Antipasto
  { name: 'Fried Calamari', price: '$15.75', category: 'antipasti', label: 'Antipasto' },
  { name: 'Baked Clams', price: '$14.00', category: 'antipasti', label: 'Antipasto' },
  { name: 'Mussels Marinara', price: '$16.00', category: 'antipasti', label: 'Antipasto' },
  { name: 'Mozzarella Sticks', price: '$10.00', category: 'antipasti', label: 'Antipasto' },
  { name: 'Fried Zucchini', price: '$14.00', category: 'antipasti', label: 'Antipasto' },
  { name: 'Mozzarella Caprese', price: '$16.95', description: 'Mozzarella, tomatoes and roasted peppers.', category: 'antipasti', label: 'Antipasto' },
  { name: 'House Calamari for 2', price: '$20.00', description: 'Roasted red peppers in a balsamic spicy sauce.', category: 'antipasti', label: 'Antipasto', highlight: true },
  { name: 'Rice Ball Angelina', price: '$14.00', description: 'Rice ball stuffed with chopped meat and peas, topped with ricotta in tomato sauce with Romano cheese cracker.', category: 'antipasti', label: 'Antipasto' },
  { name: 'Chicken Tenders', price: '$12.00', category: 'antipasti', label: 'Antipasto' },
  { name: 'Stuffed Mushrooms', price: '$12.00', category: 'antipasti', label: 'Antipasto' },
  { name: 'Garlic Bread (4)', price: '$5.25', category: 'antipasti', label: 'Antipasto' },
  { name: 'Bruschetta Bread (4)', price: '$9.00', category: 'antipasti', label: 'Antipasto' },
  { name: 'Potato Croquettes (3)', price: '$8.00', category: 'antipasti', label: 'Antipasto' },
  { name: 'Cold Antipasto', price: '$20.00', description: 'Assortment of Italian cold cuts.', category: 'antipasti', label: 'Antipasto' },

  // Insalate
  { name: 'Spinach Salad', price: '$12.95', description: 'Pancetta, walnut, shiitake mushrooms and golden raisins in a balsamic vinaigrette.', category: 'salads', label: 'Insalate' },
  { name: 'Arugula Salad', price: '$12.95', description: 'Wild arugula, grilled pears and Gorgonzola in a balsamic vinaigrette.', category: 'salads', label: 'Insalate' },
  { name: 'Mesculin Salad', price: '$12.95', description: 'Goat cheese, apples and oranges with raspberry vinaigrette.', category: 'salads', label: 'Insalate' },
  { name: 'Mixed Green Salad', price: '$8.50', category: 'salads', label: 'Insalate' },
  { name: 'Caesar Salad', price: '$10.00', category: 'salads', label: 'Insalate' },

  // Pasta, brodo
  { name: 'Fettuccine Alfredo', price: '$17.00', category: 'pasta', label: 'Pasta' },
  { name: 'Fettuccine Shrimp Alfredo', price: '$24.00', category: 'pasta', label: 'Pasta' },
  { name: 'Ravioli Marinara', price: '$17.00', category: 'pasta', label: 'Pasta' },
  { name: 'Mushroom Ravioli Alla Pesto', price: '$19.00', category: 'pasta', label: 'Pasta' },
  { name: 'Homemade Manicotti', price: '$16.00', category: 'pasta', label: 'Pasta' },
  { name: 'Homemade Spinach & Roasted Garlic Ravioli', price: '$18.00', description: 'Served in marinara sauce.', category: 'pasta', label: 'Pasta' },
  { name: 'Lobster Ravioli Alla Vodka', price: '$22.00', category: 'pasta', label: 'Pasta', highlight: true },
  { name: 'Whole Wheat Penne Primavera & Shrimp', price: '$23.00', description: 'In garlic and oil.', category: 'pasta', label: 'Pasta' },
  { name: 'Baked Rigatoni', price: '$16.00', category: 'pasta', label: 'Pasta' },
  { name: 'Gnocchi Bolognese', price: '$19.00', category: 'pasta', label: 'Pasta' },
  { name: 'Spaghetti Tomato Sauce', price: '$14.00', category: 'pasta', label: 'Pasta' },
  { name: 'Spaghetti with Meatballs', price: '$17.00', category: 'pasta', label: 'Pasta' },
  { name: 'Lasagna', price: '$18.00', category: 'pasta', label: 'Pasta' },
  { name: 'Linguine Red or White Clam Sauce', price: '$24.00', category: 'pasta', label: 'Pasta' },
  { name: "Puglia's Famous Rigatoni Alla Vodka", price: '$16.00', description: 'Add shrimp: $24.00.', category: 'pasta', label: 'Pasta', highlight: true },
  { name: 'Cavatelli with Sweet Sausage & Sautéed Broccoli Rabe', price: '$19.00', category: 'pasta', label: 'Pasta' },
  { name: 'Homemade Manicotti, Bolognese', price: '$19.00', description: 'Homemade manicotti stuffed with meat in a Bolognese sauce.', category: 'pasta', label: 'Pasta' },
  { name: 'Pasta e Fagioli', price: '$11.00', category: 'pasta', label: 'Brodo' },
  { name: 'Tortellini', price: '$11.00', category: 'pasta', label: 'Brodo' },

  // Pesce
  { name: 'Shrimp Parmigiana', price: '$25.00', description: 'Breaded shrimp, fresh tomato sauce and mozzarella, served with pasta.', category: 'seafood', label: 'Pesce' },
  { name: 'Shrimp Scampi', price: '$24.00', description: 'Sautéed in garlic and butter sauce, served over linguine.', category: 'seafood', label: 'Pesce' },
  { name: 'Shrimp Oreganata', price: '$24.00', description: 'Served over linguine.', category: 'seafood', label: 'Pesce' },
  { name: 'Shrimp Francaise', price: '$25.95', category: 'seafood', label: 'Pesce' },

  // Pollo
  { name: 'Chicken Parmigiana', price: '$20.00', description: 'Breaded chicken breast, fresh tomato sauce and mozzarella, served with pasta.', category: 'chicken', label: 'Pollo' },
  { name: 'Chicken Francaise', price: '$20.00', description: 'Chicken breast sautéed in lemon butter and white wine, served with potato and vegetable.', category: 'chicken', label: 'Pollo' },
  { name: 'Chicken Puglia', price: '$24.00', description: 'With mushrooms, ham and mozzarella; served with potato and vegetable.', category: 'chicken', label: 'Pollo', highlight: true },
  { name: 'Pollo Antonio', price: '$23.00', description: 'Chicken, sausage, hot and sweet peppers, and potatoes in a balsamic sauce.', category: 'chicken', label: 'Pollo' },
  { name: 'Chicken Travolta', price: '$25.00', description: 'Sautéed spinach, mozzarella and tomato in a white wine sauce.', category: 'chicken', label: 'Pollo' },
  { name: 'Chicken Marsala', price: '$21.00', category: 'chicken', label: 'Pollo' },

  // Carne
  { name: 'Veal Parmigiana', price: '$25.00', description: 'Breaded veal, fresh tomato sauce and mozzarella, served with pasta.', category: 'veal', label: 'Carne' },
  { name: 'Veal Marsala', price: '$22.00', description: 'Veal medallions with mushrooms in Marsala wine sauce, served with potato and vegetable.', category: 'veal', label: 'Carne' },
  { name: 'Veal Sorrentino', price: '$26.00', description: 'Veal medallions, eggplant, prosciutto and mozzarella; served with potato and vegetable.', category: 'veal', label: 'Carne' },
  { name: 'Little Italy Style Veal Chop', price: 'Market price', description: 'Breaded and pan-fried with diced tomatoes, red onions, arugula and mozzarella.', category: 'veal', label: 'Carne' },
  { name: 'Steak Contadina', price: '$40 / $70', description: 'For one / for two. With chicken, sausage, potatoes, peppers and onions.', category: 'veal', label: 'Carne' },

  // Vegetali and side dishes
  { name: 'Eggplant Rollatini', price: '$16.95', description: 'Stuffed with ricotta cheese and herbs.', category: 'vegetables', label: 'Vegetali' },
  { name: 'Eggplant Parmigiana', price: '$16.95', description: 'Breaded and topped with fresh tomato sauce and mozzarella.', category: 'vegetables', label: 'Vegetali' },
  { name: 'French Fries', price: '$7.50', category: 'vegetables', label: 'On the side' },
  { name: 'Broccoli Rabe', price: '$12.00', category: 'vegetables', label: 'On the side' },
  { name: 'Sautéed Broccoli', price: '$10.50', category: 'vegetables', label: 'On the side' },
  { name: 'Sautéed Escarole', price: '$12.00', category: 'vegetables', label: 'On the side' },
  { name: 'Meatballs', price: '$8.50', category: 'vegetables', label: 'On the side' },
  { name: 'Sausage', price: '$8.50', category: 'vegetables', label: 'On the side' },

  // Pizza and rolls
  { name: 'Margarita', price: '$13.75', description: 'Fresh tomato and basil.', category: 'pizza', label: 'Pizza' },
  { name: 'Chicken Exotica', price: '$16.75', description: 'Grilled chicken, pesto sauce and fresh mozzarella.', category: 'pizza', label: 'Pizza' },
  { name: 'The Heart Stopper', price: '$20.95', description: 'Roasted red peppers, prosciutto, capicola, salami, pepperoni and fresh mozzarella.', category: 'pizza', label: 'Pizza' },
  { name: 'Fresco', price: '$20.00', description: 'Arugula, diced tomato, diced mozzarella, extra-virgin olive oil and balsamic vinegar.', category: 'pizza', label: 'Pizza' },
  { name: "Puglia's Famous Rigatoni Vodka Pizza", price: '$16.75', description: 'Listed by Puglia as “a must try.”', category: 'pizza', label: 'Pizza', highlight: true },
  { name: 'Affumicata', price: '$16.75', description: 'Smoked mozzarella and sun-dried tomato.', category: 'pizza', label: 'Pizza' },
  { name: 'Napolitana', price: '$16.75', description: 'Goat cheese, mushrooms and fresh mozzarella.', category: 'pizza', label: 'Pizza' },
  { name: 'Bianca', price: '$16.75', description: 'Ricotta, fresh mozzarella and roasted garlic.', category: 'pizza', label: 'Pizza' },
  { name: 'Puglia Special', price: '$16.75', description: 'Sliced tomato, prosciutto and basil.', category: 'pizza', label: 'Pizza', highlight: true },
  { name: 'Diet Delight', price: '$16.75', description: 'Broccoli, mushrooms, onions and mozzarella.', category: 'pizza', label: 'Pizza' },
  { name: 'Vegetable toppings', price: '$3.25 each', description: 'Broccoli, onions, olives, peppers, mushrooms, cheese, eggplant, garlic or tomatoes.', category: 'pizza', label: 'Additional toppings' },
  { name: 'Meat toppings', price: '$3.75 each', description: 'Ham, sausage, meatballs, prosciutto, anchovies, pepperoni or chicken.', category: 'pizza', label: 'Additional toppings' },
  { name: 'Calzone', price: '$10.50', description: 'Ricotta and mozzarella.', category: 'pizza', label: 'Other' },
  { name: 'Chicken Parmigiana Roll', price: '$10.50', category: 'pizza', label: 'Other' },
  { name: 'Sausage, Peppers & Onion Roll', price: '$10.50', category: 'pizza', label: 'Other' },
  { name: 'Grilled Chicken, Roasted Red Peppers & Smoked Mozzarella Roll', price: '$11.50', category: 'pizza', label: 'Other' },

  // Desserts and café
  { name: "Puglia's Famous Banana Avalanche", price: '$10.50', category: 'dessert', label: 'Desserts', highlight: true },
  { name: 'Fried Xango', price: '$12.00', description: 'Fried cheesecake filled with chocolate and caramel, with a scoop of ice cream.', category: 'dessert', label: 'Desserts' },
  { name: 'Homemade Tiramisu', price: '$9.50', category: 'dessert', label: 'Desserts' },
  { name: 'Italian Cheesecake', price: '$8.50', category: 'dessert', label: 'Desserts' },
  { name: 'Tartufo', price: '$10.00', category: 'dessert', label: 'Desserts' },
  { name: 'Chocolate Molten Cake', price: '$10.50', description: 'Warm cake with a heart of rich chocolate and a scoop of ice cream.', category: 'dessert', label: 'Desserts' },
  { name: 'Ice Cream', price: '$6.50', description: 'Vanilla sundae with chocolate syrup and whipped cream.', category: 'dessert', label: 'Desserts' },
  { name: 'Cannoli', price: '$8.50', category: 'dessert', label: 'Desserts' },
  { name: 'American Cheesecake', price: '$8.50', category: 'dessert', label: 'Desserts' },
  { name: 'Dark Chocolate Pistachio Truffle', price: '$10.00', category: 'dessert', label: 'Desserts' },
  { name: 'Amaretto Nut Tartufo', price: '$10.00', category: 'dessert', label: 'Desserts' },
  { name: 'American Coffee', price: '$2.00', category: 'dessert', label: 'Café' },
  { name: 'Espresso', price: '$3.75', category: 'dessert', label: 'Café' },
  { name: 'Double Espresso', price: '$4.75', category: 'dessert', label: 'Café' },
  { name: 'Cappuccino', price: '$4.75', category: 'dessert', label: 'Café' },
  { name: 'Tea', price: '$2.00', description: 'Regular or green tea.', category: 'dessert', label: 'Café' },
  { name: 'Café Latte', price: '$4.75', category: 'dessert', label: 'Café' },
  { name: 'Irish Coffee', price: '$8.50', category: 'dessert', label: 'Café' },
  { name: 'Sanka', price: '$2.25', category: 'dessert', label: 'Café' },
  { name: 'Macchiato', price: '$4.25', category: 'dessert', label: 'Café' },

  // Publicly listed drinks; drink page is older than the current dinner page.
  { name: "Puglia's Famous House Wine", price: '$6 glass · $9 half bottle · $16.50 bottle', description: 'Red or white, as listed on Puglia’s online drinks page.', category: 'drinks', label: 'Wine' },
  { name: 'Wines by the Glass', price: '$8.00', description: 'The online list names Pinot Grigio, Merlot, White Zinfandel, Chardonnay, Cabernet Sauvignon, Riesling, Shiraz, house wine and Chianti.', category: 'drinks', label: 'Wine' },
  { name: 'Draft Beer', price: '$6–$7 glass · $15–$16.50 pitcher', description: 'Published range across the draft selections.', category: 'drinks', label: 'Beer' },
  { name: 'Moretti · Peroni · Amstel · Corona', price: '$8.00 each', description: 'Bottled beers listed on the online drinks page.', category: 'drinks', label: 'Beer' },
  { name: 'Moët White Star', price: '$78.00', category: 'drinks', label: 'Champagne & prosecco' },
  { name: 'Korbel Brut', price: '$47.00', category: 'drinks', label: 'Champagne & prosecco' },
  { name: 'Ruffino sparkling', price: '$39.00', category: 'drinks', label: 'Champagne & prosecco' },
  { name: 'Cupcake sparkling', price: '$37.00', category: 'drinks', label: 'Champagne & prosecco' },
  { name: 'Ruffino Gold Label Chianti', price: '$88.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Villa Antinori Riserva', price: '$48.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Ruffino Ducale Riserva', price: '$48.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Gabbiano Chianti', price: '$28.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Ruffino Chianti', price: '$24.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Beringer Founders Estate', price: '$24.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Sutter Home', price: '$22.00', description: 'Listed under White Zinfandel, Riesling and Moscato.', category: 'drinks', label: 'Wine bottles' },
  { name: 'Pacific Rim Riesling', price: '$28.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Folinari Moscato', price: '$28.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Robert Mondavi Private Selection Chardonnay', price: '$36.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Beringer Chardonnay', price: '$26.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Robert Mondavi Private Selection Merlot', price: '$38.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Blackstone Merlot', price: '$30.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Bolla Merlot', price: '$24.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Raymond RC Collection Cabernet Sauvignon', price: '$48.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Robert Mondavi Private Selection Cabernet Sauvignon', price: '$36.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Blackstone Cabernet Sauvignon', price: '$30.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Jacobs Creek Shiraz', price: '$30.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Yellow Tail Reserve Shiraz', price: '$29.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Santa Margherita Pinot Grigio', price: '$46.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Gabbiano Pinot Grigio', price: '$28.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Bolla Pinot Grigio', price: '$26.00', category: 'drinks', label: 'Wine bottles' },
  { name: 'Anisette', price: '$7.00', category: 'drinks', label: 'Liqueur' },
  { name: 'Kahlua · Galliano · Grand Marnier · Nocello', price: '$8.00 each', category: 'drinks', label: 'Liqueur' },
  { name: 'B&B', price: '$11.00', category: 'drinks', label: 'Liqueur' },
  { name: 'Averna', price: '$8.00', category: 'drinks', label: 'Liqueur' },
  { name: 'Patron XO Café', price: '$11.00', category: 'drinks', label: 'Liqueur' },
  { name: 'Sambuca · Black Sambuca · Bailey’s · Tia Maria · Frangelico · Jameson', price: '$8.00 each', category: 'drinks', label: 'Liqueur' },
  { name: 'Grappa', price: '$9.00', category: 'drinks', label: 'Liqueur' }
];

const filterLabels = {
  highlights: 'House highlights', all: 'Full menu', antipasti: 'Antipasti', salads: 'Insalate',
  pasta: 'Pasta & soup', seafood: 'Pesce', chicken: 'Pollo', veal: 'Carne',
  vegetables: 'Vegetali & sides', pizza: 'Pizza & rolls', dessert: 'Dessert & café', drinks: 'Drinks'
};
const menuGrid = document.querySelector('#menu-grid');
const menuSearch = document.querySelector('#menu-search');
const menuCount = document.querySelector('#menu-count');
const menuResultsLabel = document.querySelector('#menu-results-label');
const menuEmpty = document.querySelector('#menu-empty');
const menuFilterButtons = [...document.querySelectorAll('[data-menu-filter]')];
let activeFilter = 'highlights';

function normalizeText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
function createMenuCard(item, index) {
  const card = document.createElement('article');
  card.className = 'menu-card';
  card.dataset.reveal = 'up';
  card.style.transitionDelay = `${Math.min(index % 6, 5) * 35}ms`;
  const top = document.createElement('div');
  top.className = 'menu-card-top';
  const heading = document.createElement('h3');
  heading.textContent = item.name;
  const price = document.createElement('span');
  price.className = 'menu-price';
  price.textContent = item.price;
  top.append(heading, price);
  card.append(top);
  const label = document.createElement('span');
  label.className = 'menu-category-label';
  label.textContent = item.label;
  if (item.highlight) {
    const tag = document.createElement('span');
    tag.className = 'menu-tag';
    tag.textContent = 'Puglia feature';
    label.append(tag);
  }
  card.append(label);
  if (item.description) {
    const description = document.createElement('p');
    description.className = 'menu-description';
    description.textContent = item.description;
    card.append(description);
  }
  return card;
}
function renderMenu() {
  if (!menuGrid) return;
  const query = normalizeText(menuSearch?.value.trim() || '');
  const matching = menuItems.filter(item => {
    const matchesCategory = activeFilter === 'all' || (activeFilter === 'highlights' ? item.highlight : item.category === activeFilter);
    const searchable = normalizeText(`${item.name} ${item.description || ''} ${item.label} ${item.price}`);
    return matchesCategory && (!query || searchable.includes(query));
  });
  menuGrid.replaceChildren(...matching.map(createMenuCard));
  menuGrid.setAttribute('aria-busy', 'false');
  if (menuCount) menuCount.textContent = `${matching.length} ${matching.length === 1 ? 'item' : 'items'}`;
  if (menuResultsLabel) menuResultsLabel.textContent = query ? `Results for “${menuSearch.value.trim()}”` : filterLabels[activeFilter];
  if (menuEmpty) menuEmpty.hidden = matching.length !== 0;
  observeReveals(menuGrid.querySelectorAll('[data-reveal]'));
}
menuFilterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.menuFilter;
    menuFilterButtons.forEach(filter => {
      const isActive = filter === button;
      filter.classList.toggle('is-active', isActive);
      filter.setAttribute('aria-pressed', String(isActive));
    });
    renderMenu();
  });
});
document.querySelectorAll('[data-jump-filter]').forEach(link => {
  link.addEventListener('click', () => {
    const filterKey = link.dataset.jumpFilter;
    const targetButton = menuFilterButtons.find(button => button.dataset.menuFilter === filterKey);
    if (!targetButton) return;
    activeFilter = filterKey;
    menuFilterButtons.forEach(button => {
      const isActive = button === targetButton;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    renderMenu();
  });
});
if (menuSearch) {
  menuSearch.addEventListener('input', () => {
    if (menuSearch.value.trim() && activeFilter === 'highlights') {
      activeFilter = 'all';
      menuFilterButtons.forEach(filter => {
        const isActive = filter.dataset.menuFilter === 'all';
        filter.classList.toggle('is-active', isActive);
        filter.setAttribute('aria-pressed', String(isActive));
      });
    }
    renderMenu();
  });
  document.addEventListener('keydown', event => {
    const tagName = document.activeElement?.tagName;
    const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName) || document.activeElement?.isContentEditable;
    if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      menuSearch.focus();
      menuSearch.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center' });
    }
    if (event.key === 'Escape' && document.activeElement === menuSearch) {
      menuSearch.value = '';
      renderMenu();
      menuSearch.blur();
    }
  });
}
renderMenu();

// Reservation and photo dialogs. No booking is submitted or implied by these controls.
const reserveDialog = document.querySelector('#reserve-dialog');
function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  document.body.classList.add('dialog-open');
}
function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === 'function' && dialog.open) dialog.close();
  else dialog.removeAttribute('open');
  document.body.classList.remove('dialog-open');
}

const reservationForm = document.querySelector('#reservation-form');
const reservationSummary = document.querySelector('#reservation-summary');
const copyInquiryButton = document.querySelector('[data-copy-inquiry]');
const copyStatus = document.querySelector('#copy-status');
let inquiryText = 'Hello Puglia — I would like to ask about a reservation. Please let me know whether you can accommodate my request.';
function formatInquiryDate(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(year, month - 1, day));
}
if (reservationForm) {
  reservationForm.addEventListener('submit', event => {
    event.preventDefault();
    const dateValue = document.querySelector('#reservation-date')?.value || '';
    const timeValue = document.querySelector('#reservation-time')?.value || '';
    const guestsValue = document.querySelector('#reservation-guests')?.value || '';
    const details = [];
    if (dateValue) details.push(`Date: ${formatInquiryDate(dateValue)}`);
    if (timeValue) details.push(`Preferred time: ${timeValue}`);
    if (guestsValue) details.push(`Guests: ${guestsValue}`);
    inquiryText = `Hello Puglia — I would like to ask about a reservation${details.length ? ` (${details.join('; ')})` : ''}. Please let me know whether you can accommodate my request.`;
    if (reservationSummary) {
      reservationSummary.textContent = details.length
        ? `Your inquiry details: ${details.join(' · ')}. This is not a booking; ask Puglia directly and wait for confirmation.`
        : 'No date, time or guest count added. You can still call or message Puglia to ask about a table.';
    }
    if (copyStatus) copyStatus.textContent = '';
    openDialog(reserveDialog);
  });
}
if (copyInquiryButton) {
  copyInquiryButton.addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(inquiryText);
        copied = true;
      }
    } catch (_) { /* Fall through to a local copy attempt. */ }
    if (!copied) {
      const temporary = document.createElement('textarea');
      temporary.value = inquiryText;
      temporary.setAttribute('readonly', '');
      temporary.style.position = 'fixed';
      temporary.style.opacity = '0';
      document.body.append(temporary);
      temporary.select();
      try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
      temporary.remove();
    }
    if (copyStatus) copyStatus.textContent = copied ? 'Inquiry details copied — paste them into your message.' : 'Copy unavailable here — you can read the details above.';
  });
}
document.querySelectorAll('[data-open-reserve]').forEach(button => button.addEventListener('click', () => openDialog(reserveDialog)));
if (reserveDialog) {
  reserveDialog.querySelector('[data-close-dialog]')?.addEventListener('click', () => closeDialog(reserveDialog));
  reserveDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  reserveDialog.addEventListener('click', event => {
    if (event.target === reserveDialog) closeDialog(reserveDialog);
  });
}

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
document.querySelectorAll('[data-lightbox]').forEach(button => {
  button.addEventListener('click', () => {
    if (!lightboxImage || !lightbox) return;
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.dataset.alt || '';
    if (lightboxCaption) lightboxCaption.textContent = button.dataset.caption || '';
    openDialog(lightbox);
  });
});
if (lightbox) {
  lightbox.querySelector('[data-close-lightbox]')?.addEventListener('click', () => closeDialog(lightbox));
  lightbox.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeDialog(lightbox);
  });
}

// Background pointer parallax is desktop-only; the separate pizza spin is CSS-based and reduced-motion aware.
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-photo img');
const cursorGlow = document.querySelector('.cursor-glow');
if (finePointer.matches && !reduceMotion.matches) {
  if (hero && heroImage) {
    hero.addEventListener('pointermove', event => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      heroImage.style.transform = `scale(1.055) translate(${(-x * 8).toFixed(1)}px, ${(-y * 7).toFixed(1)}px)`;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      heroImage.style.transform = '';
    });
  }
  if (cursorGlow) {
    window.addEventListener('pointermove', event => {
      cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%) scale(1)`;
    }, { passive: true });
    document.querySelectorAll('a, button').forEach(item => {
      item.addEventListener('pointerenter', () => { cursorGlow.style.transform += ' scale(1.3)'; });
    });
  }
}

// If the browser changes its motion preference while the page is open, reveal content rather than hiding it.
reduceMotion.addEventListener?.('change', event => {
  if (event.matches) document.querySelectorAll('[data-reveal]').forEach(node => node.classList.add('is-visible'));
});
