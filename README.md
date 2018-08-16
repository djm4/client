# Dublin 2019 Worldcon Member Services Client

This project was forked from the Worldcon75 code at https://github.com/worldcon75/client

These are the front-end clients used by the Dublin 2019 Worldcon Bid,
implemented as single-page react + redux apps. For the back-end code, please see
[dublin2019/api](https://github.com/dublin2019/api).

## Upgrader kiosks (the blue dell computers)

At the convention, the e-mail login flow was cumbersome and failure prone,
so we hacked up a custom one-off flow to run on the few upgrade kiosks,
where a kiosk-mode browser tied to https://api.dublin2019.com/upgraders
lets people log on their by e-mail alone from static email dumps we caught
from the members table, lowercased, salted, hashed and truncated for size
(and to avoid people walking off with a list of all member email addresses).

It doesn't talk to any api server for this data – to reuse it as is,
either drop an `email,logintoken` csv into `emails.csv` in the root dir
or a ` email      | logintoken` paste into `emails.txt`, and run
`make instaloginkeys.js`, commit, push, merge, and publish it to the site
(`npm run build:deploy`, if all you did was to change js, such as this).

### Getting Started

Use `npm install` to fetch the required dependencies, and see [`package.json`](./package.json) for
the various `npm run` targets; the default `npm start` uses
[webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) to incrementally
re-build and serve the client code at `http://localhost:8080/` during development.

To use the client, you'll need a [dublin2019/api](https://github.com/dublin2019/api) server that
you can connect to. In development, the server is assumed to run at its default local address
`https://localhost:4430/`; in production, the default is to use the same host that server the
client code. To specify a different target, use the `API_HOST` environment variable:

```
API_HOST=members.worldcon.fi npm start
```

For other environment variables, see [`webpack.config.js`](./webpack.config.js). If you're running
Docker in a VM and have the `DOCKER_HOST` environment variable set, that will replace the default
`localhost` hostname.

**IMPORTANT**: As all server connections require https and the default development server uses a
self-signed certificate for `localhost`, you'll need to open it directly at `https://localhost:4430/`
to trigger your browser's functionality for bypassing the warning. Until you do that, your browser
will silently block the client's API calls:

  - **Chrome**: Click on _Advanced_, then _Proceed to example.com_
  - **Firefox**: Click on _I Understand the Risks_, then _Add Exception...._, then _Get
    Certificate_, and finally _Confirm Security Exception_
  - **IE**: Click on _Continue to this website (not recommended)_
  - **Safari**: Click on _Show Certificate_, _Always Trust "example.com" when connecting to
    "example.com"_, then _Continue_

Also important: the API server by default self-hosts a client that uses the latest-release
production code hosted on GitHub Pages, so you should make sure that after bypassing the certificate
warning you navigate to your actual client development version, at `http://localhost:8080/`.


### kansa-admin

 Currently, `kansa-admin` is set up to run completely separately from the main `client` interface.
 For development, both use the same server address `http://localhost:8080/` so the back-end CORS
 settings should not need to be updated and authentication cookies can be shared. To use it, it may
 be easier to login first using `client`, or by visiting the API endpoint
 `https://localhost:4430/api/login?email=admin@example.com&key=key` to set the proper auth cookie.
