app.controller('adminController', ['$scope', '$rootScope', '$cookies', '$http', 'REST_URI',
    function ($scope, $rootScope, $cookies, $http, REST_URI) {

        $scope.supplier = {};
        $scope.suppliers = [];
        $scope.isLoader = false;

        $(document).ready(function () {
            $('.modal').modal();
        });

        getAll();

        $scope.addSupplier = function () {
            $scope.isLoader = true;
            console.log($scope.supplier)
            $http.post(REST_URI + '/admin/supplier', $scope.supplier).then(
                (res) => {
                    $scope.isLoader = false;
                    M.toast({html: 'Supplier Added.'})
                    getAll();
                    // $scope.supplier = {};
                },
                (err) => {
                    $scope.isLoader = false;
                    M.toast({html: 'Oops something went wrong.'})
                    console.log(err);

                }
            )
        }

        function getAll() {
            $http.get(REST_URI + '/admin/supplier/all').then(
                (res) => {
                    $scope.suppliers = res.data;
                },
                (err) => {
                    console.error(err);
                }
            )
        }
    }
]);