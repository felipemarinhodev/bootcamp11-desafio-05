import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ListTransactionDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ListTransactionDTO {
    const balance = this.getBalance();
    return { transactions: this.transactions, balance };
  }

  public getBalance(): Balance {
    const income = this.sumValueByType('income');
    const outcome = this.sumValueByType('outcome');
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const { title, value, type } = data;
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  private sumValueByType(type: 'income' | 'outcome'): number {
    const sum = this.transactions.reduce((total, transaction) => {
      if (transaction.type === type) {
        return total + transaction.value;
      }
      return total;
    }, 0);
    return sum;
  }
}

export default TransactionsRepository;
