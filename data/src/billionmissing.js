//#Find Missing Integer among A Billion
//<div class="question-item">
//	Given an input file with four billion non-negative integers, provide an algorithm to generate an integer which is not contained in the file. Assume you have 1 GB of memory available for this task.</div>
//</div>

//##Using a Bit Vector
//We have 4 billion integers, which is <= 2^32. 1GB of memory spans out to 8*10^9 bits or 8 billion bits. Therefore, we have enough memory to map each of the 4 billion distinct integers within memory using 1 bit each.

//- Create a Bit Vector with 4 billion bits. A Bit Vector may be an array that stores boolean values compactly.
//- Initialize each bit in the Bit Vector to 0.
//- First scan through all the numbers and set the corresponding bit in the Bit Vector to 1.
//- We then scan the Bit Vector starting at the 0th index and return the first bit that is set to 0.

//<b></b>

var numInts = Number.MAX_VALUE;
var BitVector = new Array(numInts/32); // Integers are 32 bits in javascript

// Initialize all values in the Bit Vector to 0
for(var i=0; i<BitVector.length; i++){
	BitVector[i] = 0;
}

function setBit(n){
	BitVector[n/32] |= 1 << (n % 32);
}

function getBit(n){
	BitVector[n/32] & ( 1 << (n % 32) );
}

//<div class="question-item">
//	What if we had only 10mb memory?
//</div>
//##Dividing the data into Blocks <br/>
//
//We can divide the integers into blocks of some size and then apply the Bit Vector approach to detect a missing interger within the block. 
//Since all values are distinct we will know exactly how many values are expected in a given block. Say, for a block size of 1000, we count 
//how many values are between 0 and 999, 1000 and 1999, etc and return if we are counting only 999 values ina given block.

//To select a block size:

//- Let `rangeSize` denote the size of the ranges of each block.
//- Let `arraySize` represent the number of blocks, such that `arraySize = 2^31 / rangeSize`, since there are `2^31` non-negative integers.
//- Now, to find the minimum rangeSize, let's assume all blocks are in memory and each block is represented by an integer which is 4 bytes (32 bits). Since, we have 10 MB (`2^23` bytes) of memory, we can hold atmost `2^32 / 4 = 2^21` elements.
//	`arraySize = 2^31 / rangeSize <= 2^21`
//	`rangeSize >= 2^31 / 2^21`
//	`rangeSize >= 2^10`
//- For an upperbound, we know we have `2^23` bytes of memory, or `2^26` bits, allowing us the capability to map upto `2^26` distinct numbers. Thus:
//	`2^10 <= rangeSize <= 2^26` 
