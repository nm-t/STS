$( document ).ready(function() {
	var stageNum = 1;
    $("#addStage").on('click', function() {
    	
    	var newStage = "<li class='stage'><h4>Stage " + stageNum + "</h4>Number of people <form class='stageForm'><input type='number' class='people' min='0' style='width:50px'><br>Rule <input type='number' class='rule' min='0' style='width:50px'></form></li>"
        $("#trialSim").append(newStage);
        stageNum += 1
    });
    $("#start").on('click',function(){
    		//get values out of user input boxes
    		var values = [];
    		var peopleArray = $('.people').toArray().map(function(people) { return parseInt($(people).val()); });
    		var ruleArray = $('.rule').toArray().map(function(rule) { return parseInt($(rule).val()); });
    		var sumPeople = 0;
    		var i;
    		var allFieldsOk = true;
    		//checking if any boxes are empty if the rule exceeds the total participants at any point
    		for (i = 0; i<peopleArray.length; i++){
    			if (!peopleArray[i] || !ruleArray[i]){
    				allFieldsOk = false;
    				//alert saying that a box is empty

                    // Data validation to check for empty fields
                    $(document).ready(function() {
                        $('.stage').formValidation();
                    });
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
				
				graphTrGivenS(graphDataGivenTrue);
			
    		}
    		
    					
    });
});
