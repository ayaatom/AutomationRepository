app.controller('TestRunBuildDetailCtrl', function($scope, $http, $rootScope, $routeParams, ngDialog, 
		testRunService, testRunBuildDetailService, testStepService, $location, $timeout,AUTOMATION_CONSTANTS) {

	$scope.applicationName = $rootScope.applicationName;
	$scope.applicationId = $rootScope.applicationId;
$scope.testRunBuildDetailData = [];
$scope.testRunData=[];
$scope.testRunBuildDetailObj = [];
$scope.selectedMachine = "";
$scope.browsers = [
	     			  {
	     			    "id": 1,
	     			    "text": "Chrome"
	     			  },
	     			  {
	     			    "id": 2,
	     			    "text": "Safari"
	     			  },
	     			  {
	     			    "id": 3,
	     			    "text": "IE"
	     			  },
	     			  {
	     				    "id": 4,
	     				    "text": "Firefox"
	     			}];
var trBuildDetailLoaded = false;
$scope.init = function () {
	$rootScope.clearMsgs();
	console.log("test run build detail controller init = " +trBuildDetailLoaded);
	if(!trBuildDetailLoaded) {
		loadTestRun();
		loadTestRunBuildDetail();
		loadMachines();
		loadApplicationSettings();
	}
};

function loadMachines() {
	console.log("test run detail controller loadMachines");
	var machinesResult = testStepService.loadMachines();
	machinesResult.then(function(result) {
		$rootScope.machineDetails = result;
		console.log("machines value" + $rootScope.machineDetails);
	});
};

function loadApplicationSettings() {
	console.log("test run detail controller loadApplicationSettings");
	$http.get(AUTOMATION_CONSTANTS.APPDETAIL_SERVICE+'/getApplicationDetailsByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName)
	.then(function(response) {
		console.log(response.status);
		if(response.data !== undefined) {
			$rootScope.appDetails = response.data;
		} else {
			$rootScope.appDetails = [];
		}
	});
};

function loadTestRunBuildDetail() {
	var testRunBuildDetailResult = testRunBuildDetailService.getTestRunBuildDetail($rootScope.testRunBuildId);
	testRunBuildDetailResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined && result !== null && result !== "") {
	   console.log("test run build detail length = "+$scope.testRunBuildDetailObj.length);
	   $scope.testRunBuildDetailObj = result; 
	   trLoaded = true;
	}
	});
};


function loadTestRun() {
	var testRunResult = testRunService.getTestRunList();
	testRunResult.then(function(result) {  // this is only run after $http completes
	if(result !== undefined) {
	   console.log("test run length = "+testRunService.getTestRunLength());
	   $scope.testRunData = result; 
	   trLoaded = true;
	}
	});
};


$scope.setSelectedTestRun = function (testRun,index) {
	 $rootScope.clearMsgs();
	console.log("test run build detail controller setSelectedTestRun" + testRun.testRunId);
	$scope.index = index;
	$scope.newTestRunObj = {};
	$scope.newTestRunObj.testRunId= testRun.testRunId;
	$scope.newTestRunObj.testRunName= testRun.testRunName;
};

$scope.addSelectedTestRun = function () {
	 $rootScope.clearMsgs();
	console.log("test run build detail controller addSelectedTestRun");
	$scope.newTestRunObj.testRunBuildDetailId=$scope.testRunBuildDetailObj.length+1;
	$scope.newTestRunObj.applicationId = $rootScope.applicationId;
	$scope.newTestRunObj.applicationName=$rootScope.applicationName;
	$scope.newTestRunObj.testRunBuildId=$rootScope.testRunBuildId;
	$scope.newTestRunObj.$edit = false;
	testRunBuildDetailService.addTestRunBuildDetail($rootScope.testRunBuildId,$scope.newTestRunObj, $scope);
};


$scope.updateTestRunBuildDetail = function(testRunBuildDetail) {
	 $rootScope.clearMsgs();
	testRunBuildDetailService.updateTestRunBuildDetail(testRunBuildDetail);
	testRunBuildDetail.$edit = false;
}

$scope.executeTestRunBuild = function() {
	 $rootScope.clearMsgs();
	console.log("test run detail controller executeTestrunbuild. Test run build ID = " + $rootScope.testRunBuildId);
		ngDialog.open({
			template : 'executeDialog',
			controller : 'TestRunBuildDetailCtrl'
		});
		
};

$scope.startExecution = function() {
	 $rootScope.clearMsgs();
	console.log("test run build detail controller start execution selected machine  = " + this.selectedMachine);
	var execDetailObj = {
		"buildId": 	$rootScope.testRunBuildId,
		"buildName": $rootScope.testRunBuildName,
		"applicationName": $rootScope.applicationName,
		"applicationId": $rootScope.applicationId,
		"machine": this.selectedMachine
	};
	ngDialog.close();
	testRunBuildDetailService.executeTestRunBuild(execDetailObj);
};

$scope.removeTestRunBuildDetail = function (testRunBuildDetail) {
	 $rootScope.clearMsgs();
    var index = -1;	
    for( var i = 0; i < $scope.testRunBuildDetailObj.length; i++ ) {
		  if( $scope.testRunBuildDetailObj[i].testRunBuildDetailId === testRunBuildDetail.testRunBuildDetailId ) {
			  index = i;
			  break;
		  }
	  }
	  if( index === -1 ) {
		  alert( "Something gone wrong" );
	  }
	  $scope.testRunBuildDetailObj.splice(index, 1);
	  testRunBuildDetailService.removeTestRunBuildDetail(testRunBuildDetail);
};


$scope.moveUpTestRunDetail= function (testRunBuildDetail,$index) {
	 $rootScope.clearMsgs();
	console.log("moveUpTestRunDetail=" + testRunBuildDetail.testRunId);
	console.log("moveUpTestRunDetail $index=" + $index);
	 if($index === 0) {return;}
	 move($index,$index-1,testRunBuildDetail);
};

$scope.moveDownTestRunDetail= function (testRunBuildDetail,$index) {
	 $rootScope.clearMsgs();
	console.log("moveDownTestRunDetail=$index=" + $index);
	console.log("moveDownTestRunDetail=$scope.data.length=" + $scope.length);
	if($index+1 === $scope.testRunBuildDetailObj.length) {return;}
	move($index,$index+1,testRunBuildDetail); 
};

var move = function (origin, destination,testRunBuildDetail) {
	var temp = $scope.testRunBuildDetailObj[destination];
	$scope.testRunBuildDetailObj[destination] = testRunBuildDetail;
	$scope.testRunBuildDetailObj[origin] = temp;
};

$scope.saveTestRunBuildDetailObj = function() {
	 $rootScope.clearMsgs();
	testRunBuildDetailService.saveUpdateTestRunBuildDetails($scope, $scope.testRunBuildDetailObj, $routeParams.testRunID);
};

});//End TestRunBuildDetailCtrl