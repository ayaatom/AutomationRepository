app.controller('MachineCtrl', function($scope, NgTableParams, $http, $rootScope, ngDialog, 
		machineService, $location, $timeout,AUTOMATION_CONSTANTS) {

$scope.applicationName = $rootScope.applicationName;
$scope.applicationId = $rootScope.applicationId;
$http.defaults.headers.common.Authorization = $rootScope.token;
$scope.data = [];
var mcLoaded = false;
$scope.init = function () {
	$rootScope.clearMsgs();
	console.log("machine controller init = " +mcLoaded);
	if(!mcLoaded) {
		loadMachine();
	}
};

function loadMachine() {
	var machineResult = machineService.getMachineList();
	machineResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   console.log("machine  = "+machineService.getMachines());
	   $scope.data = result; 
	   mcLoaded = true;
	}
	});
};

$scope.newMachine = function () {
	 $rootScope.clearMsgs();
				$rootScope.theme = 'ngdialog-theme-plain custom-width';
				ngDialog.open({
					template: 'machineDialog',
					controller: 'MachineCtrl',
					className: 'ngdialog-theme-default custom-width'
				});
			};

$scope.addMachine = function() {
	 $rootScope.clearMsgs();
	console.log("add machine ");
	console.log("addmachine 1 machine length = "+$scope.data.length);
	var newObj = {
		"machineName": $scope.machineName,
		"machineHost": $scope.machineHost,
		"machinePort": $scope.machinePort,
		"machineDesc": $scope.machineDesc,
		"applicationName": $scope.applicationName,
		"applicationId": $scope.applicationId
    };
	machineService.addMachine(newObj,$scope);
	console.log("addMachine 2 machine length = "+$scope.data.length);
	ngDialog.close();
};

$scope.removeMachine = function (machine) {
	 $rootScope.clearMsgs();
    var index = -1;	
    for( var i = 0; i < $scope.data.length; i++ ) {
		  if( $scope.data[i].machineId === machine.machineId ) {
			  index = i;
			  break;
		  }
	  }
	  if( index === -1 ) {
		  alert( "Something gone wrong" );
	  }
	  $scope.data.splice(index, 1);
	  machineService.removeMachine(machine);
};

$scope.updateMachine = function (machine) {
	 $rootScope.clearMsgs();
	machine.$edit = false;
	machineService.updateMachine(machine);
};

});//End MachineCtrl