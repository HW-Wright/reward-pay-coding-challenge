const fs = require('fs');

fs.readFile('./data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.error('Error reading .JSON file', err);
        return;
    }

    let totalRevenue = 0;
    let totalExpenses = 0;
    let salesAndDebit = 0;
    let totalAssets = 0;
    let assetsToSubtract = 0;
    let assetsToAdd = 0;
    let totalLiabilities = 0;
    let liabilitiesToAdd = 0;
    let liabilitiesToSubtract = 0;
    let workingLiabilities = 0;

    try {
        const data = JSON.parse(jsonString);
    
    // Extract revenue:
        data.data.forEach(item => {
            if (item.account_category === 'revenue') {
                totalRevenue += item.total_value;
            }
        });
        console.log('Total Revenue: $', totalRevenue);

    // Extract expense values and sum:
        data.data.forEach(item => {
            if (item.account_category === 'expense') {
                totalExpenses += item.total_value;
            }
        });
        console.log('Total Expenses:', totalExpenses);
    
    // Extract and sum sales and debit values to divide by revenue:
        data.data.forEach(item => {
            if (item.value_type === 'sales' || item.value_type === 'debit') {
                salesAndDebit += item.total_value;
            }
        });
        const grossMargin = salesAndDebit / totalRevenue;
        console.log('Gross Profit Margin:', grossMargin.toFixed(1), '%');

    // Parse known values to calulate Net Profit Margin:
        const netProfit = totalRevenue - totalExpenses;
        const netMarginPercentage = (netProfit / totalRevenue) * 100
        console.log('Net Profit Margin:', netMarginPercentage.toFixed(1), '%')

    // Calculate all asset values:
        data.data.forEach(item => {
            if (item.account_category === 'liability' || item.value_type === 'debit' || 
                ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type)) {
                    assetsToAdd += item.total_value
                }
            if (item.account_category === 'assets' || item.value_type === 'credit' || 
                ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type)) {
                    assetsToSubtract -= item.total_value
                }
            const totalAssets = assetsToAdd - assetsToSubtract;
        });

    // Calculate all liability values:
        data.data.forEach(item => {
            if (item.account_category === 'liability' || item.value_type === 'credit' || 
                ['current', 'current_accounts_payable'].includes(item.account_type)) {
                    liabilitiesToAdd += item.total_value
                }
            if (item.account_category === 'assets' || item.value_type === 'debit' || 
                ['current', 'bank', 'current_accounts_payable'].includes(item.account_type)) {
                    liabilitiesToSubtract -= item.total_value
                }
            const totalLiabilities = liabilitiesToAdd - liabilitiesToSubtract;
        });

    // Calculate working liabilities ratio:
        const workingLiabilities = (totalAssets / totalLiabilities) * 100;
        console.lot('Working Liabilities Ratio:', workingLiabilities, '%')

} catch (err) {
    console.error('Error parsing JSON:', err);
}
});


