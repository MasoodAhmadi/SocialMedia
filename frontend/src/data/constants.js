export const lang = {
  en: { nativeName: 'English' },
  dr: { nativeName: 'Dari' },
};

export const allIngredients = [
  { icon: '🍅', label: 'Tomato' },
  { icon: '🥬', label: 'Lettuce' },
  { icon: '🧀', label: 'Cheese' },
  { icon: '🥕', label: 'Carrot' },
  { icon: '🍌', label: 'Banana' },
  { icon: '🫐', label: 'Blueberries' },
  { icon: '🥂', label: 'Champers?' },
];

const [tomato, lettuce, cheese, blueberries, champers] = allIngredients;
export const initialTabs = [tomato, lettuce, cheese, blueberries, champers];

export function getNextIngredient(ingredients) {
  const existing = new Set(ingredients);
  return allIngredients.find((ingredient) => !existing.has(ingredient));
}

export const Data = [
  {
    id: '1',
    item: 'item01',
    ingredient: 'potato,cucumber',
    available: true,
    country: 'Finland',
    discount: 'FI',
    hueA: 340,
    hueB: 10,
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/1.jpg?raw=true',
    foodChoices: ['Non-Veg'],
  },
  {
    id: '2',
    item: 'item02',
    ingredient: 'garlic,Lamb,salad',
    available: true,
    country: 'Finland',
    hueA: 20,
    hueB: 40,

    discount: 'FI',
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/2.jpg?raw=true',
    foodChoices: ['Non-Veg'],
  },
  {
    id: '3',
    item: 'item03',
    ingredient: 'garlic, salad, Chilli ',
    available: true,
    country: 'Finland',
    discount: 'FI',
    hueA: 60,
    hueB: 90,
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/3.jpg?raw=true',
    foodChoices: ['Veg'],
  },
  {
    id: '4',
    item: 'item04',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    hueA: 80,
    hueB: 120,
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/3.jpg?raw=true',
    foodChoices: ['Lacto Veg'],
  },
  {
    id: '5',
    item: 'item05',
    ingredient: 'garlic, salad, Chicken,Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    hueA: 100,
    hueB: 140,
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/4.jpg?raw=true',
    foodChoices: ['Non-Veg'],
  },
  {
    id: '6',
    item: 'item06',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    hueA: 205,
    hueB: 245,
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/5.jpg?raw=true',
    foodChoices: ['Lactose Free'],
  },
  {
    id: '7',
    item: 'item07',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    hueA: 260,
    hueB: 290,
    discount: 'FI',
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/6.jpg?raw=true',
    foodChoices: ['Gluton free'],
  },
  {
    id: '8',
    item: 'item08',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    hueA: 290,
    hueB: 320,
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/calendar.jpg?raw=true',
    foodChoices: ['Gluton free'],
  },
  {
    id: '9',
    item: 'item09',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    hueA: 320,
    hueB: 350,
    image:
      'https://github.com/MasoodAhmadi/AnsariServer/blob/5c620278e95dc4cb39db0099f0569d22645a533f/data/images/lehtikaali.jpg?raw=true',
    foodChoices: ['Gluton free'],
  },
];
