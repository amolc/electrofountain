// Invoke 'strict' JavaScript mode

//'use strict';

// Set the main application name
var ApplicationModuleName = 'DemoApp';


// Create the main application
var SampleApplicationModule = angular.module('DemoApp', ['ui.router', 'angular-storage', 'ngMessages', 'ngMaterial', 'ngMaterialDatePicker', 'ngCart', 'angular-storage', 'ngCookies']);

SampleApplicationModule.config(['$urlRouterProvider', '$stateProvider', 'storeProvider', function($urlRouterProvider, $stateProvider, storeProvider) {

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

  .state('editbillingaddress', {
    url: '/editbillingaddress',
    templateUrl: 'templates/billing_address.html'
  })

  .state('editshippingaddress', {
      url: '/editshippingaddress/:customer_id',
      templateUrl: 'templates/shipping_address.html'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: 'templates/cart_final.html'
    })

  .state('productdetailspage', {
    url: '/productdetailspage/:product_id',
    templateUrl: 'templates/product_details_page.html'
  });

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
  'ngCart',
  '$cookieStore',
  function($scope, $http, $stateParams, $location, $rootScope, $state, $timeout, store, ngCart, $cookieStore) {

    $scope.stateParams = $stateParams;
    //  console.log(store.get('userSession'));

    $scope.init = function() {
      $scope.userSession = $cookieStore.get('userSession') || {};
      //console.log($scope.userSession);
      if ($scope.userSession) {
        $scope.userdetails();
        //$scope.getshippingaddress();
      }
    };


    if ($scope.stateParams.product_id) {
      $scope.stateParams.product_id = parseInt($scope.stateParams.product_id);
      var extract = _.where($scope.products, {
        'id': $scope.stateParams.product_id
      });
      $scope.singleProduct = extract[0];
    }
    //  console.log(ngCart.getCart().items);
    $scope.item = {
      'id': 'E11',
      'name': 'Electric Key',
      'price': '150',
      'quantity': 5,
      'max': 3
    };

    $scope.products = [{
      'id': 1,
      'name': 'LCD DISPLAY',
      'description': 'Nextion HMI TFT Intelligent LCD Touch Display Module',
      'image_name': 'nx4024t032_1_-150x150.jpg',
      'image_name_350': 'nx4024t032_1_-350x350.jpg',
      'image_path': 'images',
      'price': '150',
      'quantity': 1,
      'max': 5,
      data: {}
    }, {
      'id': 2,
      'name': 'POWER TRANFER',
      'description': '1.5A Current Wireless Power Transfer Supply Pair Kit',
      'image_name': '1.5A-Current-Wireless-Power-Transfer-Kit-02-150x150.jpg',
      'image_name_350': '1.5A-Current-Wireless-Power-Transfer-Kit-02-350x350.jpg',
      'image_path': 'images',
      'price': '150',
      'quantity': 1,
      'max': 4,
      'data': {}
    }, {
      'id': 3,
      'name': 'WIFI MODULE',
      'description': 'Super-Mini360 DC-DC Synchronous-rectified Buck Step-Down Module',
      'image_name': 'Super-Mini360-DC-DC-Synchronous-rectified-Buck-Step-Down-Module-02-150x150.jpg',
      'image_name_350': 'Super-Mini360-DC-DC-Synchronous-rectified-Buck-Step-Down-Module-02-350x350.jpg',
      'image_path': 'images',
      'price': '150',
      'quantity': 1,
      'max': 6,
      'data': {}
    }, {
      'id': 4,
      'name': 'BUCK STEP-DOWN',
      'description': 'ESP8266 Wifi Module [Various Package]',
      'image_name': 'MT3608-2A-DC-DC-Boost-Step-up-ADJ-Power-Module-150x150.jpg',
      'image_name_350': 'ESP8266-IO-SMD-01-350x350.jpg',
      'image_path': 'images',
      'price': '150',
      'quantity': 1,
      'max': 3,
      'data': {}
    }];

    //console.log($scope.item);
    //console.log(ngCart.getTotalItems());
    $scope.total_length = ngCart.getTotalItems();


    /*
    @function userlogin
    @type post
    @author Sameer Vedpathak
    @initialDate
    @lastDate
    **/

    $scope.userlogin = function(user, valid) {
      if (valid) {
        $http.post(baseUrl + 'userlogin/login', user).success(function(res, req) {
          //console.log("User Details:",res);
          if (res.status === true) {
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
              'zip': res.record[0].zip
            };
            $cookieStore.put('userSession', userSession);
          //  console.log("userDetails:", userSession);
            var myNewObject = $cookieStore.get('userSession');
        //    console.log(myNewObject);
        //    console.log($cookieStore.get('userSession'));
            $scope.init();
            $state.go('profileview');
          } else if (res.status === false) {
        //    console.log("login failed");
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
        }).error(function(error) {
          console.log("Error",error);
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

    /**
      @function signup
      @author Sameer Vedpathak
      @initialDate
      @lastDate
    */
    $scope.signup = function(userinfo, valid) {
      if (valid) {
        $http.post(baseUrl + 'userlogin/signup', userinfo).success(function(res, req) {
          if (res.status === true) {
            $scope.signupmsg = 'User Created Successfully. Please login .';
            $scope.showsignmsg = true;

            $timeout(function() {
              $timeout(function() {
                $scope.showsignmsg = false;
              }, 3000);
              document.getElementById("signupform").reset();
              //$location.path('home');
            }, 2000);

          } else {
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

        }).error(function(error) {
          console.log("problem In signup",error);
        });
      }

    };

    /**
      @function Update Billing_address
      @author Sameer Vedpathak
      @initialDate
      @lastDate
    */

    $scope.Billing_address = function(billingadd, valid) {
      if (valid) {
        billingadd.userid = $scope.userSession.userid;
        $http.post(baseUrl + 'billing/updatebillingaddress', billingadd).success(function(res, req) {
          if (res.status === true) {
            $scope.billingadd_success = 'Billing Address Updated Successfully';
            $scope.showbillingadd_success = true;

            $timeout(function() {
              $timeout(function() {
                $scope.showbillingadd_success = false;
              }, 3000);
              document.getElementById("billing_address_frm").reset();
              $location.path('profileview');
            }, 2000);

          } else {
            $scope.billingadd_error = res.message;
            $scope.showbillingadd_error = true;

            $timeout(function() {
              $timeout(function() {
                $scope.showbillingadd_error = false;
              }, 3000);
            }, 2000);
          }

        }).error(function(error) {
          console.log("Error",error);
        });
      }

    };

    /**
      @function userdetails
      @author Sameer Vedpathak
      @initialDate
      @lastDate
    */

    $scope.userdetails = function() {
      var user_id = {
        userid: $scope.userSession.userid
      };

      $http.post(baseUrl + 'billing/getuserdetails', user_id).success(function(res, req) {
        $scope.bill_add_info = res.record[0];
      });

    };

    /**
      @function getshippingaddress
      @author Sameer Vedpathak
      @initialDate
      @lastDate
    */

    $scope.getshippingaddress = function() {
      var customer_id = {
        userid: $scope.userSession.userid
      };
      $http.post(baseUrl + 'shipping/getshippingaddress', customer_id).success(function(res, req) {
        $scope.usershippingdetails = res.record[0];
      }).error(function(error) {
        console.log("Error",error);
      });
    };




    /**
      @function for addupdate_shippingaddress
      @param {int}
      @author sameer vedpathak
      @initialDate
      @lastDate
    */

    $scope.addupdate_shippingaddress = function(shipping_address, valid) {
      if (valid) {
        if ($scope.stateParams.customer_id === '')
          $scope.add_shipping_details(shipping_address);
        if ($scope.stateParams.customer_id !== '')
          $scope.update_shipping_details(shipping_address);
      }
    };

    /**
      @function add_shipping_details
      @author Sameer Vedpathak
      @initialDate
      @lastDate
    */
    $scope.add_shipping_details = function(shipping_address) {

      shipping_address.userid = $scope.userSession.userid;
      $http.post(baseUrl + 'shipping/addshippingaddress', shipping_address).success(function(res, req) {
        if (res.status === true) {
          $scope.ship_add_success = 'Shipping Address Successfully Added';
          $scope.showshipaddmsg = true;
          // Simulate 2 seconds loading delay
          $timeout(function() {
            // Loadind done here - Show message for 3 more seconds.
            $timeout(function() {
              $scope.showshipaddmsg = false;
            }, 3000);
            document.getElementById("shipping_address_frm").reset();
            $state.go('profileview');
          }, 2000);
        }

      }).error(function(error) {
        console.log("Error",error);
      });
      /* } */
    };

    $scope.update_shipping_details = function(shipping_address) {
      $http.post(baseUrl + 'shipping/updateshippingaddress', shipping_address).success(function(res, req) {
        if (res.status === true) {
          $scope.getshippingaddress();
          $scope.ship_add_upt_success = 'Shipping Address Info Updated';
          $scope.showshipaddupdtmsg = true;
          // Simulate 2 seconds loading delay
          $timeout(function() {
            // Loadind done here - Show message for 3 more seconds.
            $timeout(function() {
              $scope.showshipaddupdtmsg = false;
            }, 3000);
            document.getElementById("shipping_address_frm").reset();
            $state.go('profileview');
          }, 2000);
        }
      }).error(function(error) {
        console.log("Error",error);
      });
    };
  }
]);
