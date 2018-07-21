app.controller('ordersController', ['$scope', '$rootScope', '$http', 'REST_URI', '$location', '$cookies', '$route',
    function ($scope, $rootScope, $http, REST_URI, $location, $cookies, $route) {

        $scope.orders = [];

        getOrders();

        function getOrders() {
            $http.get(REST_URI + '/profile/orders').then(
                (res) => {
                    $scope.orders = res.data;
                    console.info($scope.orders);
                    $(document).ready(function () {
                        $('.tooltipped').tooltip();
                    });
                },
                (err) => {
                    console.log(err);
                }
            );
        }

    }]
);