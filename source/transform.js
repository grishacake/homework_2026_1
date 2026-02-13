'use strict';

/**
 * Рекурсивно преобразует все примитивные значения в объекте с помощью переданной функции.
 * Обрабатывает вложенные объекты и массивы.
 * 
 * @param {Object|Array} obj - Исходный объект
 * @param {Function} transformFn - Функция преобразования
 * 
 * @example
 * // Простой объект
 * transform({ a: 1, b: 2, c: 3}, x => x * 2);
 * // Результат: { a: 2, b: 4, c: 6 }
 * 
 * @example
 * // Вложенный объект
 * transform({ a: 1, b: { c: 2, d: 3 }, e: 4 }, x => x + 1);
 * // Результат: { a: 2, b: { c: 3, d: 4 }, e: 5 }
 * 
 * @example
 * // Массив внутри объекта
 * transform({ a: [1, 2, 3], b: 4 }, x => x * 3);
 * // Результат: { a: [3, 6, 9], b: 12 }
 * 
 * @returns {Object|Array} Новый объект с преобразованными значениями
 */
function transform (obj, transformFn) {
    if (obj === null) {
        return null;
    }

    if (typeof obj === 'object' && !Array.isArray(obj)) {
        const result = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                result[key] = transform(obj[key], transformFn);
            }
        }
        return result;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => transform(item, transformFn));
    }

    return transformFn(obj);
}