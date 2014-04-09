//#Detect All Duplicates among Billions

//<div class="question-item">
//You have 10 billion URLs. How do you detect the duplicate documents? In this case, assume that "duplicate" means that the URLs are identical.
//</div>
//## Introspection
//We have 10 billion URLs, and assuming each url averages 100 characters (4 bytes each [Unicode]), we require `10^10 * 10^2 * 2*2 = 4 * 10^12` bytes or upto `2^42 bytes = 4 TeraBytes`. Assuming we could store all the data in memory, a simple solution to the problem would be to create a hash table, wehere each URL maps to true is it exists.

//## One Machine using Disk Storage
//We could split the URL's into 4000 chunks of 1GB each and store each of them as a file. This could be done with the help of a hash function, where each URL is stored in a file called `x`, where `x = hash(url) % 4000`, such that URLs with the same hash value (duplicates even) will be in the same file. We just have to make sure there is an even distribution among the 4000 chunks to avoid overflow that may cause two URLs with the same hash value (possibly duplicates) to be stored in different files. Once the files are created, we simply load each file into memory and check for duplicates using a hash map as before.

//## Multiple Machines
//In this case, we send each URL to machine `x` using the hashing technique as before. 
//The main advantage is that the operation of finding duplicates can be parallelized for each chunk, resulting in a faster solution.
//The primary drawback of this approach is that we need to rely on multiple machines, and with more data and esentially more machines, the system becomes a lot more complex since we need to handle failures.