let categories = [];

export function addCategory(name, budget) {
    categories.push({ name, budget });
}

export function addTransaction(categoryName, amount) {
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
        category.budget -= amount;
    }
}

export function getCategories() {
    return categories;
}

export function getBalance() {
    return categories.reduce((total, category) => total + category.budget, 0);
}

export function getExpenseDistribution() {
    return categories.map(category => ({
        name: category.name,
        budget: category.budget
    }));
}
