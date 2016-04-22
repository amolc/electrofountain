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

        $scope.init = function() {
            $scope.adminsession = $cookieStore.get('adminsession') || {};
        };
           $scope.adminsession = $cookieStore.get('adminsession') || {};
           //console.log($cookieStore.get('adminsession'));
        console.log("$scope.adminsession:",$scope.adminsession);

        $scope.category = {
            category_id: 0,
            category_name: '',
            category_description: '',
            category_type: '',
            admin_id : $scope.adminsession.adminid
        };

        $scope.sub_category = {
            sub_category_id: 0,
            sub_category_name: '',
            sub_category_description: '',
            sub_category_type: '',
            category_id: ''
        };

        $scope.addupdateCategory = function(categoryForm) {
            console.log("categoryForm:",categoryForm);
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
             $scope.sub_category.adminid  = $scope.adminsession.adminid;
            $http.post(baseUrl + 'category/addsubcategory', $scope.sub_category).success(function(res, req) {
                if (res.status === true) {

                    $scope.subcategoryList.push({
                        sub_category_id: res.sub_category_id,
                        category_id: $scope.sub_category.category_id,
                        sub_category_name: $scope.sub_category.sub_category_name,
                        sub_category_description: $scope.sub_category.sub_category_description,
                        sub_category_type: $scope.sub_category.category_type
                    });

                    $scope.subcategorySuccessmsg = res.message;
                    $scope.showsubcategorySuccessmsg = true;
                    $timeout(function() {
                        $timeout(function() {
                            $scope.showsubcategorySuccessmsg = false;
                            $scope.resetsubCategory();
                        }, 3000);
                    }, 2000);
                } else {

                    $scope.subcategoryErrorsmsg = res.message;
                    $scope.showsubcategoryErrorsmsg = true;
                    $timeout(function() {
                        $timeout(function() {
                            $scope.showsubcategoryErrorsmsg = false;
                            $scope.resetsubCategory();
                        }, 3000);
                    }, 2000);
                }
            }).error(function(error) {
                console.log("Error", error);
            });
        };

        $scope.updatesubCategory = function() {
        //    console.log('update sub category', $scope.sub_category);

        //    console.log('Update');
            ApiService.updatesubcategory($scope.sub_category).then(function(data) {
                //console.log(data);
                if (data.status === true) {

                    $scope.subcategorySuccessmsg = data.message;
                    $scope.showsubcategorySuccessmsg = true;
                    $timeout(function() {
                        $timeout(function() {
                            $scope.showsubcategorySuccessmsg = false;
                            $scope.resetsubCategory();
                        }, 3000);
                    }, 2000);
                } else {

                    $scope.subcategoryErrorsmsg = data.message;
                    $scope.showsubcategoryErrorsmsg = true;
                    $timeout(function() {
                        $timeout(function() {
                            $scope.showsubcategoryErrorsmsg = false;
                            $scope.resetsubCategory();
                        }, 3000);
                    }, 2000);
                }
            });
        };


        $scope.addCategory = function() {
//            $scope.category.admin_id = $scope.adminsession.adminid; 
            console.log("category:",$scope.category);
            $http.post(baseUrl + 'category/addcategory', $scope.category).success(function(res, req) {
                console.log(res);
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
                    $scope.resetCategory();
                } else {

                    $scope.categoryErrorsmsg = res.message;
                    $scope.showcategoryErrorsmsg = true;
                    $timeout(function() {
                        $timeout(function() {
                            $scope.showcategoryErrorsmsg = false;
                        }, 3000);
                    }, 2000);
                    $scope.resetCategory();
                }
            }).error(function(error) {
                console.log("Error", error);
            });

        };

        $scope.updateCategory = function() {

          //  console.log('Update');
            ApiService.updatecategory($scope.category).then(function(data) {
                if (data.status === true) {

                    $scope.categorySuccessmsg = data.message;
                    $scope.showcategorySuccessmsg = true;
                    $timeout(function() {
                        $timeout(function() {
                            $scope.showcategorySuccessmsg = false;
                            $scope.resetCategory();
                            $scope.custom = false;
                        }, 3000);
                    }, 2000);
                } else {
                    $scope.categoryErrorsmsg = data.message;
                    $scope.showcategoryErrorsmsg = true;
                    $timeout(function() {
                        $timeout(function() {
                            $scope.showcategoryErrorsmsg = false;
                            $scope.resetCategory();
                            $scope.custom = false;
                        }, 3000);
                    }, 2000);
                }
            });
        };

        $scope.getCategories = function() {
            ApiService.getcategories().then(function(data) {
                //  console.log('Categories ', data.record);
                $scope.categoryList = data.record;
            });
        };

        $scope.getsubCategories = function() {
            ApiService.getsubcategories().then(function(data) {
                   console.log('sub cat', data.record);
                $scope.subcategoryList = data.record;
            });
        };

        $scope.editCategory = function(category) {
            console.log('category', category);
            $scope.category = category;
            $scope.custom = true;
        };

        $scope.editsubCategory = function(sub_category) {
            $scope.custom = true;
            $scope.sub_category = sub_category;
        };

        $scope.resetCategory = function() {
            $scope.category = {
                category_id: 0
            };
            $scope.categoryForm.$setPristine();
            //document.getElementById("categoryForm").reset();
        };

        $scope.resetsubCategory = function() {
            $scope.sub_category = {
                sub_category_id: 0,
            };
            $scope.subcategoryForm.$setPristine();
            //    document.getElementById("subcategoryForm").reset();
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
                    //console.log(data);
                    //console.log('index', index);
                    $scope.categoryList.splice(index, 1);
                });
            });
        };

        $scope.deletesubCategory = function(sub_category, index) {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete ',
                headerText: 'Delete Category',
                bodyText: 'Delete Category ' + sub_category.sub_category_name,
                controller: 'categoryController',
            };
            modalService.showModal({}, modalOptions).then(function(result) {
                ApiService.deletesubcategory(sub_category).then(function(data) {
                //    console.log(data);
              //      console.log('index', index);
                    $scope.subcategoryList.splice(index, 1);
                });
            });
        };

        $scope.getCategories();
        $scope.getsubCategories();

        $scope.subcategory = function(cat) {
            console.log(cat);
            console.log($scope.subcategoryList);
            $scope.subcategory2 = _. where($scope.subcategoryList,{category_id:cat});
            console.log($scope.subcategory2);
        };

        $scope.addsubCategorytwo = function(data){
            console.log("data:",data);
            console.log("sub_categorytwo:",$scope.sub_categorytwo);
            
           /* $scope.sub_categorytwo.adminid = $scope.adminsession.adminid;
            $http.post(baseUrl + 'subcategorytwo/addsubCategorytwo' , $scope.sub_categorytwo).success(function(res,req){
                
                console.log("res:",res);

            }).error(function(error){
                console.log("Error");
            })*/
        }

        $scope.getsubcategoriestwo = function(){
            $http.get(baseUrl +'subcategorytwo/getsubcategoriestwo').success(function(res,req){
                console.log("res:",res);
                $scope.subcategorytwolist = res.record;
            }).error(function(error){
                console.log("Error");
            })
        }
         $scope.getsubcategoriestwo();
    }
]);
