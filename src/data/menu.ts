export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export type MenuCategory = 'Starters' | 'Mains' | 'Desserts' | 'Drinks';

export const MENU_CATEGORIES: MenuCategory[] = ['Starters', 'Mains', 'Desserts', 'Drinks'];

export const MENU_DATA: Record<MenuCategory, MenuItem[]> = {
  Starters: [
    {
      name: 'Oysters on the Half Shell',
      description: 'Six Pacific oysters, champagne mignonette, horseradish',
      price: '$22',
    },
    {
      name: 'Bone Marrow Custard',
      description: 'Roasted marrow, brioche soldiers, micro herbs, fleur de sel',
      price: '$18',
    },
    {
      name: 'Wagyu Beef Tartare',
      description: 'Hand-cut A5 wagyu, cured egg yolk, black truffle, grissini',
      price: '$28',
    },
    {
      name: 'Seared Foie Gras',
      description: 'Brioche, sour cherry, candied walnut, aged balsamic',
      price: '$32',
    },
    {
      name: 'Lobster Bisque',
      description: 'Maine lobster, brandy cream, tarragon oil, sourdough croutons',
      price: '$24',
    },
    {
      name: 'Ember Charcuterie Board',
      description: 'House-cured meats, aged cheeses, pickles, honeycomb, grilled bread',
      price: '$38',
    },
  ],
  Mains: [
    {
      name: '40-Day Dry-Aged Ribeye (16oz)',
      description: 'White oak-grilled, bone marrow butter, roasted garlic jus',
      price: '$78',
    },
    {
      name: 'Prime New York Strip (14oz)',
      description: 'Truffle compound butter, crispy shallots, herb oil',
      price: '$68',
    },
    {
      name: 'Tomahawk for Two (32oz)',
      description: 'Dry-aged 30 days, table-side carving, three sauces',
      price: '$155',
    },
    {
      name: 'Whole Roasted Duck',
      description: 'Cherry gastrique, duck fat fingerlings, braised endive',
      price: '$62',
    },
    {
      name: 'Pan-Seared Halibut',
      description: 'Champagne beurre blanc, saffron oil, charred leek, caperberries',
      price: '$54',
    },
    {
      name: 'Filet Mignon (8oz)',
      description: 'Béarnaise, pomme purée, haricots verts',
      price: '$74',
    },
  ],
  Desserts: [
    {
      name: 'Valrhona Chocolate Fondant',
      description: 'Salted caramel, vanilla bean ice cream',
      price: '$16',
    },
    {
      name: 'Crème Brûlée',
      description: 'Classic Madagascar vanilla, caramelized sugar, seasonal berries',
      price: '$14',
    },
    {
      name: 'Cheese Selection',
      description: 'Three aged cheeses, honeycomb, quince paste, walnut bread',
      price: '$22',
    },
    {
      name: 'Ember Apple Tarte Tatin',
      description: 'Calvados caramel, crème fraîche, toasted almond',
      price: '$15',
    },
  ],
  Drinks: [
    {
      name: 'Old Fashioned',
      description: "Maker's Mark 46, Angostura, orange peel, Luxardo cherry",
      price: '$18',
    },
    {
      name: 'Ember Negroni',
      description: 'Mancino Secco, Campari, Sipsmith gin, black walnut bitters',
      price: '$19',
    },
    {
      name: 'The Vine Sauvignon Blanc',
      description: 'Marlborough, New Zealand, crisp, citrus-forward',
      price: '$16/glass',
    },
    {
      name: 'Château Pichon Baron 2016',
      description: 'Pauillac, Bordeaux — full-bodied, classic structure',
      price: '$28/glass',
    },
  ],
};
