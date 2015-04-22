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

            $scope.addAdditionalLocale = function () {
                $scope.addedLocales.push((new Date()).getTime());
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
                var locales = [];
                var values = [];

                angular.copy(data.additionalLocales, locales);
                angular.copy(data.additionalValues, values);

                locales.push(data.locale);
                values.push(data.name);

                var objFinal = {
                    name: i18n.i18n(values, locales),
                    locale: data.locale
                };

                console.log(objFinal);


                //
                //$mdToast.show(
                //    $mdToast.simple()
                //        .content('Simple Toast!')
                //        .position('bottom left')
                //        .hideDelay(3000)
                //);
                //Restangular
                //    .all('category')
                //    .post(data)
                //    .then(function(res){
                //       console.log(res);
                //    });
            }
        }
    ])
;