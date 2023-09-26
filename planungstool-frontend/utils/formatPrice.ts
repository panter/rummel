const addThousandSeparator = (value: string): string =>
  value.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
const formatNumber = (value: number) => addThousandSeparator(value.toFixed(2));
// const centsToFrancs = (amount: number): number => amount / 100;
export const formatPrice = (amount: number): string => formatNumber(amount);
