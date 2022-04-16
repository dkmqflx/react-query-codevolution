## React Query

- What

  - a library for fetching data in a React application

- Why?

  1. Since a React us a UI library, there is no specific pattern for data fetching
  2. useEffect hook for data fetching and useState hook to maintain component state like loading, error or resulting data
  3. If the data use needed throughout th app, we tend to use state management libraries
  4. Most of the state management libraries are good for working with client state (Ex. ‘Theme’ for application / whether a modal is open)
  5. State management libraries are not great for working with asynchronous or server state

### Client vs Server state

- Client state

  - Persisted in your app memory and accessing or updating it is synchronous

- Server state
  - Persisted remotely and requires asynchronous APIs for f etching or updating
  - Has shared ownership
  - Data can be updated by someone else without your knowledge
  - UI data may not be in sync with the remote data
  - Challenging when you have to deal with caching, deducing multiple requests for the same data, updating stale data in the background, performance optimizations etc

-> react query is solution !

----
## Reference
- [React Query Tutorial - Codevolution](https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2)
