//# Find an Element in a Sorted Array that is Rotated by an Unknown Number.
//<div class="question-item">
//Given a sorted array of n integers that has been rotated an unknown number of times, write code to find an element in the array. You may assume that the array was originally sorted in increasing order.	
//</div>
//<br/>
//## Example

var Array1 = {10, 15, 20, 0, 5}
var Array2 = {50, 5, 20, 30, 40}

//Both have a midpoint of `20`. <br/>
//In `Array1`, since `10 < 20`, the left half must be ordered normally. <br/>
//In `Array2`, since `50 > 20`, the right half must be ordered normally. <br/>

//Special Case: 
var Array3 = {2, 2, 2, 3, 4, 2}

//In this case the *middle* is same as both *left* and *right*


//1. First, detect which side is ordered normally (in increasing order) by checking the middle element with the edge elements:
//	- If `left < mid`, the *Left half* is ordered normally.
//	- Else If `right > mid`, the *Right half* is ordered normally.
//2. Next, we check whether the given number can lie within the normally ordered half, if not we search the other half.
//	- For the *Left Half*, If `x >= left` and `x <= mid`, Search *Left*, Else Search *Right* 
//	- For the *Right Half*, If `x <= right` and `x >= mid`, Search *Right*, Else Search *Left*
//3. Special Case: If *Left half* has all repeats, i.e., `left == mid`, then:
//	- If `mid != right`, Search *Right*.
//	- Else, Search both *Left* and *Right*.

//### Complexity
//If all elements are unique, this will run in `O(log n)`, since at every step we will be reducing the search array by half. <br/>
//However with many duplicates, the algorithm will take `O(n)` time since we'll have to often search both halves.


