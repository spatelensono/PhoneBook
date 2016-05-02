/// <reference path="Angular.js" />
/// <reference path="angular-route.js" />
var myPBApp = angular
            .module("myPBModule", ["ngRoute"])
            .config(function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when("/ContactDetails/:id", {
                        templateUrl: "/Template/ContactDetails.html",
                        controller: "viewController as viewCtrl"
                    })
                    .when("/AddNewContact", {
                        templateUrl: "/Template/AddNewContact.html",
                        controller: "addNewController as addNewCtrl"
                    })
                    .when("/EditContactDetails/:id", {
                        templateUrl: "/Template/EditContactDetails.html"
                        //controller: "editController as editCtrl"
                    })
                    .when("/SaveContactDetails", {
                        templateUrl: "/Template/SaveContactDetails.html",
                        controller: "saveController as saveCtrl"
                    })
                    .otherwise({
                        redirectTo: "/"
                    })
                $locationProvider.html5Mode(true);
            })
            .controller("myPHBController", function ($http, $route, $rootScope) {
                var viewModel = this;
                //Load data from seed.json
                $http.get("Data/seed.json").success(function ($data) {
                    $rootScope.contacts = $data.contacts;
                })
            })
            .controller("viewController", function ($routeParams, $rootScope) {
                //var viewModel = this;
                //// Make reference for Current Contact as tmpContact
                for (var i = 0; i < $rootScope.contacts.length; i++) {
                    if ($rootScope.contacts[i].id == $routeParams.id) {
                        $rootScope.tmpContact = $rootScope.contacts[i];
                        //viewModel.foundIt = "Found It";
                        break;
                    }
                    else {
                        //viewModel.foundIt = "Not Found";
                    }
                }
            })
            .controller("addNewController", function ($rootScope) {
                var viewModel = this;
                var addContact = new Object();
                addContact.id = $rootScope.contacts[$rootScope.contacts.length -1].id + 1;
                addContact.name ="FName LName";
                addContact.phone = "(987) 654-3210";
                addContact.email = "email@domain.com";
                addContact.birthday = "01/01/1980";
                addContact.avatar = "http://avtar/na/avatari";
                $rootScope.addNewContact = addContact;
                //alert($rootScope.addNewContact.id);
            })
            .controller("saveController", function ($rootScope) {
                var viewModel = this;
               $rootScope.contacts.push({
                    "id": $rootScope.addNewContact.id,
                    "name": $rootScope.addNewContact.name,
                    "phone": $rootScope.addNewContact.phone,
                    "email": $rootScope.addNewContact.email,
                    "birthday": $rootScope.addNewContact.birthday,
                    "avatar": $rootScope.addNewContact.avatar
               });
               //alert($rootScope.addNewContact.id);
            })