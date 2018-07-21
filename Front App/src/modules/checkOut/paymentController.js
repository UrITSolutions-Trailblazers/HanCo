app.controller('paymentController', ['$scope', '$rootScope', '$http', 'REST_URI', '$location', '$cookies', '$route',
    function ($scope, $rootScope, $http, REST_URI, $location, $cookies, $route) {
        var options = {
            "key": "rzp_test_O2Vm6ud9FSWW1J",
            "amount": 100,
            "name": "The HanCo",
            "description": "Purchase Description",
            "prefill": {
                "name": "Harshil Mathur",
                "email": "harshil@razorpay.com"
            },
            "notes": {
                "address": "Hello World"
            },
            "theme": {
                "color": "#F37254"
            },
            handler: function () {
                alert('handler cllad')
                console.log(arguments)
            }
        };

        $scope.pay = function () {
            var rzp = new Razorpay(options);
            rzp.open();
        };
    }
])