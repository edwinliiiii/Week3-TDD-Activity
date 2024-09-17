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
    this._buffer = this._buffer + ' ' + key.valueOf() + ' ';
  }

  private evaluate(): number {
    const keyArr: string[] = this._buffer.split(' ');
    const operatorMap: Map<String, () => number> = {
      '+': (a: number, b: number) => a + b,
      '-': (a: number, b: number) => a - b,
      '*': (a: number, b: number) => a * b,
      '/': (a: number, b: number) => a / b,
    };

    //
    var simpleArr: string[] = [];
    for (var i = 0; i < keyArr.length; i++) {
      if (keyArr[i] === OperatorKeys.DIV || keyArr[i] === OperatorKeys.MULT) {
        const val: number = operatorMap[keyArr[i]](parseInt(keyArr[i--]), parseInt(keyArr[i++]));
        simpleArr.push(String(val));
      } else {
        simpleArr.push(keyArr[i]);
      }

      i++;
    }

    for (var i = 0; i < simpleArr.length; i++) {
      if (simpleArr[i] === OperatorKeys.PLUS) {
        operatorMap[OperatorKeys.PLUS](parseInt(simpleArr[i--]), parseInt(simpleArr[i++]));
      } else if (simpleArr[i] === OperatorKeys.MINUS) {
        operatorMap[OperatorKeys.MINUS](parseInt(simpleArr[i--]), parseInt(simpleArr[i++]));
      }
      i++;
    }

    return 1;
  }

  public display(): string {
    return this._buffer;
  }
}

// 2 + 3 - 1
// 2 + 3 / 2 * 2 + 5

// [5, ]

// [2, +, 3, /, 2, *, 2, +, 5]
// [2, +, 1, *, 2, +, 5]

// for i in nums:
//     if i === enum.DIVIS || i === enum.MULT:
//
