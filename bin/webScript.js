$( document ).ready(function() {
	var stageNum = 1;
    $( "#addStage" ).click(function() {
    		var newStage = "<li class='stage' ><h4>Stage " + stageNum + "</h4>Number of people <input type='number' class='people' min='0' style='width:50px'><br>Rule <input type='number' class='rule' min='0' style='width:50px'></li>"
        	$("#trialSim").append(newStage);
        stageNum += 1
    });
    $("#start").click(function(){
    		var values = [];
    		var peopleArray = $('.people').toArray().map(function(people) { return $(people).val(); });
    		var ruleArray = $('.rule').toArray().map(function(rule) { return $(rule).val(); });
    		var inputData = R.zip(peopleArray, ruleArray);
    });
});