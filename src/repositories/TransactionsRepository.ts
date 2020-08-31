import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTranscationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    if (!this.transactions.length) {
      return balance;
    }

    balance.income = this.transactions.reduce((income, transaction) => {
      return income + (transaction.type === 'income' ? transaction.value : 0);
    }, 0);

    balance.outcome = this.transactions.reduce((income, transaction) => {
      return income + (transaction.type === 'outcome' ? transaction.value : 0);
    }, 0);

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTranscationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
