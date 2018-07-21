app.controller('cartController', ['$scope', '$rootScope', '$cookies', '$http', 'REST_URI',
    function ($scope, $rootScope, $cookies, $http, REST_URI) {

        $scope.cart = {};

        getCart();

        function getCart() {
            console.log('loading cart')
            $http.get(REST_URI + '/profile/cart').then(
                (res) => {
                    console.log('cart loaded')
                    console.log(res.data);
                    $scope.cart = res.data;
                },
                (err) => {
                    M.toast({ html: 'Cannot Load cart.' })
                    M.toast({ html: 'Something went wrong' })
                }
            );
        }

    }
])