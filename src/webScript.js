$( document ).ready(function() {
	var stageNum = 1;

    var emptyFieldAlert = function(message) {
        var fullErrorMessage  = "<div class=\"alert alert-warning\"><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+ message+"</div>";
        $("#message").html(fullErrorMessage);
    }



    var addStage = function() {
        $("#addrule").remove();
        var newStage = "<li class='stage'><h4>Stage " + stageNum + "</h4>" +'<div class="form-group">\
        <label class="col-xs-5 control-label">Number of people</label><div class="col-xs-4 form-number">\
                <input type="number" class="form-control people"\
                    required\
                    data-fv-notempty-message="Number of people is required" />\
            </div>\
        </div>' + '<div class="form-group">\
        <label class="col-xs-5 control-label">Threshold</label>\
            <div class="col-xs-4 form-number">\
                <input type="number" class="form-control threshold"\
                    required\
                    data-fv-notempty-message="A threshhold is required, and must be at most the total number of people in the trial so far" />\
            </div>\
        </div></li>';

        
        var newButton = "<li id='addrule'><input type='button' value='Add Stage'></li>";        
        stageNum += 1;

        $("#addrule").on('click', function() {
            addStage();     
        });
    };

    $("#addStage").on('click', function() {
        addStage();    	
    });

    
    /*var trueRateValidation = function(){//Validation for the True response probability input boxes
    
        var range = $("#trueRateUpper").val() - $("#trueRateLower").val()
        if ($("#trueRateStep").val()>range){
            console.log("invalid step");
            return False
        }
        if ($("#trueRateUpper").val()>1 || $("#trueRateUpper").val()<$("#trueRateLower").val()){
            console.log("upper out of range");
            return False
        }
        if ($("#trueRateLower").val()>$("#trueRateUpper").val() || $("#trueRateLower").val()<0){
            console.log("lower out of range");
            return False
        }
        return True
    } */

    /*$("#start").on('click',function(e){
            //valides the rate boxes
            //trueRateValidation()

    		//get values out of user input boxes
            var allFieldsOk = true;
            $(".people").each(function(index) {
                allFieldsOk = (this.checkValidity()) && allFieldsOk;
            });

            if (!allFieldsOk) {
                //e.preventDefault();
                return;
            }

    		var values = [];

    		var peopleArray = $('.people').toArray().map(function(people) { return parseInt($(people).val()); });
    		var ruleArray = $('.threshold').toArray().map(function(threshold) { return parseInt($(threshold).val()); });
    		var sumPeople = 0;
    		var i;

            if (peopleArray.length===0 || ruleArray.length===0){
                allFieldsOk=false;
            }
    		//checking if any boxes are empty if the rule exceeds the total participants at any point
    		for (i = 0; i<peopleArray.length; i++){
    			if (peopleArray[i]===0 || ruleArray[i]===0){
    				allFieldsOk = false;
    			}
                
    			sumPeople += peopleArray[i];
    			
    			if (ruleArray[i]>sumPeople) {
    				allFieldsOk = false;
    			    //alert saying that the number of people to pass is greater than the total number
    			}    			
    		}
    		if (allFieldsOk){
                //TODO get weights input from user, to weight the trials of different true effectiveness
    			var inputData = R.zip(peopleArray, ruleArray);
    			inputData = R.map(function (tuple) { return { numPeople: tuple[0], passThreshold: tuple[1] }; },inputData);
				//at this point, we are ready to call createGrid on inputData
                var rates = interpolateRates(0, 1, 101);
                var grid = createGrid(inputData, rates);
                var weights = sampleWeights(rates, 'uniform', {'min' : 0.5});

				//these three functions have optional parameter "weight[]"
				//cumulateProb = ctr(grid);
				var graphDataGivenTrue = ctrGivenS(grid, weights);
				var trGraphData = ctr(grid, weights);
				var trGivenFData = ctrGivenF(grid, weights);

                drawGraph(trGraphData, '#trgraph', 'passFraction');
				drawGraph(graphDataGivenTrue, '#visualisation', 'trGivenS');
                drawGraph(trGivenFData, '#trgivenfail', 'trGivenF');
    		}
            e.preventDefault();
    });

    addStage(); */ 
});



angular.module('sts')
.directive('weightDist', function (stageStore, graphData) {
    return {
        link: function (scope) {
            scope.distData = graphData.distData;
            scope.$watch('distData', function () {
                stageStore.refresh += 1;
                scope.trGraphData = graphData.calcTruePriorsData();
            }, true);
        },
        templateUrl: "html/weightdist.html"
    };
})
.factory('graphData', function(stageStore) {

    var weights = [];
    var distData = { 
        dist: 'uniform', 
        uniformParams: {min: 0, max: 1}, 
        logitParams: { mu: 0.0, sigma: 0.5 },
        betaParams: { alpha: 2.0, beta: 2.0 }
     };

    var calcGridData = function(points) {
        if (!points) points = 101;
        var rates = interpolateRates(0, 1, points);
        var grid = createGrid(stageStore.stages, rates);
        return grid;
    };
    var calcTruePriors = function(points) {
        if (!points) points = 101;
        var rates = interpolateRates(0, 1, points);
        var params;
        if (distData.dist === 'uniform') {
            params = distData.uniformParams;
        } else if (distData.dist === 'logitnormal') {
            params = distData.logitParams;
        } else if (distData.dist === 'beta') {
            params = distData.betaParams;
        }
        var weights = sampleWeights(rates, distData.dist, params );
        return weights;
    };
    return {
        weights: weights,
        distData: distData,
        calcTruePriorsData: function() {
            // This one's just for show
            var points = 101;
            var rates = interpolateRates(0, 1, points);
            var weights = calcTruePriors(points);
            var data = R.zip(rates, weights);
            return [{ "key" : "Prior", "values" : data}]

        },
        calcTrGraphData: function () {
            var grid = calcGridData();
            return [{ "key": 'Pass Fraction', "values": to2dArray(ctr(grid)) }];
        },
        calcTrGivenSGraphData: function () {
            var grid = calcGridData();
            var weights = calcTruePriors();
            return [{ "key": 'Pass Fraction', "values": to2dArrayParam('trueRate', 'trGivenS')(ctrGivenS(grid, weights)) }];
        },
        calcTrGivenFGraphData: function () {
            var grid = calcGridData();
            var weights = calcTruePriors();
            return [{ "key": 'Pass Fraction', "values": to2dArrayParam('trueRate', 'trGivenF')(ctrGivenF(grid, weights)) }];
        },
        calcStageFailedGraphData: function() {
            var grid = calcGridData();
            return endOfTrialsExact(grid);            
        }

    };
})
.directive('trfGraph', function(stageStore, graphData) {
    return {
        scope: {},
        link: function(scope) {
            scope.stageStore = stageStore;
            scope.trGraphData = [];
            scope.$watch('stageStore', function () {
                scope.trGraphData = graphData.calcTrGivenFGraphData();
            }, true);
            scope.xFormat = function(x) {
                if (x === 1) return x;
                return '≥' + x;
            };
        },
        template: '<div class="graph"><h4>Negative predictive function<br><font size="2">(given that the trial stops early...)</font></h4><nvd3-line-chart data="trGraphData" width="430" height="350" forceY="[0, 1]" forceX="[0, 1]" xAxisTickFormat="xFormat"  xAxisTickValues="[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]" xAxisLabel="True response probability" margin="{left:40, top: 20, bottom: 40, right: 20}"yAxisLabel="Posterior probability" showXAxis="true" showYAxis="true" useInteractiveGuideLine="true" ></nvd3-line-chart></div>'

    };
})
.directive('trsGraph', function(stageStore, graphData) {
    return {
        scope: {},
        link: function(scope) {
            scope.stageStore = stageStore;
            scope.trGraphData = [];
            scope.$watch('stageStore', function () {
                scope.trGraphData = graphData.calcTrGivenSGraphData();
            }, true);
            scope.xFormat = function(x) {
                if (x === 1) return x;
                return '≥' + x;
            };
        },
        template: '<div class="graph"><h4>Positive predictive function<br><font size="2">(given that the trial is successful...)</font></h4><nvd3-line-chart data="trGraphData" width="430" height="350" forceY="[0, 1]" forceX="[0, 1]" xAxisTickFormat="xFormat" xAxisTickValues="[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]" xAxisLabel="True response probability" margin="{left:40, top: 20, bottom: 40, right: 20}"yAxisLabel="Posterior probability" showXAxis="true" showYAxis="true" useInteractiveGuideLine="true" ></nvd3-line-chart></div>'

    };
})
.directive('graphs', function(stageStore, graphData) {
    return {
        scope: {},
        link: function(scope) {
            scope.stageStore = stageStore;
            scope.trGraphData = [];
            scope.$watch('stageStore', function () {
                scope.trGraphData = graphData.calcTrGraphData();
            }, true);
            scope.xFormat = function(x) {
                if (x === 1) return x;
                return '≥' + x;
            };
        },
        template: '<div class="graph"><h4>Power function</h4><nvd3-line-chart data="trGraphData" width="430" height="350" useInteractiveGuideLine="true" xAxisTickFormat="xFormat" forceX="[0, 1]" forceY="[0, 1]" xAxisTickValues="[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]" xAxisLabel="True response probability" margin="{left:40, top: 20, bottom: 40, right: 20}" yAxisLabel="Probability that trial is successful" showXAxis="true" showYAxis="true" ></nvd3-line-chart></div>'

    };
})
.directive('failedStageGraph', function(stageStore, graphData) {
    return {
        scope: {},
        link: function(scope) {
            scope.stageStore = stageStore;
            scope.trGraphData = [];
            scope.graphData = graphData;
            scope.$watch('stageStore', function () {
                scope.trGraphData = graphData.calcStageFailedGraphData();
            }, true);
        },
        // Waiting on https://github.com/novus/nvd3/issues/1065 to add more ticks
        template: '<div class="graph"><h4>Distribution of end stages across true response probability</h4><nvd3-multi-bar-chart data="trGraphData" width="430" height="350" useInteractiveGuideLine="true" forceY="[0, 1]"  forceX="[0, 1]" xAxisTickValues="[0, 1]" xAxisLabel="True Rate" showLegend="true" margin="{left:40, top: 20, bottom: 40, right: 20}" yAxisLabel="Proportion" showXAxis="true" showYAxis="true" stacked="true"></nvd3-multi-bar-chart></div>'

    };
});

