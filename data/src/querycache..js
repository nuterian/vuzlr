//# Design a Caching Mechanism To Store Results of Most Recent Queries.

//<div class="question-item">
//Imagine a web server for a simplified search engine. This system has `100` machines to respond to search queries,which may then call out using `processSearch (string query)` to another cluster of machines to actually get the result. The machine which responds to a given query is chosen at random, so you can not guarantee that the same machine will always respond to the same request. The method `processSearch` is very expensive. Design a caching mechanism to cache the results of the most recent queries. Be sure to explain how you would update the cache when data changes.	
//</div>

//## Assumptions
//- The number of queries we wish to cache is large (millions).
//- Calling between machines is relatively quicker than calling `processSearch`.
//- The most popular queries would always appear in the cache.
//- Query pre-processing is done at the called machine before invoking `processSearch`.

//## Requirements
//- Given a key, should be able to lookup associate entry efficiently.
//- Old data should be replaced with new data using an expiration mechanism.
//- Updating cache when results of a query change. Especially since popular pages may never expire.

//## Single System Cache
//We need a data structure that allows us to easily purge old data (think priority queues) as well as efficiently lookup data based on keys.
//A `Linked List` allows for inserting fresh data to the front while removing stale data from the end. <br/> 
//A `Hash Table` allows for efficient lookups based on a key but wouldn't allow for easy data purgin.<br/>

//We could get the best of both worlds by using a `Linked List` as a priority queue to add and remove data while maintaing a `Hash Table` that maps from a query to a specific node in the `Linked List`. This not only allows us to efficiently return the cache results, but also to move the appropriate node to the front of the list to update *freshness*.

//## Expanding to Multiple Machines
//The problems states that there's no guarantee that a particular query will be consistently sent to the same machine. Therefore, we need to decide to what extent the cache is shared across machines.

//### Each machine has it's own cache.
//If specific queries are sent to the same machine, this approach would be effective since the data will be present in the cache after the first request. However, since we have no such guarantee, repeat queries sent to different machines would treat it as a fresh request and thus call `processSearch` multiple times.

//### Each machine has a copy of the cache.
//Giving each machine a complete copy of the cache would require the sending of updates to all machines when data is added or updated to the cache. There would be redundancy since the entire data structure would be duplicated.<br/>
//The advantage is that common queries will be always present in the cache no matter which machine the query is sent to. The major drawback is that updating the cache requires sending of data to N different machines and each item in the cahce effectively takes up N times as much space.

//### Each machine has a segment of the cache.
//We can divide up the cache such that each machine holds a different part of it. If machine `i` needs to look up results for a query, it would first need to figure out which machine does the given query map to. This can be implemented using a hash function where each query maps to machine `x`, `x = hash(query) % N`. So when machine `i` receives a query it will send out a request to machine `j`. Machine `j` will then either return the result from it's cache or call `processSearch` and add the result to its cache before returning it back to machine `i`. 


