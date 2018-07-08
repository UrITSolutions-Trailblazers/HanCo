app.controller('productController', ['$scope', '$rootScope', '$http', 'REST_URI',
    function ($scope, $rootScope, $http, REST_URI) {
        
        $rootScope.css = '-fixed';

        $scope.products = [];

        getAllProducts();

        function getAllProducts(){
            $http.get(REST_URI + '/user/products').then(
                (res)=>{
                    console.log(res.data)
                    $scope.products = res.data;
                },
                (err)=>{
                    console.log(err);
                }
            );
        }


    }
]);