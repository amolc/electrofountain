angular.module('DemoApp').controller('usercontroller', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  '$timeout',
  'store',
  function($scope, $http, $stateParams, $location, $rootScope, $state, $timeout, store) {


    $scope.init = function() {
      $scope.userSession = store.get('userSession');
    };

    $scope.IsVisible = false;
    $scope.IsCalVisible = false;

    $scope.ShowHide = function() {
      //If form is visible it will be hidden and vice versa.
      $scope.IsVisible = $scope.IsVisible ? false : true;
    };

    $scope.ShowHidecal = function() {
      $scope.IsCalVisible = $scope.IsCalVisible ? false : true;
    };

    $scope.update_shipping_details = function(shipping_address) {
      console.log("shipping_address:", shipping_address);
      console.log("Cookies:", $scope.userSession);
      /* var tododata = {
         todo_id: $stateParams.todo_id
       }
       $http.post(baseUrl + 'gettododetails',tododata).success(function(res, req) {
         $scope.data = res.record[0];

       }).error(function() {
         console.log("Connection Problem.");
       });*/
    };


  }
]);
