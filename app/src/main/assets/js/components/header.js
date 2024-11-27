export function renderHeader(foreignCurrency, conversionRate) {
    return `
        <div class="header">
            <h1>Noah Calculator</h1>
            <p>International shopping calculator for currency and weight</p>
        </div>

        <div class="header-controls">
            <div class="input-group" style="margin-bottom: 0;">
                <div>
                    <label>Currency</label>
                    <input type="text" id="currency" value="${foreignCurrency}" maxlength="3" onchange="updateCurrency(this.value)">
                </div>
                <div>
                    <label>My Rate</label>
                    <input type="number" id="rate" value="${conversionRate}" onchange="updateRate(this.value)">
                </div>
            </div>
            <button onclick="clearAllData()" class="clear-button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                Clear All
            </button>
        </div>
    `;
}