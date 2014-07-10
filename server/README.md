Azix Server
===

Express server to connect Azix CLI, AWS instances and web app.

## General Process

### CLI init
1. Receives POST w/ { username, timestamp, projectname }
2. Creates uid with data
3. Forks base repo and names it with uid
4. Sends back data { uid, repoEndpoint }
   - so client can pull down

Notes: Forking base repo on server and sending back endpoint forces client to have origin set to Azix

### CLI run
1. CLI pushes to a repo
2. CLI POSTs { uid }
3. Add entry to RunLogs
4. Start Instance
5. POST to Instance { repoEndpoint }


### After Instance runs
1. Receives POST w/ { repoEndpoint  }
2. Adds completed to RunLogs