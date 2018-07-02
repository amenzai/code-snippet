## JS中两个大数求和
```js
/**
 * 计算两个大数的和
 * @param  {[Number]} a [数值A]
 * @param  {[Number]} b [数值B]
 * @return {String]}   [大数和]
 */
function sumBIgNum(a, b) {
  var l1 = 0,
    l2 = 0,
    lt, // 参数小数点位数
    result = '', // 保存最终结果字符串
    carry = 0, // 保存进位
    tmpArr = []; // 临时数组

  // 获取小数位数开始
  try {
    l1 = a.toString().split('.')[1].length
  } catch (e) {}
  try {
    l2 = b.toString().split('.')[1].length
  } catch (e) {}
  lt = Math.max(l1, l2);
  // 获取小数位数结束

  a = (a * Math.pow(10, lt)).toString().split('');
  b = (b * Math.pow(10, lt)).toString().split('');
  while (a.length || b.length || carry) {
    // 对每一项相加
    carry += ~~a.pop() + ~~b.pop(); // ~~'1'等 1  ~~undefined 等 0 ~~'2.33' 等 2
    result = carry % 10 + result; // 每一项相加后的个位
    carry = carry > 9 ? 1 : 0; // 每一项相加和大于10进1
  }
  result.replace(/^0+/, ''); // 去除最终结果前面的'0'
  tmpArr = result.split('');
  if (lt > 0) {
    tmpArr.splice(-lt, 0, '.');
    result = tmpArr.join('');
  }
  return result;
}
```

## JS中小数的加减乘除
```js
//加法函数
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
//给Number类型增加一个add方法，，使用时直接用 .add 即可完成计算。 
Number.prototype.add = function (arg) {
  return accAdd(arg, this);
};


//减法函数
function Subtr(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成计算。 
Number.prototype.sub = function (arg) {
  return Subtr(this, arg);
};


//乘法函数
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成计算。 
Number.prototype.mul = function (arg) {
  return accMul(arg, this);
};


//除法函数
function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  with(Math) {
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
}
//给Number类型增加一个div方法，，使用时直接用 .div 即可完成计算。 
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
};
```