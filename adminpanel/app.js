// Invoke 'strict' JavaScript mode

//'use strict';

// Set the main application name
var ApplicationModuleName = 'adminPanel';


// Create the main application
var SampleApplicationModule = angular.module('adminPanel', ['ui.router', 'ngCookies','ngMessages','ngAnimate','ui.bootstrap']);


SampleApplicationModule.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })
    .state('mainview', {
      url: '/mainview',
      templateUrl: 'templates/mainview.html'
    })
    .state('mainview.welcome', {
      url: '/welcome',
      templateUrl: 'templates/welcome.html'
    })
    .state('mainview.category', {
      url: '/category',
      templateUrl: 'templates/category.html'
    })
    .state('mainview.subcategory', {
      url: '/subcategory',
      templateUrl: 'templates/subcategory.html'
    })
    .state('mainview.subcategory2', {
      url: '/subcategory2',
      templateUrl: 'templates/subcategory2.html'
    })
    .state('mainview.products', {
      url: '/products',
      templateUrl: 'templates/products.html'
    })
    .state('mainview.details', {
      url: '/details',
      templateUrl: 'templates/details.html'
    })
    .state('mainview.about', {
      url: '/about',
      templateUrl: 'templates/about.html'
    })
    .state('mainview.contact', {
      url: '/contact',
      templateUrl: 'templates/contact.html'
    })  ;
  //
  // .state('signup', {
  //   url: '/signup',
  //   templateUrl: 'templates/signup.html'
  // })
  //
  // .state('home', {
  //   url: '/home',
  //   templateUrl: 'templates/home_page.html'
  // })
  //
  // .state('account', {
  //   url: '/account',
  //   templateUrl: 'templates/account.html'
  // })
  //
  // .state('profileview', {
  //   url: '/profileview',
  //   templateUrl: 'templates/profile_view.html'
  // })
  //
  // .state('editbillingaddress', {
  //   url: '/editbillingaddress',
  //   templateUrl: 'templates/billing_address.html'
  // })
  //
  // .state('editshippingaddress', {
  //     url: '/editshippingaddress/:customer_id',
  //     templateUrl: 'templates/shipping_address.html'
  //   })
  //   .state('cart', {
  //     url: '/cart',
  //     templateUrl: 'templates/cart_final.html'
  //   })
  //
  // .state('productdetailspage', {
  //   url: '/productdetailspage/:product_id',
  //   templateUrl: 'templates/product_details_page.html'
  // });

}]);

var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};
 
SampleApplicationModule.directive("compareTo", compareTo);


angular.module('adminPanel').controller('MainController', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  '$timeout',
  '$cookieStore',
  // 'modalService',
  function($scope, $http, $stateParams, $location, $rootScope, $state, $timeout, $cookieStore) {

    $scope.stateParams = $stateParams;

    $scope.init = function() {
            $scope.adminsession = $cookieStore.get('adminsession') || {};
    };


    $scope.userlogin = function(user, valid) {
      if (valid) {
        $http.post(baseUrl + 'userlogin/adminlogin', user).success(function(res, req) {

          if (res.status === true) {
            var adminsession = {
              'login': true,
              'adminid': res.record[0].id,
              'admin_email': res.record[0].email_id,
              'user_type': res.record[0].user_type
            };
            $cookieStore.put('adminsession', adminsession);
            console.log("adminsession:", adminsession);
            $scope.init();
            $state.go('mainview.welcome');
          } else if (res.status === false) {
            console.log("login failed");
            $scope.loginfailuremsg = 'Please Enter Valid Email Address and Password';
            $scope.showloginfailuremsg = true;
      
            // Simulate 2 seconds loading delay
            $timeout(function() {
              // Loadind done here - Show message for 3 more seconds.
              $timeout(function() {
                $scope.showloginfailuremsg = false;
              }, 3000);
              document.getElementById("loginForm").reset();
            }, 2000);
          }
        }).error(function() {
          console.log("Connection Problem.");
        });
      }

    };


    $scope.adminsignout = function() {
       $cookieStore.remove('adminsession');
       $location.path('login');
       $scope.init();
    };

    $scope.adminsignup = function(userinfo, valid) {
      userinfo.usertype = 'admin';
      if (valid) {
        $http.post(baseUrl + 'userlogin/adminsignup', userinfo).success(function(res, req) {
          if (res.status === true) {
            $scope.signupmsg = 'User Created Successfully. Please login .';
            $scope.showsignmsg = true;
      
            $timeout(function() {
              $timeout(function() {
                $scope.showsignmsg = false;
              }, 3000);
              document.getElementById("registerForm").reset();
              //$location.path('home');
            }, 2000);
      
          } else {
            $scope.signuperrmsg = res.message;
            $scope.showsignuperrmsg = true;
      
            $timeout(function() {
              $timeout(function() {
                $scope.showsignuperrmsg = false;
              }, 3000);
              document.getElementById("registerForm").reset();
              //$location.path('login');
            }, 2000);
          }
          console.log("res:",res);
      
        }).error(function() {
          console.log("problem In signup");
        });
      }
    };

  }
]);
