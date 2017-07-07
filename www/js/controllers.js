angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $firebaseArray) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };

    // FIREBASE // FIREBASE // FIREBASE // FIREBASE// FIREBASE
    $scope.texto = ''
    // create a synchronized array
    var ref = firebase.database().ref("/TESTING")
      .limitToLast(5)
      .orderByChild('TIMESTAMP')

    $scope.messages = $firebaseArray(ref);
    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.loadmore = function () {
      var ref2 = firebase.database().ref("/TESTING")
        .orderByChild('TIMESTAMP')
        .limitToLast(3)
        .endAt($scope.messages[0].TIMESTAMP - 1)

      $scope.news = $firebaseArray(ref2);

    };

    $scope.add = function (args) {
      $scope.texto = ''
      $scope.messages.$add({
        user: "myUser",
        TIMESTAMP: firebase.database.ServerValue.TIMESTAMP,
        message: "Mi mensaje: " + args,
      }).then(function (ref) {
        console.log("added record with id " + ref);
      });
    }

    // click on `index.html` above to see $remove() and $save() in action
  })

  .controller('PlaylistsCtrl', function ($scope) {

  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {});
