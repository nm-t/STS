$( document ).ready(function() {
	var stageNum = 1
    $( "#addStage" ).click(function() {
        $("#trialSim").append("<li><h4>Stage "+stageNum+"</h4><input type='number'><br><input type='number'></li>");
        stageNum += 1
    });
});