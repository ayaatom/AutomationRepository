﻿var app = angular.module('main', ['ngRoute','ngTable','ngDialog','angularUtils.directives.dirPagination',
                                  'ui.bootstrap','ui.tree','ui']);


app.constant("AUTOMATION_CONSTANTS", (function() {
	console.log("automation constants");
  // Define your variable
	  var resource = '/AutomationService/services/';
  var coreresource = resource + 'core/';
  var loginresource = resource + 'login/';
  // Use the variable in your constants
  return {
    AUTOMATION_DOMAIN: resource,
    BASIC_INFO: resource + '/api/info'
  };
})());

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
console.log("home app main config");
    $routeProvider
            .when('/about',
            {
            	controller: 'AboutCtrl',
            	templateUrl: 'automation/app/partials/about.html'
            })
            .when('/contact',
            {
            	controller: 'ContactCtrl',
            	templateUrl: 'automation/app/partials/contact.html'
            })
            .when('/landing',
            {
                templateUrl: 'automation/app/partials/landingPage.html'
            })
            .when('/product',
            {
                templateUrl: 'automation/app/partials/product.html'
            })
            .when('/research',
            {
                templateUrl: 'automation/app/partials/research.html'
            })
            .when('/about',
            {
                templateUrl: 'automation/app/partials/about.html'
            })
            .when('/carrers',
            {
                templateUrl: 'automation/app/partials/carrers.html'
            })
        .otherwise({ redirectTo: '/landing' });
});



app.directive('footer', function () {
	 console.log("footer directive");
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "automation/app/partials/homefooter.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        	console.log("footer controller");
        }]
    }
});

app.directive('header', function ($rootScope, $location) {
	 console.log("header directive");
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "automation/app/partials/homeheader.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        	console.log("header controller");
        }]
    }
});
