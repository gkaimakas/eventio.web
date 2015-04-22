'use strict';

/**
 * @ngdoc overview
 * @name eventiowebApp
 * @description
 * # eventiowebApp
 *
 * Main module of the application.
 */
angular
    .module('eventioWebApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ngMaterial',
        'angular-loading-bar',
        'pascalprecht.translate',
        'restangular',
        'infinite-scroll'
    ])
    .constant('locales', [
        { value : 'el-gr', translation : 'locale_el_gr'},
        { value : 'en', translation : 'locale_en'},
        { value : 'fr', translation : 'locale_fr'},
    ])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('el-gr');
        $translateProvider.fallbackLanguage('el-gr');
    }])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('plain', {
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('plain.comingSoon', {
                url : '/',
                templateUrl : '../views/comingSoon.html'
            });

        $stateProvider
            .state('http', {
                abstract : true,
                template:'<ui-view></ui-view>'
            })
            .state('http.notFound', {
                url : '/notFound',
                templateUrl : '../views/http/notFound.html'
            })
            .state('http.badRequest', {
                url : '/badRequest',
                templateUrl : '../views/http/badRequest.html'
            })
            .state('http.serverError', {
                url : '/serverError',
                templateUrl : '../views/http/serverError.html'
            });

        $stateProvider
            .state('admin', {
                //abstract : true,
                url : '/admin',
                templateUrl : '../views/layouts/admin_layout.html'
            })
            .state('admin.account', {
                url : '/account',
                views : {
                    content : {
                        template : 'account view'
                    }
                }
            })
            .state('admin.category',{
                url : '/category',
                views : {
                    content : {
                        templateUrl : '../views/lists/categories.html',
                        controller : 'CategoryListController'
                    }
                }
            })
            .state('admin.categoryCreate', {
                url : '/category/create',
                views : {
                    content : {
                        templateUrl : '../views/forms/category_create.html',
                        controller : 'CategoryCreateController'
                    }
                }
            })
            .state('admin.categoryView', {
                url : '/category/:id',
                views : {
                    content : {
                        template: 'HELLO'
                    }
                }
            });

    }])
    .config(['$urlRouterProvider', function($urlRouterProvider){
        $urlRouterProvider
            .otherwise('/notFound');
    }])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider){
        //cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(['RestangularProvider', function($restangularProvider){
        $restangularProvider.setBaseUrl('http://api.eventio.gr');
    }]);
