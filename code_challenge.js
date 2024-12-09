const fs = require('fs');

fs.readFile('./data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.error('Error reading .JSON file', err);
        return;
    }

    let totalRevenue = 0;
    let totalExpenses = 0;
    let salesAndDebit = 0;

    try {
        const data = JSON.parse(jsonString);
    
    // Extract revenue:
        data.data.forEach(item => {
            if (item.account_category === 'revenue') {
                totalRevenue += item.total_value;
            }
        });
        console.log('Total Revenue:', totalRevenue);

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
        console.log('Gross Profit Margin:', grossMargin.toFixed(2));

    // 
        const netProfit = totalRevenue - totalExpenses;
        const netMarginPercentage = (netProfit / totalRevenue) * 100
        console.log('Net Profit Margin:', netMarginPercentage.toFixed(2), '%')
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});


