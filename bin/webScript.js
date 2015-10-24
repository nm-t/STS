$( document ).ready(function() {
	var stageNum = 1
    $( "#addStage" ).click(function() {
        $("#trialString").append("<h4>Stage "+stageNum+"</h4><input type='text'>");
        stageNum += 1
    });
});