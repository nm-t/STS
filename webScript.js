$( document ).ready(function() {
	var stageNum = 1;
	console.log('is this even');
    $("#addStage").on('click', function() {
    	
    	var newStage = "<li class='stage' ><h4>Stage " + stageNum + "</h4>Number of people <input type='number' class='people' min='0' style='width:50px'><br>Rule <input type='number' class='rule' min='0' style='width:50px'></li>"
        $("#trialSim").append(newStage);
        stageNum += 1
    });
    $("#start").on('click',function(){
    		
    		var values = [];
    		var peopleArray = $('.people').toArray().map(function(people) { return parseInt($(people).val()); });
    		var ruleArray = $('.rule').toArray().map(function(rule) { return parseInt($(rule).val()); });
    		var sumPeople = 0;
    		var i;
    		allFieldOks = true;
    		for (i = 0; i<peopleArray.length; i++){
    			if (!peopleArray[i] || !ruleArray[i]){
    				allFieldOk = false;
    				//alert saying that a box is empty
    			}
    			sumPeople += peopleArray[i];
    			
    			if (ruleArray[i]>sumPeople) {
    				allFieldsOk = false;
    			    //alert saying that the number of people to pass is greater than the total number
    			}    			
    		}
    		if (allFieldsOk){
    			var inputData = R.zip(peopleArray, ruleArray);
    			inputData = R.map(function (tuple) { return { numPeople: tuple[0], passThreshold: tuple[1] }; },inputData);
				//at this point, we are ready to call createGrid on inputData
			
    		}
    		
    					
    });
});