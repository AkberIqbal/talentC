var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const assert = require('chai').assert;
const app = require('../app.js');

describe('App', function () {

  it('(1) length of result is atleast 1', function (done) {
    xhr = new XMLHttpRequest()
    xhr.open('GET', "https://pb-api.herokuapp.com/bars", true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4)
        console.log("responseText:", xhr.responseText);
      done();
    }
    xhr.send()
    assert.lengthOf(xhr.responseText, 1, 'length of result is atleast 1')
  });


  it('(2) limit value  is atleast 100', function (done) {
    xhr = new XMLHttpRequest()
    xhr.open('GET', "https://pb-api.herokuapp.com/bars", true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4)
        console.log("responseText:", xhr.responseText);
      done();
    }
    xhr.send()
    assert.isAtLeast(xhr.responseText.limit, 100, 'limit value  is atleast 100')
  });

});
