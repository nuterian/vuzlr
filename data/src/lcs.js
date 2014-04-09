//# Longest Common Subsequence

//### Optimal Substructure

//Let the input sequences be `X[0..m-1]` and `Y[0..n-1]` of lengths m and n respectively. And let `L(X[0..m-1], Y[0..n-1])` be the length of LCS of the two sequences X and Y. Following is the recursive definition of `L(X[0..m-1], Y[0..n-1])`.

//If last characters of both sequences match or `X[m-1] == Y[n-1]` then<br/>
//`L(X[0..m-1], Y[0..n-1]) = 1 + L(X[0..m-2], Y[0..n-2])`

//If last characters of both sequences do not match or `X[m-1] != Y[n-1]` then <br/>
//`L(X[0..m-1], Y[0..n-1]) = MAX ( L(X[0..m-2], Y[0..n-1]), L(X[0..m-1], Y[0..n-2])`

//### Simple Recursion

	var lcs = function(a, b){

		var lcsInner = function(a, b, m, n){

			if(m == 0 || n == 0) return 0;

			if(a[m-1] == b[n-1]) 
				return (1 + lcsInner(a, b, m-1, n-1));
			else 
				return ( Math.max( lcsInner( a, b, m-1, n ), lcsInner( a, b, m, n-1 ) ) );
		}

		return lcsInner(a,b,a.length,b.length);
	}


//### Dynamic Programming using Tabulation (Bottom Up)

	var lcsdp = function(a,b){

		var m = a.length, n = b.length;
		var l = new Array(m+1);
		for(var i=0; i<=m; i++){
			l[i] = new Array(n+1);
		}

		for(var i=0; i <=m; i++){
			for(var j=0; j<=n; j++){
				if(i == 0 || j == 0){
					l[i][j] = 0;
				}
				else if(a[i-1] == b[j-1]){
					l[i][j] = l[i-1][j-1] + 1;
				}
				else{
					l[i][j] = Math.max(l[i-1][j], l[i][j-1]);				
				}

			}
		}
		return l[m][n];
	}