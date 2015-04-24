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
            });

        $stateProvider
            .state('admin.category', {
                abstract : 'true',
                url : '/category',
                views : {
                    content : {
                        template : '<div ui-view="category"></div>'
                    }
                }
            })
            .state('admin.category.list',{
                url : '/',
                views : {
                    category : {
                        templateUrl : '../views/category/list.html',
                        controller : 'CategoryListController'
                    }
                }
            })
            .state('admin.category.create', {
                url : '/create',
                views : {
                    category : {
                        templateUrl : '../views/category/create.html',
                        controller : 'CategoryCreateController'
                    }
                }
            })
            .state('admin.category.update', {
                url : '/:id',
                views : {
                    category : {
                        templateUrl: '../views/category/update.html',
                        controller: 'CategoryUpdateController',
                        resolve : {
                            category : [
                                'Restangular',
                                '$stateParams',
                                function(Restangular, $stateParams){
                                    return Restangular
                                        .one('category', $stateParams.id)
                                        .get({ raw : true})
                                }
                            ]
                        }
                    }
                }
            });

    }])
    .config(['$urlRouterProvider', function($urlRouterProvider){
        $urlRouterProvider
            .otherwise('/');
    }])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider){
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(['RestangularProvider', '$stateProvider', function($restangularProvider, $state){
        $restangularProvider.setBaseUrl('http://api.eventio.gr');
        $restangularProvider.setFullResponse(true);
    }])
    .run([
        '$rootScope',
        'Restangular',
        '$state',
        function($rootScope, Restangular, $state){
            Restangular.setErrorInterceptor(function(response, deferred, responseHandler){
                if(response.status == 404){
                    $state.go('http.notFound');
                }else if(response.status == 500){
                    $state.go('http.serverError');
                }
            });
        }
    ]);
