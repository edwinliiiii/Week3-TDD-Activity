import { CalculatorModel } from './calculator.model';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ActionKeys } from '../enums/action-keys.enum';

describe('CalculatorModel', (): void => {
  let calculator: ICalculatorModel;

  beforeEach((): void => {
    calculator = new CalculatorModel();
  });

  it('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {
    expect(calculator).toBeDefined();
  });

  it('should have an empty display on init', (): void => {
    // Act
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('');
  });

  it('should display `1` when the `1` key is pressed', (): void => {
    // Act
    calculator.pressNumericKey(NumericKeys.ONE);
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('1');
  });

  it('should display `2` when the `2` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2');
  });

  it('should display `98` when the `9` key is pressed followed by the `8` key', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('98');
  });

  it('should display `98+` when the buffer contains `98` and the `+` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('98 + ');
  });

  it('should display `98+` when the buffer contains `98` and the `+` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('98 + ');
  });

  it('should display `98+` when the buffer contains `98` and the `*` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('98 * ');
  });

  // it('should throw error when the buffer contains `` and the `+` key is pressed', (): void => {
  //   expect(calculator.pressOperatorKey(OperatorKeys.PLUS)).toThrow('Operator no');
  // });

  it('should display `98 + 2 = 100` when the buffer contains `98+2` and the `=` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('98 + 2 = 100');
  });

  it('should display `98 + 2 - 1 = 99` when the buffer contains `98+2-1` and the `=` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('98 + 2 - 1 = 99');
  });

  it('should display `2 * 3 = 6` when the buffer contains `2*3` and the `=` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2 * 3 = 6');
  });

  it('should display `2 + 3 * 4 = 14` when the buffer contains `2+3*4` and the `=` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2 + 3 * 4 = 14');
  });
});
