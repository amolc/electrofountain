//angular.module('').factory( 'factoryName', function );
var app = angular.module('adminPanel');

app.factory('ApiService', function($http, $q) {
  var factory = {};
  var deferred = $q.defer();

  factory.getcategories = function() {
    return $http.post(baseUrl + 'category/getcategories')
      .then(function(response) {
        // promise is fulfilled
        deferred.resolve(response.data);
        return deferred.promise;
      }, function(response) {
        // the following line rejects the promise
        deferred.reject(response);
        return deferred.promise;
      });
  };

  factory.deletecategory = function(category) {
    return $http.post(baseUrl + 'category/deletecategory', category)
      .then(function(response) {
        // promise is fulfilled
        deferred.resolve(response.data);
        return deferred.promise;
      }, function(response) {
        // the following line rejects the promise
        deferred.reject(response);
        return deferred.promise;
      });
  };

  return factory;
});
