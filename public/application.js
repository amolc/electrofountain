// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var ApplicationModuleName = 'DemoApp';


// Create the main application
var SampleApplicationModule = angular.module('DemoApp', ['ui.router','angular-storage','ngMessages','ngMaterial','ngMaterialDatePicker']);

SampleApplicationModule.config(['$urlRouterProvider', '$stateProvider','storeProvider', function($urlRouterProvider, $stateProvider , storeProvider) {
  storeProvider.setStore('sessionStorage');
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'templates/signin.html'
    })

    .state('welcomepage', {
      url: '/welcomepage/:todo_id',
      templateUrl: 'templates/welcomepage.html'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html'
    })

    .state('home', {
      url: '/home',
      templateUrl: 'templates/home_page.html'
    })

    .state('account', {
      url: '/account',
      templateUrl: 'templates/account.html'
    })

    .state('profileview', {
      url: '/profileview',
      templateUrl: 'templates/profile_view.html'
    })
    
}]);


angular.module('DemoApp').controller('MainController', [
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

       $scope.userSession = store.get('userSession') || {};
    }

    /*
    @function userlogin
    @type post
    @author Sameer Vedpathak
    @initialDate 
    @lastDate
    **/

    $scope.userlogin = function(user,valid) {
      if(valid){
          $http.post(baseUrl + 'login',user).success(function(res, req) {
            console.log("User Details:",res);
            if (res.status == true) {
              var userSession = {
                'login': true,
                'userid': res.record[0].id,
                'user_email': res.record[0].email_id,
                'address': res.record[0].address,
                'apartment': res.record[0].apartment,
                'city': res.record[0].city,
                'country': res.record[0].country,
                'first_name': res.record[0].first_name,
                'last_name': res.record[0].last_name,
                'phone_no': res.record[0].phone_no,
                'state': res.record[0].state,
                'zip' : res.record[0].zip
              };
              store.set('userSession', userSession);
              console.log("userDetails:",userSession);
              $scope.init();
              //$state.go('welcomepage');
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
                   document.getElementById("loginform").reset();
                }, 2000);
              }
          }).error(function() {
            console.log("Connection Problem.");
          });
        }
    };

    /**
      @function usersignout
      @author Sameer Vedpathak
      @initialDate 
      @lastDate
    */
    $scope.usersignout = function() {
      store.remove('userSession');
      $location.path('home');
      $scope.init();
    };

    $scope.signup = function(userinfo,valid){
      console.log("userinfo:",userinfo);
      if(valid){
         $http.post(baseUrl + 'signup', userinfo).success(function(res,req){
            console.log("res:",res);
            if(res.status == true){
                  $scope.signupmsg = 'User Created Successfully. Please login .';
                  $scope.showsignmsg = true;
                  
                  $timeout(function() {
                    $timeout(function() {
                      $scope.showsignmsg = false;
                    }, 3000);
                    document.getElementById("signupform").reset();
                    //$location.path('home');
                    }, 2000);
              
            }
            else{
              console.log("error");
                  $scope.signuperrmsg = res.message;
                  $scope.showsignuperrmsg = true;
                  
                  $timeout(function() {
                    $timeout(function() {
                      $scope.showsignuperrmsg = false;
                    }, 3000);
                    document.getElementById("signupform").reset();
                    $location.path('login');
                    }, 2000);
            }
            
         }).error(function(){
            console.log("problem In signup");
         });  
      }
      
    };
    
  }
]);
