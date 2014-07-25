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
      // Remove YYYY-MM-DD, T and Z for comparison
      var startTime = project.createdAt.slice(11,23);
      var endTime = project.completed.slice(11,23);
      //Get the minutes and seconds 
      var difference = moment(moment(endTime,"HH:mm:ss").diff(moment(startTime,"HH:mm:ss"))).format("mm:ss");
      //These are concatenating but shouldn't be
      $scope.timeSum += difference;
      console.log($scope.timeSum);
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
  })

.controller('UploadCtrl', function($scope, $state, $upload){
  $scope.onFileSelect = function($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'server/upload/url', //upload.php script, node.js route, or servlet url
          //method: 'POST' or 'PUT',
          //headers: {'header-key': 'header-value'},
          //withCredentials: true,
          data: {myObj: $scope.myModelObj},
          file: file, // or list of files ($files) for html5 only
          //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
          // customize file formData name ('Content-Desposition'), server side file variable name. 
          //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
          // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        });
        //.error(...)
        //.then(success, error, progress); 
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
      }
      /* alternative way of uploading, send the file binary with the file's content-type.
         Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
         It could also be used to monitor the progress of a normal http post/put request with large data*/
      // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };

});

// .controller('UserCtrl', function($scope, $state, $filter, User, ngTableParams){
//   $scope.data = {};
//   $scope.data.user = localStorage.getItem('user') || "test";
//   $scope.data.test = "sup " + $scope.data.user;
//   Projects.getProjects($scope.data.user).then(function(response){
//     $scope.data.projects = response.data;
//   });
// })
