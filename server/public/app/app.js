angular.module('app', ['ui.router', 'factories','ngTable','angularMoment']) //dont forget to load factories


.controller('ProjectsCtrl', function($scope, $state, $filter, Projects, ngTableParams){
  $scope.data = {};
  $scope.data.user = localStorage.getItem('user') || "test";
  $scope.data.test = $scope.data.user + "'s Dashboard";
  Projects.getProjects($scope.data.user).then(function(response){
    $scope.data.projects = response.data;

  var tableData = $scope.data.projects;
  
  $scope.tableParams = new ngTableParams({
    page: 1,    //showfirst page
    count: 10,  //count per page
    sorting: {
      completed: 'asc'  // Sort projects in ascending order
    }
  }, {
      counts: [], // Comment out this line to reveal
                  // result per page toggler
      total: tableData.length, // set length of data
      getData: function($defer, params) {
        // Filter the data if params entered
        var orderedData = params.filter() ?
          $filter('filter')(tableData, params.filter()) :
          tableData;

        // Set the projects that will be displayed on table
        $scope.projects = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

        // set total for recalculating pagination
        params.total(orderedData.length);
        $defer.resolve($scope.projects);
      }
  });
  });

})

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

    // Each tab has its own nav history stack:

    .state('projects', {
      url: '/projects',
      templateUrl: '/app/projects.html',
      controller: 'ProjectsCtrl'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/app/home.html',
      controller: 'HomeCtrl'
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/projects');

})


.factory('Projects', function($http) {
  // Might use a resource here that returns a JSON array

  //test data

  //return entire list of friends
  var getProjects = function(user){
    //returns results of ajax get request to api/links
    return $http({
      method: 'GET',
      url: '/api/' + user + '/projects'
    });
  };

  //functions injected when Friends is injected
  return {
    //actual functions
    getProjects: getProjects
  };
})
.directive('loadingContainer', function () {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var loadingLayer = angular.element('<div class="loading"></div>');
            element.append(loadingLayer);
            element.addClass('loading-container');
            scope.$watch(attrs.loadingContainer, function(value) {
                loadingLayer.toggleClass('ng-hide', !value);
            });
        }
    };
});
