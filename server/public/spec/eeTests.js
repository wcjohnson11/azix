//To run this test, you must npm install -g protractor
//Then follow the instructions here https://github.com/angular/protractor/blob/master/docs/tutorial.md
//To set up the test running server

//Make sure to set the conf.js file to point to the port your localhost is running at

describe('angularjs homepage', function() {
  it('should have a title', function() {
  	console.log("hi")
    browser.get('/#/home');

    expect(browser.getTitle()).toEqual('Azix');
  });


});