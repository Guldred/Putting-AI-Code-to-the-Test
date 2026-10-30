import './style.css';
import { calculateCheckout } from './checkout';
import { catalog, fixtures } from './catalog';
import { euros, renderSummary } from './view';

const artwork: Record<string, string> = {
  kit: '<rect x="17" y="30" width="70" height="51" rx="9"/><path d="M38 30v-8h28v8M17 48h70M47 46v9h10v-9"/>',
  notebook: '<path d="M29 18h45v70H29a7 7 0 0 1-7-7V25a7 7 0 0 1 7-7Z"/><path d="M34 18v70M47 38h15M47 48h15M47 58h10"/>',
  mug: '<path d="M25 33h43v36a13 13 0 0 1-13 13H38a13 13 0 0 1-13-13ZM68 40h8a12 12 0 0 1 0 24h-8M38 14v9M52 12v11"/>',
};

document.querySelector('#cart-lines')!.innerHTML = catalog.map(product => `
  <article class="product">
    <div class="product-art ${product.icon}" aria-hidden="true"><svg viewBox="0 0 104 104" fill="none" stroke="currentColor" stroke-width="2">${artwork[product.icon]}</svg></div>
    <div class="product-copy"><h3>${product.name}</h3><p>${product.description}</p><span>${euros(product.unitPriceCents)}</span></div>
    <label class="quantity">Qty<input aria-label="${product.name} quantity" data-product="${product.id}" type="number" min="0" max="9" step="1" value="${product.quantity}" /></label>
  </article>
`).join('');

const inputs = [...document.querySelectorAll<HTMLInputElement>('[data-product]')];
const codeInput = document.querySelector<HTMLInputElement>('#discount-code')!;
const status = document.querySelector<HTMLElement>('#code-status')!;
const error = document.querySelector<HTMLElement>('#cart-error')!;
let appliedCode = '';

function update(): void {
  const lines = catalog.map((product, index) => ({
    unitPriceCents: product.unitPriceCents,
    quantity: inputs[index]!.value === '' ? Number.NaN : Number(inputs[index]!.value),
  }));
  try {
    const result = calculateCheckout(lines, appliedCode);
    error.textContent = '';
    document.querySelector('#summary')!.removeAttribute('hidden');
    renderSummary(result);
    status.textContent = !appliedCode ? 'Try SAVE10 on a cart of €50 or more.'
      : appliedCode !== 'SAVE10' ? 'Code not recognised. No discount applied.'
        : result.discountCents === 0 ? 'SAVE10 starts at €50.00.'
          : 'SAVE10 applied.';
    document.querySelector('#item-count')!.textContent = `${lines.reduce((sum, line) => sum + line.quantity, 0)} items`;
  } catch (cause) {
    if (!(cause instanceof RangeError)) throw cause;
    error.textContent = 'Enter a whole quantity from 0 to 9 for every item.';
    document.querySelector('#summary')!.setAttribute('hidden', '');
  }
}

inputs.forEach(input => input.addEventListener('input', update));
document.querySelector('#discount-form')!.addEventListener('submit', event => {
  event.preventDefault();
  appliedCode = codeInput.value;
  update();
});
document.querySelector('#remove-code')!.addEventListener('click', () => {
  codeInput.value = '';
  appliedCode = '';
  update();
});
document.querySelectorAll<HTMLButtonElement>('[data-fixture]').forEach(button => {
  button.addEventListener('click', () => {
    const quantities = fixtures[button.dataset.fixture as keyof typeof fixtures];
    inputs.forEach((input, index) => { input.value = String(quantities[index]); });
    update();
  });
});
update();
