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
        
        data.data.forEach(item => {
            if (item.account_category === 'revenue') {
                totalRevenue += item.total_value;
            }
        });
        console.log('Total Revenue:', totalRevenue);

        data.data.forEach(item => {
            if (item.account_category === 'expense') {
                totalExpenses += item.total_value;
            }
        });
        console.log('Total Expenses:', totalExpenses);

        data.data.forEach(item => {
            if (item.value_type === 'sales' || item.value_type === 'debit') {
                salesAndDebit += item.total_value;
            }
        });
        console.log(salesAndDebit)
        const margin = salesAndDebit / totalRevenue;
        console.log('Gross Profit Margin:', margin);
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});


