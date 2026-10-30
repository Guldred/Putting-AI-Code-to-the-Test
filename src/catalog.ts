export const catalog = [
  { id: 'kit', name: 'Field kit', description: 'A little room for big ideas.', unitPriceCents: 5_000, quantity: 1, icon: 'kit' },
  { id: 'notebook', name: 'Dot grid notebook', description: 'Make space for the next thought.', unitPriceCents: 2_500, quantity: 2, icon: 'notebook' },
  { id: 'mug', name: 'Studio mug', description: 'For the work between the work.', unitPriceCents: 1_500, quantity: 0, icon: 'mug' },
] as const;

export const fixtures = {
  discount: [1, 0, 0],
  shipping: [1, 2, 0],
  cap: [3, 2, 0],
  empty: [0, 0, 0],
} as const;
