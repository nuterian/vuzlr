//# Power Set of a String

(function(){

	var findPowerSet = function(s){

		//Create and initialize an empty set `{}`
		var set = [];
		set.push('');

		//Iterate over all characters in the string.
		for(var i=0; i<s.length; i++){

			//Create a new set to store combinations for the current character.
			var newSet = [];

			//Iterate over all combinations in the previous set.
			for( var j=0; j<set.length; j++ ){

				//Append the current character to each element from the previous set.
				newSet.push(set[j] + s[i]);
			}
			//Finally, concatenate the current set into the previous set.
			set = set.concat(newSet);
		}

		return set;
	}

})();

//##Complexity
//There are `2^n` possible combinations, where `n` is the length of the string. <br/>
//Thus the function will take `O(2^n)` time.