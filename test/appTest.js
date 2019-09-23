const assert = require('chai').assert;

const loadAPIDate = require('../script').loadXMLDoc;

describe('App', function() {


  it('return an object', function(){
    var dataLength = 0;
    var resultFromAPI = loadXMLDoc('http://pb-api.herokuapp.com/bars', function(err, data){
      if(err){ dataLength =0;}
      else{
        dataLength = data.length;
      }
    });
    
    assert.isAbove( dataLength, 1, 'atleast some data');
  })

});