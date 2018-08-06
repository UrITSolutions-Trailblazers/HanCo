app.controller('productController', ['$scope', '$rootScope', '$http', 'REST_URI', '$location', '$cookies', '$route',
    function ($scope, $rootScope, $http, REST_URI, $location, $cookies, $route) {


        /**
         * MaterializeCSS JQuery initialization.
         * **/
        $(document).ready(function () {
            $('.sidenav').sidenav({
                draggable: true
            });
            $('.fixed-action-btn').floatingActionButton();
            $('.tooltipped').tooltip();
        });

        /**
         * Angular Controller elements.
         * **/
        $rootScope.css = '-fixed';
        var me = this;
        me.products = [];
        me.wishlist = [];
        me.filter = {};
        me.sort = {};
        me.currentPath = '';
        me.productsLoader = false;
        me.count;
        me.maxPage;
        me.pages = [];
        me.currentPage = 1;
        me.prev = false;
        me.next = true;

        var section = $route.current.params.category;

        var productId = $route.current.params.productId;
        // console.log($route.current.$$route.originalPath);

        me.filter = {
            section: section
        };
        me.currentPath = $route.current.$$route.originalPath;

        if (me.currentPath === '/products' || section) { getAllProducts(); }
        else if (productId) getProductById(productId);

        me.filterProducts = function () {
            me.currentPage = 1;
            me.products = [];
            getAllProducts();
            me.prev = false;
            me.next = true;
        }

        me.nextPage = function () {
            if (me.currentPage === me.maxPage) return;
            me.products = [];
            me.currentPage = me.currentPage + 1;
            getAllProducts();
            me.prev = true;
        }

        me.previousPage = function () {
            if (me.currentPage === 1) return;
            me.products = [];
            me.currentPage = me.currentPage - 1;
            getAllProducts();
            if (me.currentPage === me.maxPage) me.next = false;
        }

        function getAllProducts() {
            me.productsLoader = true;
            let filter = { filter: me.filter, sort: me.sort};
            console.log(filter);
            filter.page = me.currentPage;
            $http.post(REST_URI + '/user/products', filter).then(
                (res) => {
                    me.productsLoader = false;
                    me.products = res.data.products;
                    console.log(me.products)
                    me.count = res.data.count;
                    let maxPage = me.count / 24;
                    me.maxPage = Math.ceil(maxPage)
                    for (let index = 0; index < me.maxPage; index++) {
                        me.pages[index] = index + 1;
                    }

                    getWishlist();
                },
                (err) => {
                    me.productsLoader = false;
                    console.log(err);
                }
            );
        }

        function getProductById(id) {
            $http.post(REST_URI + '/user/product', { id: id }).then(
                (res) => {
                    // console.log(res.data)
                    me.currentProduct = res.data;
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        $scope.addToCart = function (id, supplier) {
            $http.post(REST_URI + '/profile/addToCart', { id: id, supplier: supplier }).then(
                (res) => {
                    M.toast({ html: 'Added to Cart.' })
                },
                (err) => {
                    if(err.status === 400) $('#loginModal').modal('open');
                    else M.toast({ html: 'Something went wrong.' });
                }
            );
        }

        function getWishlist() {
            $http.get(REST_URI + '/profile/wishlist')
                .then((res) => {
                    me.wishlist = res.data;
                    console.log(me.wishlist)
                    me.products.forEach(pro => {
                        me.wishlist.products.forEach(wish => {
                            if (pro._id === wish._id) {
                                pro.wish = true;
                            }
                        });
                    });
                }, (err) => {
                    
                    if(err.status !== 400) console.log(err);
                })
        }

        me.addToWishlist = function (index) {
            $http.post(REST_URI + '/profile/wishlist', { product: me.products[index] })
                .then((res) => {
                    M.toast({ html: 'Added to wishlist.' });
                    me.wishlist = res.data;
                    me.products.forEach(pro => {
                        me.wishlist.products.forEach(wish => {
                            if (pro._id === wish._id) {
                                pro.wish = true;
                            }
                        });
                    });
                }, (err) => {
                    console.log(err.status);
                    if(err.status === 400) $('#loginModal').modal('open');
                    else M.toast({ html: 'Something went wrong.' });
                })
        }
    }
]);