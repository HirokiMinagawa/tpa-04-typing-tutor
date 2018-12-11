// 小数点n位までを残す関数
// number=対象の数値
// n=残したい小数点以下の桁数
const roundFloat = function(number, n) {
  let _pow = Math.pow(10, n);
  return Math.round(number * _pow) / _pow;
}

export {
  roundFloat,
}
