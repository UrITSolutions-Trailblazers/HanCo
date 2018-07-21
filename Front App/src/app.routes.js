/**
 * Angular Routes
 */
app.config(function ($routeProvider) {
    console.log('Angular Route active.')
    $routeProvider
        .when('/home', {
            templateUrl: './src/modules/home/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl',
            css: './asset/css/myCSS.css'
        })
        .when('/admin', {
            templateUrl: './src/modules/admin/admin.html',
            controller: 'adminController',
            controllerAs: 'adminCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/suppliers', {
            templateUrl: './src/modules/suppliers/suppliers.html',
            controller: 'suppliersController',
            controllerAs: 'suppliersCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/product/:productId',{
            templateUrl: './src/modules/products/product.html',
            controller: 'productController',
            controllerAs: 'productCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/cart',{
            templateUrl: './src/modules/cart/cart.html',
            controller: 'cartController',
            controllerAs: 'cartCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/checkOut/:cartId',{
            templateUrl: './src/modules/checkOut/checkOut.html',
            controller: 'checkOutController',
            controllerAs: 'checkOutCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/about',{
            templateUrl: './src/modules/about/about.html'
        })
        .when('/products', {
            templateUrl: './src/modules/products/products.html',
            controller: 'productController',
            controllerAs: 'productCtrl',
            css: './asset/css/productCSS.css'
        })
        .when('/products/:category', {
            templateUrl: './src/modules/products/products.html',
            controller: 'productController',
            controllerAs: 'productCtrl',
            css: './asset/css/productCSS.css'
        })
        .when('/pay',{
            templateUrl: './src/modules/checkOut/payment.html',
            controller: 'paymentController',
            controllerAs: 'paymentCtrl',
            css: './asset/css/otherCSS.css'
        })
        .when('/orders',{
            templateUrl: './src/modules/orders/orders.html',
            controller: 'ordersController',
            controllerAs: 'ordersCtrl',
            css: './asset/css/otherCSS.css'
        })
})

