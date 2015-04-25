/**
 * Created by gkaimakas on 4/24/15.
 */

'use strict';

angular.module('eventioWebApp')
    .controller('CategoryUpdateController', [
        '$scope',
        'Restangular',
        'i18nService',
        'locales',
        'category',
        function($scope, Restangular, i18n, locales, category){
            category = category.data;

            $scope.supportedLocales = locales;
            $scope.addedLocales = [];

            var deserializedArray =i18n.deserializeFromJSON(category.name, category.default_locale);
            var uniqueId = (new Date()).getTime();
            for(var i=0; i<deserializedArray.locales.length; i++){
                $scope.addedLocales.push(uniqueId+i);
            }

            $scope.category = {};
            $scope.category.additionalLocales = [];
            $scope.category.additionalValues = [];

            $scope.category.id = category.id;
            $scope.category.name = category.name[category.default_locale];
            $scope.category.locale = category.default_locale;
            $scope.category.additionalLocales = deserializedArray.locales;
            $scope.category.additionalValues = deserializedArray.values;

            $scope.addAdditionalLocale = function () {
                $scope.addedLocales.push((new Date()).getTime());
            };

            $scope.removeAdditionalLocale = function (index) {
                $scope.addedLocales.splice(index, 1);
                $scope.category.additionalLocales.splice(index, 1);
                $scope.category.additionalValues.splice(index, 1);
            };
            $scope.submit = function (form, data) {
                var locales = [];
                var values = [];

                angular.copy(data.additionalLocales, locales);
                angular.copy(data.additionalValues, values);

                locales.push(data.locale);
                values.push(data.name);

                var objFinal = {
                    name: i18n.serializeToJSON(values, locales),
                    locale: data.locale
                };

                Restangular
                    .one('category', category.id)
                    .put(objFinal)
                    .then(function(res){
                       console.log(res);
                    });
            };

            $scope.remove = function(){
                Restangular
                    .one('category', category.id)
                    .remove()
                    .then(function(result){
                        console.log(result);
                    })
                    .catch(function(err){
                       console.log(err);
                    });
            };

        }

    ]);
