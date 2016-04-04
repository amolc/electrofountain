angular.module('adminPanel').controller('categoryController', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  '$timeout',
  '$cookieStore',
  'ApiService',
  function($scope, $http, $stateParams, $location, $rootScope, $state, $timeout, $cookieStore, ApiService) {

    $scope.category = {
      category_id: 0,
      category_name: '',
      category_description: '',
      category_type: ''
    };

    $scope.addupdateCategory = function(categoryForm) {
      if (categoryForm.$valid) {
        if ($scope.category.category_id > 0) {
          $scope.updateCategory();
        } else if ($scope.category.category_id === 0) {
          $scope.addCategory();
        }
        console.log($scope.category);
      }
    };

    $scope.addCategory = function() {
      $http.post(baseUrl + 'category/addcategory', $scope.category).success(function(res, req) {
        if (res.status === true) {
          $scope.categoryList.push({
            category_id: res.category_id,
            category_name: $scope.category.category_name,
            category_description: $scope.category.category_description,
            category_type: $scope.category.category_type
          });
          $scope.categorySuccessmsg = res.message;
          $scope.showcategorySuccessmsg = true;
          $timeout(function() {
            $timeout(function() {
              $scope.showcategorySuccessmsg = false;
            }, 3000);
          }, 2000);
          document.getElementById("categoryForm").reset();
          $scope.custom = false;
        } else {
          $scope.categoryErrorsmsg = res.message;
          $scope.showcategoryErrorsmsg = true;
          $timeout(function() {
            $timeout(function() {
              $scope.showcategoryErrorsmsg = false;
            }, 3000);
          }, 2000);
          document.getElementById("categoryForm").reset();
          $scope.custom = false;
        }
      }).error(function(error) {
        console.log("Error", error);
      });
    };

    $scope.updateCategory = function() {
      console.log('Update');
      document.getElementById("categoryForm").reset();
    };

    $scope.getCategories = function() {
      ApiService.getcategories().then(function(data) {
        $scope.categoryList = data.record;
      });
    };

    $scope.editCategory = function(category) {
      $scope.custom = true;
      $scope.category = category;
    };

    $scope.resetCategory = function() {
        document.getElementById("categoryForm").reset();
      $scope.category = {
        category_id: 0,
        category_name: '',
        category_description: '',
        category_type: ''
      };
    };

    $scope.getCategories();

  }
]);
