// Invoke 'strict' JavaScript mode

//'use strict';

// Set the main application name
var ApplicationModuleName = 'DemoApp';

// stripe secreet key
Stripe.setPublishableKey('pk_test_OKKZyHD6nnZujaeDy0ks4fWa');

// Create the main application
var SampleApplicationModule = angular.module('DemoApp', ['ui.router', 'angular-storage', 'ngMessages', 'ngMaterial', 'ngMaterialDatePicker', 'ngCart', 'angular-storage', 'ngCookies', 'angularPayments']);

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
        .state('orders', {
            url: '/orders',
            templateUrl: 'templates/orders.html',
            controller : 'ordercontroller'
        })
        .state('orderdetails', {
            url: '/orderdetails/:order_id',
            templateUrl: 'templates/orderdetails.html',
            controller : 'ordercontroller'
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

        $scope.init = function() {
            $scope.userSession = $cookieStore.get('userSession') || {};
            if ($scope.userSession) {
                $scope.userdetails();
                //$scope.getshippingaddress();
            }
        };

        $scope.userSession = $cookieStore.get('userSession') || {};
        // console.log($scope.userSession);

        if ($scope.userSession.userid) {
        //    console.log('User Id ', $scope.userSession.userid);
        } else {
            $scope.userSession.userid = '';
        //    console.log('Not Logged In User', $scope.userSession.userid);
        }

        $scope.hideAlerts = function() {
            $scope.stripeError = null;
            $scope.stripeToken = null;
        };

        // $scope.showorderSuccess = true;
        // $scope.orderSuccess = 'Ordered Placed Successfully';
        // $scope.showorderFailure = true;
        // $scope.orderFailure = 'Failed to place Order';

        $scope.stripeCallback = function(code, result) {
            if (result.error) {
                $scope.stripeError = result.error.message;
                $timeout(function() {
                    $timeout(function() {
                        $scope.hideAlerts();
                    }, 3000);
                }, 2000);
            } else {
                $scope.stripeToken = result.id;
                var cart = store.get('cart');
              //  console.log('cart', cart);
            //    console.log('cart items', cart.items);

                var billingData = {
                    stripeToken: result.id,
                    totalAmount: ngCart.getSubTotal(),
                    metaData: cart.items,
                    customer_id: $scope.userSession.userid
                };

                $http.post(baseUrl + 'billing/charge', billingData).success(function(res, req) {
                  //  console.log('res', res);
                    if (res.status === true) {
                //        console.log('Ordered Placed Successfully');
                        $scope.showorderSuccess = true;
                        $scope.orderSuccess = 'Ordered Placed Successfully';
                        $timeout(function() {
                            $timeout(function() {
                                $scope.showorderSuccess = false;
                                ngCart.empty();
                                $state.go('profileview');
                            }, 3000);
                        }, 2000);

                    } else {

                        console.log('Failed to place order');
                        $scope.showorderFailure = true;
                        $scope.orderFailure = 'Failed to place Order';
                        $timeout(function() {
                            $timeout(function() {
                                $scope.showorderFailure = false;
                            }, 3000);
                        }, 2000);

                    }
                }).error(function(error) {
                    console.log("Error", error);
                });
            }
        };

        if ($scope.stateParams.product_id) {
            $scope.stateParams.product_id = parseInt($scope.stateParams.product_id);
            var extract = _.where($scope.products, {
                'id': $scope.stateParams.product_id
            });
            $scope.singleProduct = extract[0];
        }

        $scope.products = [{
            'id': 1,
            'name': 'LCD DISPLAY',
            'description': 'Nextion HMI TFT Intelligent LCD Touch Display Module',
            'image_name': 'nx4024t032_1_-150x150.jpg',
            'image_name_350': 'nx4024t032_1_-350x350.jpg',
            'image_path': 'images',
            'price': '80',
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
            'price': '70',
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
            'price': '100',
            'quantity': 1,
            'max': 3,
            'data': {}
        }];

        $scope.total_length = ngCart.getTotalItems();
        // console.log($scope.total_length);

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
                        $scope.init();
                        $state.go('profileview');
                    } else if (res.status === false) {
                        //    console.log("login failed");
                        $scope.loginfailuremsg = 'Please Enter Valid Email Address and Password';
                        $scope.showloginfailuremsg = true;
                        $timeout(function() {
                            $timeout(function() {
                                $scope.showloginfailuremsg = false;
                            }, 3000);
                            document.getElementById("loginform").reset();
                        }, 2000);
                    }
                }).error(function(error) {
                    console.log("Error", error);
                });
            }
        };

        $scope.usersignout = function() {
            $cookieStore.remove('userSession');
            $location.path('home');
            $scope.init();
        };

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
                    console.log("problem In signup", error);
                });
            }

        };

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
                    console.log("Error", error);
                });
            }
        };

        $scope.userdetails = function() {
            var user_id = {
                userid: $scope.userSession.userid
            };

            $http.post(baseUrl + 'billing/getuserdetails', user_id).success(function(res, req) {
                $scope.bill_add_info = res.record[0];
            });

        };

        $scope.getshippingaddress = function() {
            var customer_id = {
                userid: $scope.userSession.userid
            };
            $http.post(baseUrl + 'shipping/getshippingaddress', customer_id).success(function(res, req) {
                $scope.usershippingdetails = res.record[0];
            }).error(function(error) {
                console.log("Error", error);
            });
        };

        $scope.addupdate_shippingaddress = function(shipping_address, valid) {
            if (valid) {
                if ($scope.stateParams.customer_id === '')
                    $scope.add_shipping_details(shipping_address);
                if ($scope.stateParams.customer_id !== '')
                    $scope.update_shipping_details(shipping_address);
            }
        };

        $scope.add_shipping_details = function(shipping_address) {

            shipping_address.userid = $scope.userSession.userid;
            $http.post(baseUrl + 'shipping/addshippingaddress', shipping_address).success(function(res, req) {
                if (res.status === true) {
                    $scope.ship_add_success = 'Shipping Address Successfully Added';
                    $scope.showshipaddmsg = true;

                    $timeout(function() {
                        $timeout(function() {
                            $scope.showshipaddmsg = false;
                        }, 3000);
                        document.getElementById("shipping_address_frm").reset();
                        $state.go('profileview');
                    }, 2000);
                }

            }).error(function(error) {
                console.log("Error", error);
            });
        };

        $scope.update_shipping_details = function(shipping_address) {
            $http.post(baseUrl + 'shipping/updateshippingaddress', shipping_address).success(function(res, req) {
                if (res.status === true) {
                    $scope.getshippingaddress();
                    $scope.ship_add_upt_success = 'Shipping Address Info Updated';
                    $scope.showshipaddupdtmsg = true;

                    $timeout(function() {
                        $timeout(function() {
                            $scope.showshipaddupdtmsg = false;
                        }, 3000);
                        document.getElementById("shipping_address_frm").reset();
                        $state.go('profileview');
                    }, 2000);
                }

            }).error(function(error) {
                console.log("Error", error);
            });
        };

        $scope.getallcategory = function(){
            $http.get(baseUrl +'category/getallcategories').success(function(res,req){
                $scope.Allcategories = res.record;
            }).error(function(error){
                console.log("Error");
            });
        }
        $scope.getallcategory();

        $scope.getsubcategorybycatid = function(catinfo){
            categoryid = {'categoryid':catinfo.category_id}
            $http.post(baseUrl + 'subcategorytwo/getSubcategorybyCategoryid', categoryid).success(function(res,req){
                $scope.subcategorybycatid = res.record;
            }).error(function(error){
                console.log("error");
            });
        }

        $scope.getsubcategorytwo_bysubcatid = function(subcatinfo){
            console.log("subcatinfo: ",subcatinfo);
            var subcatinfo = {'sub_category_id':subcatinfo.sub_category_id}
            $http.post(baseUrl + 'subcategorytwo/getSubcategorytwobyCategoryid', subcatinfo).success(function(res,req){
                console.log("res:",res.record);
                $scope.subcategorytwolists = res.record;
                //$scope.subcategorybycatid = res.record;
            }).error(function(error){
               console.log("error");
            });
        }

    }
]);
