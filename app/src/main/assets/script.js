document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
    let items = [];
    let conversionRate = 87;
    let foreignCurrency = 'SAR';

    function calculateTotal(items) {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function calculateTotalWeight(items) {
        return items.reduce((total, item) => total + (item.weight * item.quantity), 0);
    }

    function formatCurrency(amount, currency) {
        return `${amount.toFixed(2)} ${currency}`;
    }

    function formatWeight(weight) {
        return weight >= 1000 ? `${(weight/1000).toFixed(2)} kg` : `${weight} g`;
    }

    function renderApp() {
        const totalAmount = calculateTotal(items);
        const totalWeight = calculateTotalWeight(items);
        const myAmount = totalAmount * conversionRate;

        root.innerHTML = `
            <div class="card">
                <div class="header">
                    <h1>Noah Calculator</h1>
                    <p>International shopping calculator for currency and weight</p>
                </div>

                <div class="input-group">
                    <label>Currency</label>
                    <input type="text" id="currency" value="${foreignCurrency}" maxlength="3">
                </div>

                <div class="input-group">
                    <label>My Rate</label>
                    <input type="number" id="rate" value="${conversionRate}">
                </div>

                <div class="input-group">
                    <label>Item Name</label>
                    <input type="text" id="itemName" placeholder="Enter item name">
                </div>

                <div class="input-group">
                    <label>Quantity</label>
                    <input type="number" id="quantity" value="1" min="1">
                </div>

                <div class="input-group">
                    <label>Weight (g)</label>
                    <input type="number" id="weight" placeholder="Enter weight in grams">
                </div>

                <div class="input-group">
                    <label>Price (${foreignCurrency})</label>
                    <input type="number" id="price" placeholder="Enter price">
                </div>

                <button onclick="addItem()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Item
                </button>

                ${items.length > 0 ? `
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Weight</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map((item, index) => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>${formatWeight(item.weight)}</td>
                                    <td>${formatCurrency(item.price, foreignCurrency)}</td>
                                    <td>${formatCurrency(item.price * item.quantity, foreignCurrency)}</td>
                                    <td>
                                        <button onclick="removeItem(${index})" style="padding: 2px;">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div class="totals">
                        <div class="total-item">
                            <span>Total Weight:</span>
                            <strong>${formatWeight(totalWeight)}</strong>
                        </div>
                        <div class="total-item">
                            <span>Total Amount:</span>
                            <strong>${formatCurrency(totalAmount, foreignCurrency)}</strong>
                        </div>
                        <div class="total-item">
                            <span>Total in MY:</span>
                            <strong>${formatCurrency(myAmount, 'MY')}</strong>
                        </div>
                    </div>
                ` : ''}
            </div>
            <div class="ad-space">Advertisement Space</div>
        `;
    }

    // Global functions for event handlers
    window.addItem = function() {
        const name = document.getElementById('itemName').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const price = parseFloat(document.getElementById('price').value);

        if (name && quantity && weight && price) {
            items.push({ name, quantity, weight, price });
            renderApp();
        }
    };

    window.removeItem = function(index) {
        items.splice(index, 1);
        renderApp();
    };

    window.updateCurrency = function(value) {
        foreignCurrency = value.toUpperCase();
        renderApp();
    };

    window.updateRate = function(value) {
        conversionRate = parseFloat(value);
        renderApp();
    };

    // Initial render
    renderApp();
});