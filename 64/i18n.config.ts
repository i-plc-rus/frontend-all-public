export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      title: 'Personal budget',
      seoDescription: 'Pet project for managing personal budget',
      mockApiWarningTitle: 'Mock API is used',
      mockApiWarningDetail:
        "This app deployment uses mock API, which doesn't persist user data. Requests will work, but don't expect data to stay. App can be deployed locally to use json-server API.",
      dateFilter: {
        month: 'Month',
        year: 'Year',
        custom: 'Custom',
        dialogHeader: 'Date range',
        prevTimeIntervalAria: 'Select previous time interval',
        nextTimeIntervalAria: 'Select next time interval',
        modeAria: 'Select date range: {mode}'
      },
      categoryFilter: {
        selectCategoryAria:
          'Click to check filter by {category} category or to uncheck it'
      },
      chart: {
        alt: 'Failed to show chart',
        transactionLoadFailure: 'Failed to load transactions',
        transactionLimitExceeded: 'Too many transactions, adjust filter',
        empty: 'No expenses found for selected period',
        previousChartAria: 'Select previous chart type',
        nextChartAria: 'Select next chart type',
        categoryChartAria: 'Expenses by category chart',
        historyChartAria: 'Net balance history chart',
        net: 'Net'
      },
      totals: {
        incomeAria: 'Total income for selected period',
        expensesAria: 'Total expenses for selected period',
        netAria: 'Total net amount for selected period'
      },
      transactions: {
        add: 'Add expenses/income',
        dialog: {
          edit: 'Edit',
          add: 'Add',
          save: 'Save',
          cancel: 'Cancel',
          delete: 'Delete'
        },
        income: 'Income',
        expense: 'Expense',
        net: 'Net',
        category: 'Category',
        amount: 'Amount',
        date: 'Date',
        saveFailure: 'Failed to save transaction',
        deleteFailure: 'Failed to delete transaction',
        sortByDate: 'By Date',
        sortByAmount: 'By Amount',
        categoryOther: 'Other',
        dateAria: 'Date {date}',
        categoryAria: 'Category {category}',
        amountAria: 'Amount {amount}',
        dateHeaderAria: 'Transactions for date',
        typeAria: 'Transaction type (expense/income)',
        sortAria: 'Select transaction sort mode'
      }
    },
    ru: {
      title: 'Личный бюджет',
      seoDescription: 'Пэт-проект для личного бюджета',
      mockApiWarningTitle: 'Используется API заглушка',
      mockApiWarningDetail:
        'Приложение использует заглушку для API, которая не сохраняет пользовательские изменения. Некоторые запросы будут работать, но данные могут пропасть. Для использования json-server API разверните проект локально.',
      dateFilter: {
        month: 'Месяц',
        year: 'Год',
        custom: 'Другое',
        dialogHeader: 'Диапазон дат',
        prevTimeIntervalAria: 'Выбрать предыдущий временной интервал',
        nextTimeIntervalAria: 'Выбрать следующий временной интервал',
        modeAria: 'Выбрать диапазон дат: {mode}'
      },
      categoryFilter: {
        selectCategoryAria:
          'Нажмите чтобы фильтровать по категории {category} или снять выбранный фильтр'
      },
      chart: {
        alt: 'Не удалось показать график',
        transactionLoadFailure: 'Ошибка загрузки транзакций',
        transactionLimitExceeded:
          'Слишком много транзакций в указанном диапазоне',
        empty: 'Нет расходов',
        previousChartAria: 'Выбрать предыдущий тип графика',
        nextChartAria: 'Выбрать следующий тип графика',
        categoryChartAria: 'График расходов по категориям',
        historyChartAria: 'График истории баланса',
        net: 'Баланс'
      },
      totals: {
        incomeAria: 'Суммарный доход за выбранный период',
        expensesAria: 'Суммарный расход за выбранный период',
        netAria: 'Суммарный баланс за выбранный период'
      },
      transactions: {
        add: 'Добавить доходы/расходы',
        dialog: {
          edit: 'Редактировать',
          add: 'Добавить',
          save: 'Сохранить',
          cancel: 'Отмена',
          delete: 'Удалить'
        },
        income: 'Доход',
        expense: 'Расход',
        net: 'Итог',
        category: 'Категория',
        amount: 'Сумма',
        date: 'Дата',
        saveFailure: 'Не удалось сохранить транзакцию',
        deleteFailure: 'Не удалось удалить транзакцию',
        sortByDate: 'По Дате',
        sortByAmount: 'По Сумме',
        categoryOther: 'Другое',
        dateAria: 'Дата {date}',
        categoryAria: 'Категория {category}',
        amountAria: 'Сумма {amount}',
        dateHeaderAria: 'Транзакции за дату',
        typeAria: 'Тип транзакции (доход/расход)',
        sortAria: 'Выбрать сортировку транзакций'
      }
    }
  }
}));
