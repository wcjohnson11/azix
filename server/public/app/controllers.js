angular.module('controllers', [])

.controller('ProjectsCtrl', function($scope, $state, $filter, Projects, ngTableParams){
  $scope.data = {};
  $scope.data.user = localStorage.getItem('user') || "test";
  $scope.data.test = $scope.data.user + "'s Dashboard";
  Projects.getProjects($scope.data.user).then(function(response){
    $scope.data.projects = response.data;

    var tableData = $scope.data.projects;

    
    $scope.tableParams = new ngTableParams({
      page: 1,    // Show first page
      count: 10,  // Count per page
      sorting: {
        completed: 'asc'  // Initial sorting
      }
    }, {
        groupBy: 'code',  // Group projects by status code
        filterDelay: 0,   // A delay in ms from keyup to filter
        counts: [], // Comment out this line to reveal
                    // result per page toggler
        total: tableData.length, // set length of data
        getData: function($defer, params) {
          // Filter the data if params entered
          var filteredData = params.filter() ?
            $filter('filter')(tableData, params.filter()) :
            tableData;
          // Sort the data
          var orderedData = params.filter() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
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

.controller('HomeCtrl', function($scope, $state){

});
// .controller('UserCtrl', function($scope, $state, $filter, User, ngTableParams){
//   $scope.data = {};
//   $scope.data.user = localStorage.getItem('user') || "test";
//   $scope.data.test = "sup " + $scope.data.user;
//   Projects.getProjects($scope.data.user).then(function(response){
//     $scope.data.projects = response.data;
//   });
// })