// Invoke 'strict' JavaScript mode

//'use strict';

// Set the main application name
var ApplicationModuleName = 'adminPanel';


// Create the main application
var SampleApplicationModule = angular.module('adminPanel', ['ui.router', 'ngCookies']);


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


angular.module('adminPanel').controller('MainController', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  '$timeout',
  '$cookieStore',
  function($scope, $http, $stateParams, $location, $rootScope, $state, $timeout, $cookieStore) {

    $scope.stateParams = $stateParams;
    //  console.log(store.get('userSession'));


    $scope.userlogin = function(user, loginForm) {
      if (loginForm.$valid) {
        if (user.email === 'test@ft.com' && user.password === '1234') {
          $state.go('mainview.welcome');
        }
      }

      // if (valid) {
      //   $http.post(baseUrl + 'userlogin/login', user).success(function(res, req) {
      //     //console.log("User Details:",res);
      //     if (res.status === true) {
      //       var userSession = {
      //         'login': true,
      //         'userid': res.record[0].id,
      //         'user_email': res.record[0].email_id,
      //         'address': res.record[0].address,
      //         'apartment': res.record[0].apartment,
      //         'city': res.record[0].city,
      //         'country': res.record[0].country,
      //         'first_name': res.record[0].first_name,
      //         'last_name': res.record[0].last_name,
      //         'phone_no': res.record[0].phone_no,
      //         'state': res.record[0].state,
      //         'zip': res.record[0].zip
      //       };
      //       $cookieStore.put('userSession', userSession);
      //       console.log("userDetails:", userSession);
      //       var myNewObject = $cookieStore.get('userSession');
      //       console.log(myNewObject);
      //       console.log($cookieStore.get('userSession'));
      //       $scope.init();
      //       $state.go('profileview');
      //     } else if (res.status === false) {
      //       console.log("login failed");
      //       $scope.loginfailuremsg = 'Please Enter Valid Email Address and Password';
      //       $scope.showloginfailuremsg = true;
      //
      //       // Simulate 2 seconds loading delay
      //       $timeout(function() {
      //         // Loadind done here - Show message for 3 more seconds.
      //         $timeout(function() {
      //           $scope.showloginfailuremsg = false;
      //         }, 3000);
      //         document.getElementById("loginform").reset();
      //       }, 2000);
      //     }
      //   }).error(function() {
      //     console.log("Connection Problem.");
      //   });
      // }

    };


    $scope.usersignout = function() {
      // store.remove('userSession');
      // $location.path('home');
      // $scope.init();
    };

    $scope.signup = function(userinfo, valid) {
      // if (valid) {
      //   $http.post(baseUrl + 'userlogin/signup', userinfo).success(function(res, req) {
      //     if (res.status === true) {
      //       $scope.signupmsg = 'User Created Successfully. Please login .';
      //       $scope.showsignmsg = true;
      //
      //       $timeout(function() {
      //         $timeout(function() {
      //           $scope.showsignmsg = false;
      //         }, 3000);
      //         document.getElementById("signupform").reset();
      //         //$location.path('home');
      //       }, 2000);
      //
      //     } else {
      //       $scope.signuperrmsg = res.message;
      //       $scope.showsignuperrmsg = true;
      //
      //       $timeout(function() {
      //         $timeout(function() {
      //           $scope.showsignuperrmsg = false;
      //         }, 3000);
      //         document.getElementById("signupform").reset();
      //         $location.path('login');
      //       }, 2000);
      //     }
      //
      //   }).error(function() {
      //     console.log("problem In signup");
      //   });
      // }
    };

  }
]);
