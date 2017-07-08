angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $firebaseArray) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.x = 'dasdas';

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



    /*
    var fb = firebase.database().ref('/TESTING')
          //.limitToLast(5)
          //.orderByChild('TIMESTAMP')
    var scrollRef = new firebase.util.Scroll(fb, 'TIMESTAMP');

    // establish an event listener as you would for any Firebase ref
    scrollRef.on('child_added', function(snap) {
       console.log('added child', snap.val());
    });

    // download the first 20 records
    scrollRef.scroll.next(5);
        // create a synchronized array
    */


    $scope.messages = []
    //Angular FIre load the first element MAGIC
    var ref = firebase.database().ref("/TESTING").limitToLast(1).orderByChild('TIMESTAMP')
    var first = $firebaseArray(ref);
    first.$loaded().then(function () {
      console.log(first)
    });
    //Angular FIre load the first element MAGIC

    var child_added = firebase.database().ref("/TESTING").limitToLast(1).orderByChild('TIMESTAMP')
    child_added.on('child_added', function (snap) {
      console.log('child_added')
      $scope.messages.push(snap.val())
      console.log(snap.val())
    })
    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.arriba = function () {
      var anterior = []
      console.log('ANTERIOR')
      var refX = firebase.database().ref("/TESTING")
        .orderByChild('TIMESTAMP')
        .limitToLast(5)
        .endAt($scope.messages[0].TIMESTAMP - 1)
        antes = $firebaseArray(refX);
        antes.$loaded().then(function () {
        antes.reverse()
        antes.forEach(function (element) {
          console.log('Agregando')
          console.log(element)
          $scope.messages.unshift(element)
        });

      });

      /* .once('value',function(snap){
         snap.forEach(function(elem) {
           anterior.push(elem.val())
           
         });
         console.log(anterior)
         $scope.messages.unshift(anterior)

       })
       */
      //var antes =  $firebaseArray(ref2);
      //$scope.messages.push('antes')




    };

    $scope.abajo = function () {
      console.log('abajo')
      scrollRef.scroll.prev(5);
      /*
      var ref2 = firebase.database().ref("/TESTING")
        .orderByChild('TIMESTAMP')
        .limitToLast(5)
        .startAt($scope.messages[4].TIMESTAMP + 1)

      $scope.messages = $firebaseArray(ref2);
*/
    };

    //jbsdbas
    $scope.add = function (args) {
      $scope.texto = ''
      console.log('add')
      // Get a key for a new Post

      var postData = {
        user: "set set",
        TIMESTAMP: firebase.database.ServerValue.TIMESTAMP,
        message: "Mi mensaje: " + args,
      }
      var newPostKey = firebase.database().ref().child('TESTING').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/TESTING/' + newPostKey] = postData;

      return firebase.database().ref().update(updates);



      /*
      $scope.messages.$add({
        user: "myUser",
        TIMESTAMP: firebase.database.ServerValue.TIMESTAMP,
        message: "Mi mensaje: " + args,
      }).then(function (ref) {
        console.log("added record with id " + ref);
      });
      */
    }

    // click on `index.html` above to see $remove() and $save() in action
  })

  .controller('PlaylistsCtrl', function ($scope) {

  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {});
