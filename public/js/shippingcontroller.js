angular.module('DemoApp').controller('shippingcontroller', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  '$timeout',
  'store',
  function($scope, $http, $stateParams, $location, $rootScope,$state, $timeout,store) {
    
    
    $scope.init = function() {
      $scope.userSession = store.get('userSession');
      console.log("userd:",$scope.userSession);
    }

    }
]);