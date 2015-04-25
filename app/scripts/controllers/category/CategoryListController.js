/**
 * Created by gkaimakas on 4/20/15.
 */

angular.module('eventioWebApp')
    .controller('CategoryListController', [
        '$scope',
        'Restangular',
        'locales',
        function ($scope, Restangular, locales) {

            $scope.currentPage = 0;
            $scope.disablePaging = false;
            $scope.supportedLocales = locales;

            $scope.translateLocale = function(locale){
                for(var i=0; i< $scope.supportedLocales.length; i++){
                    if($scope.supportedLocales[i].value === locale){
                        return $scope.supportedLocales[i].translation;
                    }
                }
            };

            Restangular.one('category')
                .get()
                .then(function (categories) {
                    $scope.categories = categories.data.results;
                    $scope.nextUrl = categories.data.next;
                    $scope.currentPage = categories.data.currentPage;
                    $scope.totalPages = categories.data.totalPages;
                    $scope.disablePaging = false;
                });

            $scope.getMoreCategories = function () {
                if ($scope.currentPage == 0 || $scope.currentPage < $scope.totalPages) {
                    $scope.disablePaging = true;
                    Restangular.one('category')
                        .get({
                            page: $scope.currentPage + 1
                        })
                        .then(function (categories) {
                            if(categories.data.results.length > 0){
                                for(var i=0; i< categories.data.results.length; i++){
                                    $scope.categories.push(categories.data.results[i]);
                                }
                            }
                            $scope.currentPage = categories.data.currentPage;
                            $scope.totalPages = categories.data.totalPages;
                            $scope.disablePaging = false;
                        });
                }
            };


        }]);
