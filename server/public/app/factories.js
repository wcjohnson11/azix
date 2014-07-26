angular.module('factories', ['ui.router']) 

.factory('User', function($http) {
  // Might use a resource here that returns a JSON array

  //test data

  var addUser = function(data){
    //returns results of ajax get request to api/links
    return $http({
      method: 'POST',
      data: data,
      url: '/api/create'
    });
  };

  return {
    //actual functions
    addUser: addUser
  }
})


.factory('Projects', function($http) {
  // Might use a resource here that returns a JSON array

  //test data

  var getProjects = function(user){
    //returns results of ajax get request to api/links
    return $http({
      method: 'GET',
      url: '/api/' + user + '/projects'
    });
  };

  return {
    //actual functions
    getProjects: getProjects
  }
});