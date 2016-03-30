angular.module('DemoApp').controller('shippingcontroller', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  '$timeout',
  'store',
  'ngCart',
  function($scope, $http, $stateParams, $location, $rootScope, $state, $timeout, store,ngCart) {
    console.log(ngCart);

    $scope.init = function() {
      $scope.userSession = store.get('userSession');
      console.log("userd:", $scope.userSession);
    };
    console.log('ngCart',ngCart);
  }
]);
