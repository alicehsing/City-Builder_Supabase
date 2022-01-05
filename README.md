## HTML Setup

- event elements:
  1)city name input and button
  2)slogan input and button
  3)waterfront dropdown
  4)skyline dropdown
  5)castle dropdown

- 'destination' elements for:
  1)city name
  2)slogan array
  3)waterfront image
  4)skyline image
  5)castle image

## Events
- on load
  - problem: new user has no city
    - check to see if this user has a city already (try to fetch it from supabase--if it's null, create a new one and load that)
      - if they do, display that city
      - if they do not have a city create a new, default city for them and display it  
- city name input and button
  - on click 
    - update the name column for this city in the database 
    - fresh fetch
    - display "Welcome to beautiful <city name>"
- slogan input and button
  - on click (pessimistic loading)
    - update the slogan column for this city in the database with the new slogan
    - fetch the slogans again
    - render and append all slogans
- water dropdown
    - update the water_id column for this city in the database 
    - fresh fetch
    - display the water picture correctly
- skyline dropdown
    - update the skyline_id column for this city in the database 
    - fresh fetch
    - display the skyline picture correctly
- castle dropdown
    - update the castle_id column for this city in the database 
    - fresh fetch
    - display the castle picture correctly