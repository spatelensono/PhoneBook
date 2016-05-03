/// <reference path="Angular.js" />
/// <reference path="angular-route.js" />
var myPBApp = angular
            .module("myPBModule", ["ngRoute"])
            .config(function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when("/Home", {
                        templateUrl: "/Template/Home.html",
                        controller: "homeController as homeCtrl"
                    })
                    .when("/ContactDetails/:id", {
                        templateUrl: "/Template/ContactDetails.html",
                        controller: "viewController as viewCtrl"
                    })
                    .when("/AddNewContact", {
                        templateUrl: "/Template/AddNewContact.html",
                        controller: "addNewController as addNewCtrl"
                    })
                    .when("/EditContactDetails/:id", {
                        templateUrl: "/Template/EditContactDetails.html",
                        controller: "editController as editCtrl"
                    })
                    .when("/SaveContactDetails", {
                        templateUrl: "/Template/SaveContactDetails.html",
                        controller: "saveController as saveCtrl"
                    })
                    .otherwise({
                        redirectTo: "/Home"
                    })
                $locationProvider.html5Mode(true);
            })
            .controller("homeController", function ($http, $route, $rootScope) {
                var viewModel = this;
                //Load data from seed.json
                if (angular.isUndefined($rootScope.contacts)) {
                    //alert("contacts is Undefined ");
                    $http.get("Data/seed.json").success(function ($data) {
                    $rootScope.contacts = $data.contacts;
                })
                }
                else{
                    //alert("else found");
                }
                
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
                //alert($rootScope.tmpContact.avatar);
            })
            .controller("addNewController", function ($rootScope) {
                var viewModel = this;
                var addContact = new Object();
                addContact.id = $rootScope.contacts[$rootScope.contacts.length -1].id + 1;
                addContact.name ="";
                addContact.phone = "";
                addContact.email = "";
                addContact.birthday = "";
                addContact.avatar = "";
                $rootScope.addNewContact = addContact;
                //alert($rootScope.addNewContact.id);
            })
            .controller("saveController", function ($location, $rootScope) {
                var viewModel = this;
                if($rootScope.addNewContact.name == "") {
                    alert("Name Not Enter");
                    $location.path("/AddNewContact");
                }
                else if ($rootScope.addNewContact.phone == "") {
                    alert("Phone Not Enter");
                    $location.path("/AddNewContact");
                }
                else if ($rootScope.addNewContact.email == "") {
                    alert("Email Not Enter");
                    $location.path("/AddNewContact");
                }
                else if ($rootScope.addNewContact.birthday == "") {
                    alert("Birthday Not Enter");
                    $location.path("/AddNewContact");
                }
                else if ($rootScope.addNewContact.avatar == "") {
                    alert("Avatar link Not Enter");
                    $location.path("/AddNewContact");
                }
                else {
                    $rootScope.contacts.push({
                        "id": $rootScope.addNewContact.id,
                        "name": $rootScope.addNewContact.name,
                        "phone": $rootScope.addNewContact.phone,
                        "email": $rootScope.addNewContact.email,
                        "birthday": $rootScope.addNewContact.birthday,
                        "avatar": $rootScope.addNewContact.avatar
                   });
                    $location.path("/Home");
                }

            })
            .controller("editController", function ($rootScope) {
                //alert($rootScope.tmpContact.name);
            })