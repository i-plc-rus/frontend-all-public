import { addCategory, addTransaction, getCategories, getBalance, getExpenseDistribution } from './budget.js';
import { renderChart } from './chart.js';

document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance-amount');
    const categoriesListElement = document.getElementById('categories-list');
    const transactionCategoryElement = document.getElementById('transaction-category');
    const addCategoryButton = document.getElementById('add-category-button');
    const addTransactionButton = document.getElementById('add-transaction-button');

    function updateBalance() {
        balanceElement.textContent = `$${getBalance().toFixed(2)}`;
    }

    function renderCategories() {
        categoriesListElement.innerHTML = '';
        transactionCategoryElement.innerHTML = '<option value="" disabled selected>Select Category</option>';
        const categories = getCategories();
        categories.forEach(category => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${category.name}</span><span>$${category.budget.toFixed(2)}</span>`;
            categoriesListElement.appendChild(li);

            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            transactionCategoryElement.appendChild(option);
        });
    }

    addCategoryButton.addEventListener('click', () => {
        const categoryName = document.getElementById('category-name').value.trim();
        const categoryBudget = parseFloat(document.getElementById('category-budget').value);
        if (categoryName && !isNaN(categoryBudget)) {
            addCategory(categoryName, categoryBudget);
            renderCategories();
            updateBalance();
        }
    });

    addTransactionButton.addEventListener('click', () => {
        const category = transactionCategoryElement.value;
        const amount = parseFloat(document.getElementById('transaction-amount').value);
        if (category && !isNaN(amount)) {
            addTransaction(category, amount);
            updateBalance();
            renderChart(getExpenseDistribution());
        }
    });

    // Initial rendering
    renderCategories();
    updateBalance();
    renderChart(getExpenseDistribution());
});
