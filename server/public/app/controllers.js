angular.module('controllers', [])

.controller('ProjectsCtrl', function($scope, $state, $filter, Projects, ngTableParams){
  $scope.data = {};
  $scope.data.user = localStorage.getItem('user') || "test";
  $scope.data.test = $scope.data.user + "'s Dashboard";

  $scope.refresh = function() {
    //Reload the table data async
    // $scope.populateTable();
  };
  $scope.populateTable = function () {
  Projects.getProjects($scope.data.user).then(function(response){
    $scope.data.projects = response.data;

    // Get Commit codes with ref to Project ID
    $scope.completeCommits = {};
    angular.forEach($scope.data.projects, function(project) {
      var commitCode = project['completeCommit'];
      var id = project['_id'];
      $scope.completeCommits[id] = commitCode;
    });


    // Get the number of Projected completed and the failed
    // for visualization / display
    $scope.total = $scope.data.projects.length;
    $scope.failed = 0;
    angular.forEach($scope.data.projects, function(project) {
      if (project['code'] !== 0) {
        $scope.failed += 1;
      }
    });
    // Get the time for each process and sum
    // for visualization / display
    $scope.timeLogs = {};
    $scope.timeSum = 0;
    angular.forEach($scope.data.projects, function(project) {
      var startTime = project.createdAt;
      console.log(startTime, 'start');
      var endTime = project.completed;
      var difference = moment(moment(startTime,"HH:mm:ss").diff(moment(endTime,"HH:mm:ss"))).format("HH:mm:ss");
      console.log(endTime, 'end');
      $scope.timeSum += difference;
      $scope.timeLogs[project[project]] = difference;
    });


    // Declare a variable for table function
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
  };
  $scope.populateTable();
})
.controller('AccordionCtrl', function($scope) {

  $scope.groups = [
    {
      title: "Room1",
      content: "Dynamic Group Body - 1"
    },
    {
      title: "Room2",
      content: "Dynamic Group Body - 2"
    }
  ];

  $scope.items = ['Camera 1', 'Camera 2', 'Camera 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Camera ' + newItemNo);
  };
})
.controller('HomeCtrl', function($scope, $state, User){
  $scope.addUser = User.addUser;
  $scope.addUserFun = function(){
    var x = {'email': $scope.email, 'password': $scope.password};
    console.log($scope);
    console.log($scope.email);
    console.log($scope.password);
    console.log(x);
    $scope.addUser(x);
  };
});

});
// .controller('UserCtrl', function($scope, $state, $filter, User, ngTableParams){
//   $scope.data = {};
//   $scope.data.user = localStorage.getItem('user') || "test";
//   $scope.data.test = "sup " + $scope.data.user;
//   Projects.getProjects($scope.data.user).then(function(response){
//     $scope.data.projects = response.data;
//   });
// })
