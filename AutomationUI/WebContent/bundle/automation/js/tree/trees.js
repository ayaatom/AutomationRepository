(function() {
  'use strict';

 angular.module('treesApp', ['ui.tree'])
  .controller('treesCtrl', function($scope,$http) {

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.nodes.push({
        id: nodeData.id * 10 + nodeData.nodes.length,
        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
        nodes: []
      });
    };

    
    var screenControlServiceURL = "services/automation/AutomationService/getScreenControlsByApplication/";
    $scope.init = function(){
    	console.log("test step controller loadScreenControl");
    	$http.get(screenControlServiceURL,{params : {
  	    	applicationId : $rootScope.applicationId
  	        ,applicationName : $rootScope.applicationName
  	      }}).then(function(response) {
  			console.log("loadScreenControl" + response.status);
  			if(response.data !== undefined) {
  				$scope.tree1 = response.data;
  			} else {
  				$scope.tree1 = [];
  			}
  	     });
    	/*var screenControlResult = loadScreenControl();
    	screenControlResult.then(function(result) {
    		$scope.tree1 = result;
    	});*/
    };
    
  	  
    /*$scope.tree1 = [{
      "id": 1,
      "title": "tree1 - item1",
      "nodes": [],
    }, {
      "id": 2,
      "title": "tree1 - item2",
      "nodes": [],
    }, {
      "id": 3,
      "title": "tree1 - item3",
      "nodes": [],
    }, {
      "id": 4,
      "title": "tree1 - item4",
      "nodes": [],
    }];
    $scope.tree2 = [{
      "id": 1,
      "title": "tree2 - item1",
      "nodes": [],
    }, {
      "id": 2,
      "title": "tree2 - item2",
      "nodes": [],
    }, {
      "id": 3,
      "title": "tree2 - item3",
      "nodes": [],
    }, {
      "id": 4,
      "title": "tree2 - item4",
      "nodes": [],
    }];
*/  });

})();