export function formatCurrency(amount, currency) {
    return `${amount.toFixed(2)} ${currency}`;
}

export function formatWeight(weight) {
    return weight >= 1000 ? `${(weight/1000).toFixed(2)} kg` : `${weight} g`;
}

export function calculateTotal(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function calculateTotalWeight(items) {
    return items.reduce((total, item) => total + (item.weight * item.quantity), 0);
}

export function clearData(items, callback) {
    items.length = 0;
    if (callback) callback();
}