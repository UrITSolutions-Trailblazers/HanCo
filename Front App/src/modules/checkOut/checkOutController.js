app.controller('checkOutController', ['$scope', '$rootScope', '$http', 'REST_URI', '$location', '$cookies', '$route',
    function ($scope, $rootScope, $http, REST_URI, $location, $cookies, $route) {

        $scope.cart = {};
        $scope.addresses = [];
        $scope.loader = false;

        getCart();
        getAddresses();

        var options = {};

        function getCart() {
            console.log('loading cart')
            $http.get(REST_URI + '/profile/cart').then(
                (res) => {
                    $scope.cart = res.data;
                    console.log($scope.cart);
                    options = {
                        "key": "rzp_test_O2Vm6ud9FSWW1J",
                        "amount": $scope.cart.grandTotal + '00',
                        "name": "The HanCo.",
                        "description": "Purchase Description",
                        "prefill": {
                            "name": $rootScope.currentUser.firstName,
                            "email": $rootScope.currentUser.email
                        },
                        "notes": {
                            "address": "Hello World"
                        },
                        "theme": {
                            "color": "#F37254"
                        },
                        handler: function (response) {
                            console.log(response);      //razorpay_payment_id
                            paymentDone(response.razorpay_payment_id);
                        }
                    };
                },
                (err) => {
                    M.toast({ html: 'Cannot Load cart.' })
                    M.toast({ html: 'Something went wrong' })
                }
            );
        }

        function getAddresses() {
            console.log('loading address')
            $http.get(REST_URI + '/profile/address').then(
                (res) => {
                    $scope.addresses = res.data;
                    console.log(res.data);
                },
                (err) => {
                    M.toast({ html: 'Cannot Load address.' })
                    M.toast({ html: 'Something went wrong' })
                }
            );
        }
        $scope.addAddress = function () {
            $http.post(REST_URI + '/profile/address', $scope.address).then(
                (res) => {
                    M.toast({ html: 'Address successfully added.' })
                    $scope.addresses = res.data.addresses;
                },
                (err) => {
                    M.toast({ html: 'Cannot Load address.' })
                    M.toast({ html: 'Something went wrong' })
                }
            );
        }

        $scope.pay = function () {
            var rzp = new Razorpay(options);
            rzp.open();
        };

        $scope.setAddress = function (i) {
            $scope.currentAddress = $scope.addresses[i];
            console.log($scope.currentAddress);
        }

        function paymentDone(transactionId) {
            $scope.loader = true;
            $http.post(REST_URI + '/payment/done', { transactionId: transactionId, address: $scope.currentAddress }).then(
                (res) => {
                    $scope.loader = false;
                    $('#orderModal').modal('close')
                    M.toast({ html: 'Payment successful.' })
                },
                (err) => {
                    M.toast({ html: 'Cannot Load address.' })
                    M.toast({ html: 'Something went wrong' })
                }
            );
        }
    }
])