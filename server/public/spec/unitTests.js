describe("Angular testing framework", function() {
    var element;
    var $scope;
    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope;
        compile = $compile
        element = angular.element("<div>{{2 + 2}}</div>");
        element = $compile(element)($rootScope)
    }))

    it('The test should inject compile and rootScope for testing', function() {
      scope.$digest()  //use apply
      //expect(element.html()).toBe("4");
      expect(element.html()).to.equal("4");
    })

    it("should say hello", function() {
      var element = compile('<div>hello</div>')(scope);
      console.log(element[0].textContent)
      expect(element[0].textContent).to.equal('hello');
    });    
})

describe("App", function() {

 
    beforeEach(module('app'));
 
    describe("App setup", function() {
        var scope;
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller("ProjectsCtrl", {
                $scope: scope
            });
        })
        );

        it("The app should exist", function() {
            should.exist(angular.module('app'));
        });
 
        it("The app should load some modules", function() {
            expect(angular.module('app').requires.length).to.be.above(0);
        });
    });

  
});


describe("Controllers", function() {
 
    beforeEach(module('app'));
 
    describe("ProjectsCtrl", function() {
        var scope;
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller("ProjectsCtrl", {
                $scope: scope
            });
        })
        );
 
        it("should have a function called refresh", function() {
            expect(scope.refresh).to.be.a("function");
        });
    });

    describe("HomeCtrl", function() {
        var scope;
        var compile; 
        var rootScope;
        beforeEach(inject(function($rootScope, $controller, $state, $compile) {
            scope = $rootScope.$new();
            rootScope = $rootScope;
            $controller("HomeCtrl", {
                $scope: scope
            });
        }));
 
        it("should have a function called addUserFun", function() {
            expect(scope.addUserFun).to.be.a("function");
        });

    });
});
