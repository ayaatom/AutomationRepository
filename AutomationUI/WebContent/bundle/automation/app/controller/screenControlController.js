app.controller('ScreenControlCtrl', function($scope, screenControlService, $rootScope, $route, ngDialog,AUTOMATION_CONSTANTS) {

	$scope.screenCtrlTreedata = [];
	$scope.screenCtrlTypes = getScreenControlTypes();
	var screenControlLoaded = false;
	var screenControlTypesLoaded = false;

$scope.init = function() {
	$rootScope.clearMsgs();
	console.log("screen control controller init");
	if(!screenControlLoaded) {
		loadScreenControl();
	}
		//loadScreenControlTypes();
};

$scope.saveScreenControl = function() {
	 $rootScope.clearMsgs();
	screenControlService.addUpdateScreenControl($scope, $scope.screenCtrlTreedata);
};

function loadScreenControl() {
	console.log("screen control controller loadScreenControl");
	var screenControlResult = screenControlService.loadScreenControl();
	screenControlResult.then(function(result) {
		$scope.screenCtrlTreedata = result;
	});
};

function loadScreenControlTypes() {
	 $rootScope.clearMsgs();
		console.log("test step controller loadScreenControlTypes");
		var screenControlResult = screenControlService.loadScreenControlTypes();
		screenControlResult.then(function(result) {
			$scope.screenCtrlTypes = result;
		});
		screenControlTypesLoaded=true;
		console.log('CtrlTypes:'+$scope.screenCtrlTypes);
	};

	function getScreenControlTypes() {
		 $rootScope.clearMsgs();
		console.log("test step controller loadScreenControlTypes");
		var screenControlResult = screenControlService.loadScreenControlTypes();
		screenControlResult.then(function(result) {
			$scope.screenCtrlTypes = result;
		});
		screenControlTypesLoaded=true;
		return $scope.screenCtrlTypes;
		console.log('CtrlTypes:'+$scope.screenCtrlTypes);
	};
	
$scope.selectedItem = {};

$scope.options = {
};


  $scope.saveTreeNode = function(treeNode) {
	  console.log("screen control saveTreeNode" + treeNode.type);
		
	  $rootScope.clearMsgs();
		ngDialog.close();
		//screenControlService.addUpdateScreenNode(treeNode);
		if('SCREEN' === treeNode.type) {
			if(treeNode.id.indexOf('temp') !== -1) {
				screenControlService.addScreenNode($scope,treeNode);
			} else {
				screenControlService.updateScreenNode($scope,treeNode);
			}
		} else {
			if(treeNode.id.indexOf('temp') !== -1) {
				screenControlService.addControlNode($scope,$rootScope.selectedScreenId,treeNode);
			} else {
				screenControlService.updateControlNode($scope,$rootScope.selectedScreenId,treeNode);
			}
		}
		$route.reload();
	};
  
 
 $scope.editTreeNode = function (treeNode) {
	 $rootScope.clearMsgs();
		$rootScope.theme = 'ngdialog-theme-plain custom-width';
		var modalInstance = ngDialog.open({
			template: 'treeNodeFormDialog',
			controller: 'ScreenControlCtrl',
			className: 'ngdialog-theme-default custom-width',
			data: treeNode			
		});
		
	};


$scope.removeTreeNode = function(treeNode,scope) {
	 $rootScope.clearMsgs();
	 if('SCREEN' === treeNode.type) {
			if(!(treeNode.id.indexOf('temp') !== -1)) {
				screenControlService.deleteScreenNode($scope,treeNode.id);
			}
		} else {
			if(!(treeNode.id.indexOf('temp') !== -1)) {
				screenControlService.deleteControlNode($scope,$rootScope.selectedScreenId,treeNode.id);
			}
		}
	 scope.remove();
  };

  $scope.screenToggle = function(treeObj) {
	  $rootScope.clearMsgs();
	  if('SCREEN' === treeObj.type) {
		  $rootScope.selectedScreenId = treeObj.id;
	  } else {
		  $rootScope.selectedScreenId = "";
	  }
  };

  $scope.newSubItem = function(treeObj) {
	  $rootScope.clearMsgs();
	  treeObj.nodes.push({
        id: "temp_"+$scope.getRandomId(),
        title: treeObj.title + '-temp',
        nodes: []
      });
    };
    
    $scope.newScreen = function() {
    	 $rootScope.clearMsgs();
    	 if($scope.screenCtrlTreedata === undefined || $scope.screenCtrlTreedata === null || $scope.screenCtrlTreedata === ""  ) {
    		 $scope.screenCtrlTreedata = [];
    	 }
    	$scope.screenCtrlTreedata.push({
          id: "temp_"+$scope.getRandomId(),
          title: 'New Screen.' + ($scope.screenCtrlTreedata.length + 1),
          "type":"SCREEN",
          nodes: []
        });
      };
    
      $scope.getRandomId = function(){
    	  //return Math.floor((Math.random()*1000)+1);
    	  var d = new Date();
    	    return d.valueOf();
    	}


});//End TestCase Result Ctrl