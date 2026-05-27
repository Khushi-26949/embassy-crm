export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatInrLakhs(amount: number): string {
  const lakhs = amount / 100_000;
  return `₹${lakhs.toLocaleString('en-IN', { maximumFractionDigits: 1 })}L`;
}

export function formatPercent(value: number, digits = 1): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(digits)}%`;
}
