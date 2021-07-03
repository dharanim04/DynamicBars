const assert = require("assert");

describe('foo',function(){
  this.timeout(15000);
  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
  var xhr = new XMLHttpRequest();
  it('xhr test',function(done){
    
    xhr.open('GET', "http://pb-api.herokuapp.com/bars", true);
    xhr.onreadystatechange = function(){
      console.log("xhr "+JSON.stringify(xhr))
      if (xhr.readyState === 4)
          done();
    }
    xhr.send()
  });
  it('xhr test buttons',function(){
    var data = JSON.parse(xhr.responseText);
    console.log('in test buttons');
    console.log(data.buttons);
    if(data.buttons.length > 0){
      assert.ok(true);
    }
  });


});