angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: 'search.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings.html'
    })
    .state('alerts', {
        url: "/alerts",
        templateUrl: "alerts.html",
        controller: 'AlertsCtrl'
    })
    .state('elasticsearch', {
        url: "/elasticsearch",
        templateUrl: "elasticsearch.html",
        controller: 'HomeTabCtrl'
    })
    .state('elasticsearch', {
        url: "/elasticsearch",
        templateUrl: "elasticsearch.html",
        controller: 'HomeTabCtrl'
    })
    .state('save', {
        url: "/save",
        templateUrl: "elasticsearch.html",
        controller: 'HomeTabCtrl'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/alerts");

})
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabCtrl', function($scope) {
    alert("he");
});
.controller('AlertsCtrl', function($scope) {
    $scope.alertsList = [
    { price: '$4.99', text: 'Pizza' },
    { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
        { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
        { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
        { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
        { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
        { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
        { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
        { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
        { price: '$2.99', text: 'Burger' },
    { price: '$3.99', text: 'Pasta' },
  ];
});