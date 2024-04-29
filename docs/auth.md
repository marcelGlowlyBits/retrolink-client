# Authentication

## Small notes

### Registering
When a user register for Retrolink, a webhook from clerk creates a new user in the convex database. From here on out we don't use Clerk anymore for user data. Only for the authentication layer. 

Userdata is stored in the DB and from there on, is the single source of truth for user data.