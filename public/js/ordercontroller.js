angular.module('DemoApp').controller('ordercontroller', [
    '$scope',
    '$http',
    '$stateParams',
    '$location',
    '$rootScope',
    '$state',
    '$timeout',
    'ngCart',
    '$cookieStore',
    function($scope, $http, $stateParams, $location, $rootScope, $state, $timeout, ngCart, $cookieStore) {

      $scope.userSession = $cookieStore.get('userSession') || {};

        console.log($stateParams);
        

        $scope.getOrders = function() {

            $http.post(baseUrl + 'billing/getorders', {
                customer_id: $scope.userSession.userid
            }).success(function(res, req) {
                console.log(res);
                $scope.orderList = res.record;
            });
        };

        $scope.name = function() {
            console.log('Called');
        };

        $scope.getOrderDetails = function() {
            $http.post(baseUrl + 'billing/getorderdetails', {
                order_id: $stateParams.order_id
            }).success(function(res, req) {
                console.log(res);
                $scope.orderdetailList = res.record;
            });
        };

    }
]);
