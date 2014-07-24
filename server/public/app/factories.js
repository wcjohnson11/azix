angular.module('factories', ['ui.router']) 

.factory('User', function($http) {
  // Might use a resource here that returns a JSON array

  //test data

  //return entire list of friends
  var addUser = function(data){
    //returns results of ajax get request to api/links
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