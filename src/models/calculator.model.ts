import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

export class CalculatorModel implements ICalculatorModel {
  private _buffer: string = '';

  public pressNumericKey(key: NumericKeys): void {
    this._buffer = this._buffer + key.valueOf();
  }

  // 234 + 234
  public pressOperatorKey(key: OperatorKeys): void {
    if (this._buffer.length === 0 || !(this._buffer.slice(-1) in Object.values(NumericKeys))) {
      throw new Error('Operator no');
    }

    this._buffer = this._buffer + ' ' + key.valueOf() + ' ';
  }

  public pressActionKey(key: ActionKeys): void {
    if (key === ActionKeys.EQUALS) {
      this._buffer = this._buffer + ' = ' + this.evaluate().toString();
      return;
    }

    if (key === ActionKeys.CLEAR) {
      this._buffer = '';
      return;
    }

    this._buffer = this._buffer + key.valueOf();
  }

  public display(): string {
    return this._buffer;
  }

  private evaluate(): number {
    const keys: string[] = this._buffer.split(' ');
    const values: number[] = [];
    const operators: string[] = [];

    let i: number = 0;
    while (i < keys.length) {
      const key: string = keys[i];

      if (!isNaN(Number(key))) {
        values.push(parseInt(key, 10));
      } else if (Object.values(OperatorKeys).includes(key as OperatorKeys)) {
        while (operators.length > 0 && this.hasPrecedence(key, operators[operators.length - 1])) {
          values.push(this.applyOperation(operators.pop(), values.pop(), values.pop()));
        }
        operators.push(key);
      }
      i++;
    }

    // Apply the remaining operators
    while (operators.length > 0) {
      values.push(this.applyOperation(operators.pop(), values.pop(), values.pop()));
    }

    return values.pop();
  }

  private hasPrecedence(currentOp: string, previousOp: string): boolean {
    if ((currentOp === '*' || currentOp === '/') && (previousOp === '+' || previousOp === '-')) {
      return false;
    }
    return true;
  }

  private applyOperation(operator: string, b: number, a: number): number {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }
}
