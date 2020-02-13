"use strict;"

//QUESTION 2a

function wordCount(string)
{
  var text = {};
  var words = string.split(' ');
  for (var k in words)
  {
    var count = text[words[k]];
    if (count === undefined)
    {
      text[words[k]]=1;
    }
    else
    {
      text[words[k]]+=1;
    }
  }
  return text;
}

//console.log(wordCount("fish bowl fish bowl list"));


//QUESTION 2b
function WordList(string)
{
  var text = wordCount(string);
  var object ={
    maxCountWord: function(){
      var countMax = 1;
      for (var k in text)
      {
        if (text[k] > countMax)
        {
          countMax = text[k];
        }
      }
      var listWordsMaxOcc = [];
      var k = 0;
      for (var j in text){
        if (text[j]===countMax)
        {
          listWordsMaxOcc[k] = j;
          k+=1;
        }
      }
      listWordsMaxOcc.sort()
      return listWordsMaxOcc[0];
    },
    minCountWord : function(){
      var countMin = +Infinity;
      for (var k in text)
      {
        if (text[k] < countMin)
        {
          countMin = text[k];
        }
      }
      var listWordsMinOcc = [];
      var k = 0;
      for (var j in text){
        if (text[j]===countMin)
        {
          listWordsMinOcc[k] = j;
          k+=1;
        }
      }
      listWordsMinOcc.sort()
      return listWordsMinOcc[0];
    },
    getWords : function(){
      var wordsList = [];
      var i =0;
      for (var k in text)
      {
          wordsList[i]=k;
          i=i+1;
      }
      return wordsList.sort();
    },
    getCount : function(word){
      for (var k in text)
      {
        if (k == word)
        {
          return text[k];
        }
      }
    },
    applyWordFunc : function(f){
      var res = this.getWords().map(x => f(x));
      return res;
    }
  }
  return object;
}

function f(word) {return word.length;}

//console.log(WordList("fish cat dog bowl a bc").applyWordFunc(f));
//console.log(WordList("fish cat dog bowl a bc").getWords());

exports.wordCount = wordCount;
exports.WordList = WordList;
