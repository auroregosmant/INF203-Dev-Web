"use strict";

// QUESTION 1a

function fibonacciIt(n)
{
  if(n<0){
    return undefined;
  }
  else if (n===0)
  {
    return 0;
  }
  else if (n===1)
  {
    return 1;
  }
  else
  {
    var res_n_1 = 1;
    var res_n_2 = 0;
    var res= 0;
    for (var k=0; k<n-1;k++)
    {
      res = res_n_1 + res_n_2;
      res_n_2 = res_n_1;
      res_n_1 = res;
    }
    return (res);
  }
}

//console.log(fibonaccilt(6));

//Question 1b

function fibonacciRec(n)
{
  if(n<0){
    return undefined;
  }
  else if (n===0)
  {
    return 0;
  }
  else if (n===1)
  {
    return 1;
  }
  else
  {
    return (fibonacciRec(n-1) + fibonacciRec(n-2));
  }
}

//console.log(fibonacciRec(9));

//QUESTION 1c

function fibonacciArray(a)
{
  var res = [];
  for (var k in a)
  {
    res[k] = fibonacciRec(a[k]);
  }
  return res;
}

//console.log(fibonacciArray([0,1,2,9, 30]));


//QUESTION 1d

function fibonacciMap(a)
{
  var res = a.map(x=> fibonacciRec(x));
  return res;
}

//console.log(fibonacciMap([0,1,2,3,9]));

exports.fibonacciIt = fibonacciIt;
exports.fibonacciRec = fibonacciRec;
exports.fibonacciArray = fibonacciArray;
exports.fibonacciMap = fibonacciMap;
