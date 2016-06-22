// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var CashFlow = angular.module('CashFlow', ['ionic','ion-floating-menu'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle("center");


})
.config(function ( $ionicConfigProvider) {
        //Enable cross domain calls
       
        //Remove the header containing XMLHttpRequest used to identify ajax call 
        //that would prevent CORS from working
        
       
        $ionicConfigProvider.backButton.text(' ').icon('ion-chevron-left');
        $ionicConfigProvider.views.transition('ios');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.views.transition('android');
        $ionicConfigProvider.backButton.previousTitleText(false)
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $ionicConfigProvider.tabs.position('bottom');
    })
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

.state('DashBoard',{
    url: '/DashBoard',
    //  abstract: true,
    templateUrl: 'templates/Dashboard.html',
    controller : 'DashboardCtrl'

})
  // setup an abstract state for the tabs directive
    .state('CashTabs', {
    url: '/CashFlow',
    abstract: true,
    templateUrl: 'templates/CashTabs.html',
    controller:'IndexCtrl'
  })

  // Each tab has its own nav history stack:

  .state('CashTabs.ClientProfile', {
    url: '/ClientProfile',
    views: {
      'ClientProfile-content': {
        templateUrl: 'templates/ClientProfile.html',
        controller: 'ClientProfileCtrl'
      }
    }
  })

  .state('CashTabs.Scenario', {
      url: '/Scenario',
      views: {
        'Scenario-content': {
          templateUrl: 'templates/ClientScenario.html',
          controller: 'ScenarioCtrl'
        }
      }
    })
  .state('CashTabs.Goals', {
    url: '/Goals&Strategy',
    views: {
      'Goals-content': {
        templateUrl: 'templates/goals.html',
        controller: 'GoalsCtrl'
      }
    }
  })
  .state('CashTabs.Settings', {
    url: '/Settings',
    views: {
      'Settings-content': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })
 .state('ScenarioDetails',{
    url:'/ScenarioDetails',
    templateUrl:'templates/ScenarioDetails.html',
    controller:'ScenarioDetailsCtrl'
 });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/DashBoard');

});
