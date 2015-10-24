(function() {
	var binomials = {};


	window.runSeqTrial = function(stages, trueRate) {
		var passed_previous = [1.0];
		var pass_current = [];
		var previous_cutoff = 0;
		var failed_stage = [];
		var passed_stage = [];

		console.log('stages ' + stages);
		console.log('rate ' + trueRate);

		stages.forEach(function(stage) {
			// Initialise
			for (var index=previous_cutoff; index < passed_previous.length + stage.numPeople; index++) {
				pass_current[index] = 0.0;
			}


			for (var people=0; people <= stage.numPeople; people++) {
				affected = jStat.binomial.pdf(people, stage.numPeople, trueRate);
				var previous_length = passed_previous.length;
				for (var index=previous_cutoff; index < previous_length; index++) {
					pass_current[index + people] += passed_previous[index] * affected;
				}
			}

			console.log('pass current ' + pass_current);
			var failed_at_stage = 0.;
			for (var index=previous_cutoff; index < stage.passThreshold; index++) {
				failed_at_stage += pass_current[index];
			}
			failed_stage[failed_stage.length] = failed_at_stage;
			average_passed_stage = 0.;

			for (var index=previous_cutoff; index < pass_current.length; index++) {
				average_passed_stage += pass_current[index] * index
			}
			passed_stage[passed_stage.length] = average_passed_stage;

			previous_cutoff = stage.passThreshold;
			passed_previous = pass_current;
			pass_current = [];
		});

		var pass = 0.;
		for (var index=previous_cutoff; index < passed_previous.length; index++) {
			pass += passed_previous[index];
		}
		console.log('pass ' + pass);
		console.log('passed stage ' + passed_stage);
				console.log('failed stage ' + failed_stage);
		return [pass, passed_stage, failed_stage];
	};

	window.createGrid = function(stages, rates) {
		var results = [];
		var passed;
		var died_at_stage;
		rates.forEach(function(rate) {
			var rate_results = runSeqTrial(stages, rate);
			passed = rate_results[0];
			passed_stage = rate_results[1];
			died_at_stage = rate_results[2];
			results[results.length] = { 
				'trueRate' : rate,
				'passed' : passed,
				'numSuccess' : passed_stage,
				'stageFailed' : died_at_stage,
			};
		});
		console.log('results ' + results);
		return results;
	};

	//createGrid([{ 'numPeople' : 5, 'passThreshold' : 3}, {'numPeople' : 5, 'passThreshold' : 6}], [0.5]);
})();

