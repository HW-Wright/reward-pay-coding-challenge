const fs = require('fs');

// Read JSON file

fs.readFile('./data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.error('Error reading .JSON file', err);
        return;
    }
// Extract revenue and calulate the total:
    try {
        const data = JSON.parse(jsonString);
        let totalRevenue = 0;
        
        data.data.forEach(item => {
            if (item.account_category === 'revenue') {
                totalRevenue += item.total_value;
            }
        });
        console.log('Total Revenue:', totalRevenue);
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
// Extract the expenses vales and calculate the total:
    try {
        const data = JSON.parse(jsonString);
        let totalExpenses = 0;

        data.data.forEach(item => {
            if (item.account_category === 'expense') {
                totalExpenses += item.total_value;
            }
        });
        console.log('Total Expenses:', totalExpenses);
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});


