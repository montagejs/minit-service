# minit-service

Docker image that exposes a REST API for running minit commands.

To make this service useful, it should be given a volume to run its commands against. For example, a docker-compose setup that uses this service might have a `docker-compose.yml` with a snippet similar to the following:

```yaml
services:
  minit:
    image: montagestudio/minit-service
    volumes:
      my-projects:/home
```

With such a volume, the service's `/app`/, `/component`, etc. endpoints will create files in the volume so other services can see the changes.

### Documentation

To see the swagger documentation on the endpoints that this service supports, `npm install` the project and run `npm run doc`. This opens a browser pointing to the swagger page in `doc/`.
