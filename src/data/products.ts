export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'dish' | 'dessert' | 'snacks';
  ingredients: string[];
  isBestSeller: boolean;
}

export const products: Product[] = [
  {
    id: 'adobo',
    name: 'Adobo',
    description: 'Classic Filipino dish of meat (usually chicken or pork) marinated in vinegar, soy sauce, garlic, and black peppercorns.',
    price: 250,
    image: '/images/adobo.jpg',
    category: 'dish',
    ingredients: ['Chicken/Pork', 'Vinegar', 'Soy Sauce', 'Garlic', 'Black Peppercorns'],
    isBestSeller: true,
  },
  {
    id: 'sinigang',
    name: 'Sinigang',
    description: 'Filipino sour soup typically made with tamarind, vegetables, and meat or seafood.',
    price: 280,
    image: '/images/sinigang.jpg',
    category: 'dish',
    ingredients: ['Pork/Fish', 'Tamarind', 'Vegetables', 'Fish Sauce'],
    isBestSeller: true,
  },
  {
    id: 'sisig',
    name: 'Sisig',
    description: "Sizzling dish made from parts of pig's head and liver, usually seasoned with calamansi and chili peppers.",
    price: 300,
    image: '/images/sisig.jpg',
    category: 'dish',
    ingredients: ['Pig Head', 'Liver', 'Calamansi', 'Chili', 'Onions'],
    isBestSeller: false,
  },
  {
    id: 'leche-flan',
    name: 'Leche Flan',
    description: 'Filipino version of crème caramel, a rich custard dessert with a layer of soft caramel on top.',
    price: 120,
    image: '/images/leche-flan.jpg',
    category: 'dessert',
    ingredients: ['Eggs', 'Condensed Milk', 'Sugar', 'Vanilla'],
    isBestSeller: true,
  },
  {
    id: 'halo-halo',
    name: 'Halo-Halo',
    description: 'Popular Filipino dessert with mixed fruits, sweet beans, and shaved ice topped with evaporated milk and ice cream.',
    price: 150,
    image: '/images/halo-halo.jpg',
    category: 'dessert',
    ingredients: ['Shaved Ice', 'Evaporated Milk', 'Ice Cream', 'Mixed Fruits', 'Sweet Beans'],
    isBestSeller: false,
  },
  {
    id: 'ilocos-empanada',
    name: 'Ilocos Empanada',
    description: 'Crispy deep-fried empanada filled with vegetables, egg, and longganisa (Filipino sausage).',
    price: 80,
    image: '/images/empanada.jpg',
    category: 'snacks',
    ingredients: ['Rice Flour', 'Vegetables', 'Egg', 'Longganisa'],
    isBestSeller: true,
  },
  {
    id: 'lumpia',
    name: 'Lumpia',
    description: 'Filipino spring rolls filled with vegetables and sometimes meat, wrapped in a thin crepe.',
    price: 100,
    image: '/images/lumpia.jpg',
    category: 'snacks',
    ingredients: ['Wrappers', 'Vegetables', 'Ground Meat', 'Garlic'],
    isBestSeller: false,
  },
]; 