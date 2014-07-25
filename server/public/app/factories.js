angular.module('factories', ['ui.router']) 

.factory('User', function($http) {
  // Might use a resource here that returns a JSON array

  //test data

  //return entire list of friends
  var addUser = function(data){
    //returns results of ajax get request to api/links
    console.log('in addUser');
    return $http({
      method: 'POST',
      data: data,
      url: '/api/create'
    });
  };

  //functions injected when Friends is injected
  return {
    //actual functions
    addUser: addUser
  }
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
  }
});