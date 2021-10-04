# spotify-player

Spotify like app on React, Typescript and lot of css :)

## Getting Started:

In order to run the app you will need to add youserlf as a Spotify Developer and also register and app, once created you will have a client_id, create a .env file on the root with the following variable

```
CLIENT_ID=[myclientid]

```

this file is readed by webpack and added to the app, then you can do a `npm install` and run the app on dev mode with `npm run start`

## App Flow:

- The app relies on a AuthProvider, it's a context that holds and check the initial state of the user in order to grant access to the app,
- Once the user is Logged in you have two principal hooks ( useFetchApi and useLocalStorage) to handle the requests of the user and the playlist,

## Styling:

Following the guidelines of Spotify the main idea is declare the general styles based on :

- Headings ( titles, subtitles),
- Action Buttons,
- default colors,
- Animations if needed

## Spotify guidelines:

https://developer.spotify.com/documentation/web-api/

https://developer.spotify.com/documentation/general/guides/app-settings/

https://developer.spotify.com/documentation/general/design-and-branding/
