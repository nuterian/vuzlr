//# Square root of X

// Find the square root of a number using basic arithmetic operations<br/>

//## Babylonian Method

var squareRoot = function(n){
//Start with an arbitrary positive start value x (the closer to the root, the better).
	var x = n,

// Initialize `y = 1`.
		y = 1,
		e = 0.00001;

// Do following until desired approximation is achieved.
	while(x - y > e){
// Get the next approximation for root using average of x and y
		x = (x+y)/2;
// Set `y = n/x`
		y = n/x;
	}
	return x;
}

//## Newton-Raphson's Method
var squareRoot = function (x)
{
	// Find the midpoint of x
	var g = x/2;
	// e is the approximation 
	var e = 0.0001;
	while(e < Math.abs(g*g-x)){

		// Approximate g
		g = (g + x/g)/2;
	}
	return Math.round(g/e)*e;
}


console.log(squareRoot(5));