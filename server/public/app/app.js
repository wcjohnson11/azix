angular.module('app', ['ui.router', 'factories','ngTable','controllers', 'angularMoment', 'ui.bootstrap']) //dont forget to load factories

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
