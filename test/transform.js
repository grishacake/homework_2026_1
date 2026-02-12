/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

    // Мои тесты:
    QUnit.test('Работает с пустыми объектами и массивами', (assert) => {
        assert.deepEqual(transform({}, x => x * 2), {}, 'Пустой объект остаётся пустым');
        assert.deepEqual(transform({ arr: [] }, x => x + 1), { arr: [] }, 'Пустой массив остаётся пустым');
    });
    
    QUnit.test('Корректно обрабатывает смешанные типы данных', (assert) => {
        const original = {
        num: 5,
        str: 'hello',
        bool: true,
        nested: {
            arr: [1, 'test', false],
            deep: { value: 42 }
        }
        };
        
        const result = transform(original, value => {
        if (typeof value === 'number') return value * 10;
        if (typeof value === 'string') return value.toUpperCase();
        if (typeof value === 'boolean') return !value;
        return value;
        });
        
        assert.strictEqual(result.num, 50, 'Число умножено на 10');
        assert.strictEqual(result.str, 'HELLO', 'Строка в верхнем регистре');
        assert.strictEqual(result.bool, false, 'Булево значение инвертировано');
        assert.deepEqual(result.nested.arr, [10, 'TEST', true], 'Массив с разными типами обработан');
        assert.strictEqual(result.nested.deep.value, 420, 'Глубокая вложенность преобразовано');
    });
});

