app.controller('suppliersController', ['$scope', '$rootScope', '$cookies', '$http', 'REST_URI', 'Upload',
    function ($scope, $rootScope, $cookies, $http, REST_URI, Upload) {
        $scope.category = {};
        $scope.product = {};
        $scope.images;
        $scope.products = [];

        getAllProducts();

        function getAllProducts() {
            $http.get(REST_URI + '/user/products').then(
                (res) => {
                    console.log(res.data)
                    $scope.products = res.data;
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        $scope.edit = function (i) {
            $scope.product = $scope.products[i];
        }

        $scope.addCategory = function () {
            $http.post(REST_URI + '/supplier/category', $scope.category).then(
                (res) => {
                    $rootScope.categories = res.data;
                    $scope.category = {};
                },
                (err) => {
                    if (err.data.code === 11000) {
                        console.log('Category you entered is already in the DB.')
                    }
                }
            );
        }
        $scope.addProduct = function () {
            $scope.product.images = [];
            Upload.upload({
                url: REST_URI + '/supplier/product/image/upload',
                data: $scope.product
            }).then((res) => {
                console.log(res.data);
            }, (err) => {
                console.log(err);
            });
        }
    }
])