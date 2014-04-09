//# Magic Index

(function(){

//## Distinct Array elements
	var arr = [-40, -20, -1, 1, 2, 3, 5, 8, 9, 12, 13];

	var checkMagic = function(start, end, arr){

		while(start <= end){
			var mid = Math.floor((start+end)/2);

			if( arr[mid] === mid )
				return mid;
			else if( arr[mid] < mid )
				start = mid + 1;
			else if( arr[mid] > mid )
				end = mid - 1;
		}

		return -1;
	}

	var magicIndex = checkMagic(0, arr.length-1, arr);

	console.log(magicIndex, (magicIndex>=0) ? arr[magicIndex] : "none");

//## Non-Distinct Array elements
	var brr = [-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13];

	var checkMagicNonDistinct = function( start, end, arr ){

		if(end < start || start < 0 || end >= arr.length ) return -1;

		var mid = Math.floor(( start + end ) / 2);
		var midVal = arr[mid];
		if( midVal === mid ) return mid;

		var left = checkMagicNonDistinct( start, Math.min(mid - 1, midVal), arr);
		if( left >= 0) return left;

		var right = checkMagicNonDistinct( Math.max(mid + 1, midVal), end, arr);
		return right;
	}

	var magicIndex2 = checkMagicNonDistinct( 0, brr.length-1, brr);

	console.log(magicIndex2, (magicIndex2 >= 0) ? brr[magicIndex2] : 'none');

})();