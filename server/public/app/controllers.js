angular.module('controllers', [])

.controller('ProjectsCtrl', function($scope, $state, $filter, Projects, ngTableParams){
  $scope.data = {};
  $scope.data.user = localStorage.getItem('user') || "test";

  //Get a reference to the commit
  $scope.getCommit = function (value) {

  };

  
  //Repopulate the table data onClick
  $scope.doRefresh = function () {
    $scope.populateTable();
  };

  // Populate the table with data from mongolab db user table
  $scope.populateTable = function () {
  Projects.getProjects($scope.data.user).then(function(response){
    $scope.data.projects = response.data;
    console.log($scope.data.projects);

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
      // Remove YYYY-MM-DD, T and Z for comparison
      // var t = moment(project.createdAt).twix(project.completed);
      var startTime = project.createdAt.slice(11,23);
      var endTime = project.completed.slice(11,23);
      //Get the minutes and seconds 
      // console.log(t.simpleFormat('d:h:m'));
      // console.log(t.count('minutes'), "new");
      // console.log(t.format, "new");

      var difference = moment(moment(endTime,"HH:mm:ss").diff(moment(startTime,"HH:mm:ss"))).format("mm:ss");
      //These are concatenating but shouldn't be
      $scope.timeSum += difference;
      $scope.timeLogs[project[project]] = difference;
    });


    // Declare a variable for table function
    var tableData = $scope.data.projects;

    $scope.tableParams = new ngTableParams({
      page: 1,    // Show first page
      count: 100,  // Count per page
      sorting: {
        completed: 'desc'  // Initial sorting newest first
      }
      },{
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
            $scope.projects = orderedData.slice((params.page() - 1) * params.count(),
            params.page() * params.count());
  
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
      title: "Project logs",
      content: "Dynamic Group Body - 1"
    },
    {
      title: "Upload Files",
      content: "Dynamic Group Body - 2"
    }
  ];
  $scope.status = {
    isFirstOpen: true
  };

  $scope.items = ['Camera 1', 'Camera 2', 'Camera 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Camera ' + newItemNo);
  };
})

.controller('HomeCtrl', function($scope, $state, User, Projects){
  $scope.addUser = User.addUser;
  $scope.addUserFun = function(){
    var x = {'username': $scope.email, 'password': $scope.password};
    $scope.addUser(x);
    //if successful then route to projects page
  };
});

