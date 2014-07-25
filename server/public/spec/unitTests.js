/* global hashTable, describe, it, expect, should */

/*describe('hashTable()', function () {
  'use strict';
  var hi;

  it('exists', function () {
    expect(makeHashTable).to.be.a('function');

  });

});*/

/*  beforeEach(function(){
    hi = "hi";
  });

  it('does something', function () {
    expect(true).to.equal(false);
  });

  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});*/

describe("Hello World", function() {
    var element;
    var $scope;
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element("<div>{{2 + 2}}</div>");
        element = $compile(element)($rootScope)
    }))

    it('Should inject compile and rootScope for testing', function() {
    $scope.$digest()
    //expect(element.html()).toBe("4");
    expect(element.html()).to.equal("4");
  })
})


describe("Controllers", function() {
 
    beforeEach(module('app'));
 
    describe("ProjectsCtrl", function() {
 
        var scope;
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller("ProjectsCtrl", {
                $scope: scope
            });
        }));
 
        it("should have a function called refresh", function() {
            expect(scope.refresh).to.be.a("function");
        });
    });
});
