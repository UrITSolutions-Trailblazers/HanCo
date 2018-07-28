app.controller('homeController', ['$scope', '$http', 'REST_URI',
    function ($scope, $http, REST_URI) {

        var me = this;

        me.products = [];

        $(document).ready(function () {
            $('.slider').slider({
                indicators: false,
                duration: 650,
                interval: 3500,
                height: 600
            });
        });

        getAllProducts()

        function getAllProducts() {
            let filter = { filter: me.filter };
            $http.post(REST_URI + '/user/products', filter).then(
                (res) => {
                    me.products = res.data.products;
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }
]);