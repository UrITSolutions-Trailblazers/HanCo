app.controller('ordersController', ['$scope', '$rootScope', '$http', 'REST_URI', '$location', '$cookies', '$route',
    function ($scope, $rootScope, $http, REST_URI, $location, $cookies, $route) {

        var me = this;

        me.orders = [];
        me.rating;
        getOrders();

        function getOrders() {
            $http.get(REST_URI + '/profile/orders').then(
                (res) => {
                    me.orders = res.data;
                    console.info(me.orders);
                    $(document).ready(function () {
                        $('.tooltipped').tooltip();
                    });
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        me.rate = function (index) {
            console.log(index)
            // console.log(me.orders[index])
            $http.post(REST_URI + '/profile/rating', { data: me.orders[index] })
                .then((res) => {
                    M.toast({ html: 'Thank you for feedback.' })
                }, (err) => {
                    M.toast({ html: 'Something went wrong.' })
                })
        }

    }]
);