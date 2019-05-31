import expect from '../utils';

export const compareArr = (arr1, arr2) => {
  if (arr1.length !== arr2.length || arr1.find(item => !arr2.includes(item))) {
    return false;
  }
  return true;
};

export const compareString = (str1, str2) => {
  return str1 === str2;
};

export const compareNum = (num1, num2) => {
  return num1 === num2;
};

// obj要求指向同一对象
export const compareObj = (obj1, obj2) => {
  return obj1 === obj2;
};

export function compareFactory (val) {
  let v = expect(val);
  if (v.isArray()) return compareArr;
  if (v.isObj()) return compareObj;
  if (v.isNumber()) return compareNum;
  if (v.isString()) return compareString;

  return function () {};
}

export function compareType (val1, val2) {
  let v1 = expect(val1);
  let v2 = expect(val2);

  return (
    (v1.isArray() && v2.isArray()) ||
    (v1.isObj() && v2.isObj()) ||
    (v1.isNumber() && v2.isNumber()) ||
    (v1.isString() && v2.isString())
  );
}
