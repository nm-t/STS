angular.module('sts', ['nvd3ChartDirectives'])
.factory('stageStore', function () {
    var stages = [
        {numPeople: 5, passThreshold: 2},
        {numPeople: 5, passThreshold: 4},
        {numPeople: 10, passThreshold: 12},
    ];

    var minPassThreshold = function() {
        return Math.max.apply(null, R.map(R.prop('passThreshold'), stages));
    };

    return {
        refresh: 0,
        stages: stages,
        removeStage: function(index) {
            stages.splice(index, 1);
        },
        addStage: function(index) {
            stages.push({numPeople: 0, passThreshold: minPassThreshold(stages)});
        }
    };
})
.directive('addStage', function(stageStore) {
    return {
        scope: {},
        link: function(scope) {
            scope.add = stageStore.addStage;
        },
        template: '<button ng-click="add()">Add Stage</button>'
    };
})

.directive('stages', function (stageStore) {
    return {
        scope: {},
        link: function (scope) {
            scope.stageStore = stageStore;
        },
        template: '<stage stage-num="$index + 1" num-people="stage.numPeople" pass-threshold="stage.passThreshold" ng-repeat="stage in stageStore.stages"></stage>'
    };
})


.directive('stage', function (stageStore) {
    return {
        scope: {
            stageNum: "=",
            numPeople: "=",
            passThreshold: "="
        },
        link: function (scope) {
            scope.removeStage = function() {
                stageStore.removeStage(scope.stageNum - 1);
            };
            var validationFailed = function(newPeople){
                if (!newPeople || isNaN(newPeople)){
                    return false
                }
                if (newPeople === parseInt(newPeople)){
                    return (newPeople<0);
                }
                return true
            }

            var thresholdValidationFailed = function(newThreshold){
                if (!newThreshold || isNaN(newThreshold)){
                    return false
                }
                var totalPeople = 0
                for (var i = 0; i<=scope.stageNum-1; i++){
                    totalPeople+=stageStore.stages[i].numPeople;
                }
                //console.log("tp",totalPeople,newThreshold)

                return (newThreshold>totalPeople||newThreshold<0);
            }
            scope.$watch('numPeople', function (newValue, oldValue) {

                if (validationFailed(newValue)) scope.numPeople = oldValue;
                else { scope.numPeople = parseInt(scope.numPeople);}
            });
            scope.$watch('passThreshold', function(newValue, oldValue) {
                //console.log("no,",newValue, oldValue)
                if (thresholdValidationFailed(newValue)) scope.passThreshold = oldValue
                else { scope.passThreshold = parseInt(scope.passThreshold);}
            })
        },
        templateUrl: "html/stage.html",
        replace: true
    };
});
