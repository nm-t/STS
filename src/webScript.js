

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

        
        $("#trialSim").append(newStage);
        var newButton = "<li id='addrule'><input type='button' value='Add'></li>";        
        $("#trialSim").append(newButton);
        stageNum += 1;

        $("#addrule").on('click', function() {
            addStage();     
        });
    };

    $("#addStage").on('click', function() {
        addStage();    	
    });

    $("#start").on('click',function(e){
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
				var grid = createGrid(inputData, interpolateRates(0, 1, 11));
				//these three functions have optional parameter "weight[]"
				//cumulateProb = ctr(grid);
				graphDataGivenTrue = ctrGivenS(grid);
				var trGraphData = ctr(grid);
				
				graphTrGivenS(graphDataGivenTrue);
                console.log(trGraphData);
				graphTr(trGraphData);
			
    		}
            e.preventDefault();
    });

    addStage(); 
});
