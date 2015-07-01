// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'highcharts-ng'])

.run(function($ionicPlatform) {
//  $ionicPlatform.ready(function() {
//    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//    // for form inputs)
//    if (window.cordova && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    }
//    if (window.StatusBar) {
//      // org.apache.cordova.statusbar required
//      StatusBar.styleDefault();
//    }
//   
//  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  $stateProvider
  .state('load', {
      url: "/load",
       templateUrl: "templates/load.html",
      controller: 'load'
    })
  .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })
    .state('checkaccnt', {
      url: "/checkaccnt",
      controller: 'CheckAccntCtrl'
    })
    .state('createaccnt', {
      url: "/createaccnt",
      templateUrl: "templates/createaccnt.html",
      controller: 'CreateAccntCtrl'
    })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/hosts.html",
        controller: 'Hosts'
      }
    }
  })
  .state('app.searchdetail', {
      url: '/search/:hostId',
      views: {
        'menuContent': {
          templateUrl: 'templates/charts-detail.html',
          controller: 'HostsCtrl'
        }
      }
    })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html"
      }
    }
  })
  
  .state('app.single', {
      url: '/playlists/:chartId',
      views: {
        'menuContent': {
          templateUrl: 'templates/charts-detail.html',
          controller: 'PlaylistCtrl'
        }
      }
    })
    
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/alerts.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

//  .state('app.single', {
//    url: "/playlists/:playlistId",
//    views: {
//      'menuContent': {
//        templateUrl: "templates/playlist.html",
//        controller: 'PlaylistCtrl'
//      }
//    }
//  });
  // if none of the above states are matched, use this as the fallback
  
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $urlRouterProvider.otherwise('/load');
});

