
//IMPLEMENT USER===================================================================================
var app = angular.module("mainApp", ["firebase", 'ui.bootstrap']);


app.controller("mainCtrl", ["$scope", "$firebase",
  function($scope, $firebase) {
  	var user = "tempUser";
  	FIREBASE_URL = "https://schmoneyhack.firebaseIO.com/" + user;
  	tempUser = $firebase(new Firebase(FIREBASE_URL));

  	var syncObject = tempUser.$asObject();
  	syncObject.$bindTo($scope, "data");

  	

  	$scope.addGroup = function(addGroupName){
  		syncObject.$loaded().then(function(){
  			if(!('groups' in $scope.data) && !(typeof $scope.data.groups === "undefined")){
	  			alert("Please enter a different group name. This is already in use.");
  				return;
  			}
  			var curGroupMembers = ["tim","bob","o"];
	  		FIREBASE_URL = "https://schmoneyhack.firebaseIO.com/" + user + "/groups/" + addGroupName;
	  		tempUser = $firebase(new Firebase(FIREBASE_URL));
	  		console.log('herhiwoehroiwe');
	    	tempUser.$set({
	        	groupMembers: curGroupMembers
	        });
    	});
  	}
  	// $scope.addGroup("hello");

	$scope.removeGroup = function(groupName) {
		syncObject.$loaded().then(function(){
			if ($scope.data.groups[groupName] == undefined)
       			return;
       		console.log(syncObject);
       		delete $scope.data.groups[groupName];
		});
    };

    // removeGroup("hello");


    // $scope.getAddGroupFriends = function(){
    // 	//implement friends here using typeahead

    // };

    $scope.addTransaction = function(groupName, transactionName, transactionPrice, sending){
    	syncObject.$loaded().then(function(){
        sending = user;
    		FIREBASE_URL = "https://schmoneyhack.firebaseIO.com/" + user + "/groups/" + groupName + "/transactions/";
	  		var trans = $firebase(new Firebase(FIREBASE_URL));
	  		console.log(trans);
	  		trans.$push({
	  			name: transactionName,
    			price: transactionPrice,
    			sender: sending,
	  		});
        // for(var i =0; i < tempUser.)
        //   addTransactionFriends(groupName, transactionName, transactionPrice, sender);
    	});
    };
    $scope.addTransactionFriends = function(groupName, transactionName, transactionPrice, sender){

    }

    $scope.getFriends = function(){
        var query_string = {};
        var query = window.location.search.substring(1);
        console.log(query);
        var res = query.slice(13);
        console.log(res);
        var dict = {};
        var total="";
        // delete $http.defaults.headers.common['X-Requested-With'];
        $http.get('https://api.venmo.com/v1/me?access_token=' + res)
        .success(function(data){
            var ident = data.data.user.id;
            console.log(ident);
            
            $http.get('https://api.venmo.com/v1/users/' + ident + '/friends?access_token=' + res + '&limit=1000000')
            .success(function(data){
                for (var i in data.data){
                    var name = data.data[i].first_name + " " + data.data[i].last_name;
                    var id = data.data[i].id;
                    dict[id] = name;
                }
                for (var i in dict){
                    total+=(dict[i] + " ");
                }
                
                $scope.usersFriends = total;
            })
        })
    }

    $scope.getFriends();



    // $scope.addTransaction("hello", "groceries", "32.32", user);
    // $scope.addTransaction("hello", "grocerqweies", "32.32", user);

    // $scope.addTransaction("hello", "groceewqries", "32.32", user);
    // $scope.addTransaction("hello", "ewirweorjoi", "23.3", user);


    // $scope.updateTransactions = function(groupName, transactionName, transactionPrice, sender){
    // 	syncObject.$loaded().then(function(){

    // 		FIREBASE_URL = "https://schmoneyhack.firebaseIO.com/" + user + "/groups/" + groupName + "/transactions/"
    // 	});
    // };
    // removeTransaction = function(groupName, transactionName){

    // }


    // $scope.getOtherUsers = function(groupName, user){
    // 	syncObject.$loaded().then(function(){
    // 		var groupMembers = $scope.data.groups[groupName][groupMembers];
   	// 		return groupMembers;
    // 	});	
    // };


    // $scope.addFriends = function(groupName, newFriend){
    // 	var newGroup = new Firebase(FIREBASE_URL + user + "/" + groupName);
    // 	var curGroupMembers = $scope.user.groupName["groupMembers"];
    // 	var newGroupMembers = curGroupMembers.push(newFriend);
    // 	$firebase(newGroup).$set({
    //         groupName: groupName,
    //         groupMembers: newGroupMembers
    //     });
    // }

  }
]);




app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  // $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });

  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {


  $scope.ok = function () {
  	$parent.addTransaction("happy", $scope.newName, $scope.Amount, "tempUser");
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});




app.controller('ModalAddGroupCtrl', function ($scope, $modal, $log) {

  // $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent1.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });

  };
});




