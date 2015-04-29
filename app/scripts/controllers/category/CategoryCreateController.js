/**
 * Created by gkaimakas on 4/19/15.
 */

angular.module('eventioWebApp')
    .controller('CategoryCreateController', [
        '$scope',
        'locales',
        'Restangular',
        '$mdToast',
        'i18nService',
        function ($scope, locales, Restangular, $mdToast, i18n) {
            $scope.supportedLocales = locales;
            $scope.addedLocales = [];
            $scope.disableSubmit = false;

            $scope.addAdditionalLocale = function () {
                $scope.addedLocales.push((new Date()).getTime());
            };

            $scope.loadParents = function(){
                return Restangular
                    .all('category')
                    .getList()
                    .then(function(categories){
                        $scope.availableParents = categories.data;
                    })
                    .catch(function(err){

                    });
            };

            $scope.category = {};
            $scope.category.additionalLocales = [];
            $scope.category.additionalValues = [];

            $scope.removeAdditionalLocale = function (index) {
                $scope.addedLocales.splice(index, 1);
                $scope.category.additionalLocales.splice(index, 1);
                $scope.category.additionalValues.splice(index, 1);
            };

            $scope.submit = function (form, data) {
                console.log(data);
                $scope.disableSubmit = true;
                var locales = [];
                var values = [];

                angular.copy(data.additionalLocales, locales);
                angular.copy(data.additionalValues, values);

                locales.push(data.default_locale);
                values.push(data.name);

                var objFinal = {
                    name: i18n.serializeToJSON(values, locales),
                    default_locale: data.default_locale,
                    parent : data.parent
                };

                console.log(objFinal);
                Restangular
                    .all('category')
                    .post(objFinal)
                    .then(function(res){
                       console.log(res);
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                    .finally(function(){
                        $scope.disableSubmit = false;
                    })
            }
        }
    ])
;