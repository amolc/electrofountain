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
  'modalService',
  function($scope, $http, $stateParams, $location, $rootScope, $state, $timeout, $cookieStore, ApiService, modalService) {

    $scope.category = {
      category_id: 0,
      category_name: '',
      category_description: '',
      category_type: ''
    };

    $scope.sub_category = {
      sub_category_id: 0,
      sub_category_name: '',
      sub_category_description: '',
      sub_category_type: '',
      category_id: ''
    };

    $scope.addupdateCategory = function(categoryForm) {
      if (categoryForm.$valid) {
        if ($scope.category.category_id > 0) {
          $scope.updateCategory();
        } else if ($scope.category.category_id === 0) {
          $scope.addCategory();
        }
      }
    };

    $scope.addupdatesubCategory = function(subcategoryForm) {
      if (subcategoryForm.$valid) {
        if ($scope.sub_category.sub_category_id > 0) {
          $scope.updatesubCategory();
        } else if ($scope.sub_category.sub_category_id === 0) {
          $scope.addsubCategory();
        }
      }
    };
    $scope.addsubCategory = function() {
      console.log('add sub category', $scope.sub_category);
      $http.post(baseUrl + 'category/addsubcategory', $scope.sub_category).success(function(res, req) {
        if (res.status === true) {
          $scope.subcategoryList.push({
            sub_category_id: res.sub_category_id,
            sub_category_name: $scope.sub_category.category_name,
            sub_category_description: $scope.sub_category.category_description,
            sub_category_type: $scope.sub_category.category_type
          });

          $scope.subcategorySuccessmsg = res.message;
          $scope.showsubcategorySuccessmsg = true;
          $timeout(function() {
            $timeout(function() {
              $scope.showsubcategorySuccessmsg = false;
            }, 3000);
          }, 2000);
          document.getElementById("subcategoryForm").reset();
          $scope.custom = false;
        } else {
          $scope.subcategoryErrorsmsg = res.message;
          $scope.showsubcategoryErrorsmsg = true;
          $timeout(function() {
            $timeout(function() {
              $scope.showsubcategoryErrorsmsg = false;
            }, 3000);
          }, 2000);
          document.getElementById("subcategoryForm").reset();
          $scope.custom = false;
        }
      }).error(function(error) {
        console.log("Error", error);
      });
    };

    $scope.updatesubCategory = function() {
      console.log('update sub category', $scope.sub_category);
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
      ApiService.updatecategory($scope.category).then(function(data) {
        console.log(data);
      });

      document.getElementById("categoryForm").reset();
    };

    $scope.getCategories = function() {
      ApiService.getcategories().then(function(data) {
        $scope.categoryList = data.record;
      });
    };

    $scope.getsubCategories = function() {
        ApiService.getsubcategories().then(function(data) {
        console.log('sub cat',data);
        $scope.subcategoryList = data.record;
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

    $scope.deleteCategory = function(category, index) {
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete ',
        headerText: 'Delete Category',
        bodyText: 'Delete Category ' + category.category_name,
        controller: 'categoryController',
      };
      modalService.showModal({}, modalOptions).then(function(result) {
        ApiService.deletecategory(category).then(function(data) {
          //   console.log(data);
          $scope.categoryList.splice(index, 1);
        });
      });
    };

    $scope.getCategories();
    $scope.getsubCategories();

  }
]);
