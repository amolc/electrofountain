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

    /**
      @function for addupdate_shippingaddress
      @param {int}
      @author sameer vedpathak
      @initialDate
      @lastDate
    */
   
    $scope.addupdate_shippingaddress = function(data,valid) {
      /*if(valid){
        if ($stateParams.todo_id)
          $scope.updatetodos(data);
        if ($stateParams.todo_id == '')
          $scope.addtodos(data);
      }*/
    };
      



    


    }
]);