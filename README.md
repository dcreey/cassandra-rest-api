# cassandra-rest-api

Restful versioned API proof of concept using the following technologies:
* ESlint
* Babel
* Express
* Cassandra - using cassandra-driver
* Mocha - unit tests
* Gaze - homebrew file-watcher for automatic re-transpiling and express server re-loading

To build the solution run the following command lines:
* npm install

Send all API calls to:
* localhost:3000/{Version}

Versions
* v1

----
## API - Endpoints
* Contacts
    * <code>GET</code> /contacts
    * <code>POST</code> /contacts
* Contacts/{id}
    * <code>GET</code> /contacts/{contact_id}
    * <code>PUT</code> /contacts/{contact_id}
    * <code>DELETE</code> /contacts/{contact_id}
    
Example:  <code>GET</code> localhost:3000/v1/contacts
