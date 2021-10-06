# spotify-player

Spotify like app on React, Typescript and lot of css :)

## Getting Started:

In order to run the app you will need to add youserlf as a [Spotify Developer](https://developer.spotify.com/documentation/web-api/) and also register a new app, once created you will have a client_id, create a .env file on the root with the following variable

```
CLIENT_ID=[myclientid]
```

this file is readed by webpack and added to the app, then you can do a `npm install` and run the app on dev mode with `npm run start`

## File Structure

Check App src folder where you will find:

- Containers (all wrappers of screens or funcionalities of the app, currently App, Dashboard and Playlist)
- Components, parts of the containers or resuable components
- core: this subfolder handles resuable parts of the app, like hooks, styles, assets, functions and constants variables
- context: the context of the app used based on the [Kent C. Dodds pattern](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

## App Flow:

- The app relies on a AuthProvider and PlaylistsProvider for information flow:

### Login:

- The App.tsx it's the entrypoint of the app and check the initial state of the user in order to grant access to the app,
- Once the user is Logged in spotify will be redirected to the app and the data passed to the context where it will conditionally load the user dashboard and save the token on localStorage,
- the auth mode used for the app is [_Implicit Grant Flow_](https://developer.spotify.com/documentation/general/guides/authorization-guide/),
- Normally this token tend to expire in 3600 second (60 minutes), the App check this every time the page is reloaded.
- All permissions for the spotify API can be found on the core/utils/userPermissions, this permissions are passed to the Auth query as query parameters to have permissions scope of the user ([check scope](https://developer.spotify.com/documentation/general/guides/scopes/))

### Dashboard

- The Dashboard uses the PlaylistProvider to share information and save playlist of the user, it has 2 main parts the CurrentlyPlaying component and the Playlist container
- _CurrentlyPlaying_: this component handles a call to the Spotify API with the user token that is inside the Auth Provider, gets the current playing song otherwise it will show an error
- _KEEP IN MIND IN ORDER OF THE APP TO WORK THE USER MUST BE USING SPOTIFY AND LISTENING MUSIC, OTHERWISE THE PERMISSIONS SCOPE WILL NOT BRING ANY OTHER INFORMATION THROUGH THE API_

### Playlist

The playlist are stored on localStorage as key:value json objects, the setters and getters for localStorage can be found on the utils folders, the Playlsit Reducer undert the Playlsit Context has the elements needed also to check what actions can be done in order to modify the app state, all actions are tied to the localstorage update

## Styling:

Following the guidelines of Spotify the main idea is declare the general styles based on :

- Headings ( titles, subtitles),
- Action Buttons,
- default colors,
- Animations if needed

the general rule for css is use SCSS and BEM methodology

## Spotify guidelines:

https://developer.spotify.com/documentation/web-api/

https://developer.spotify.com/documentation/general/guides/app-settings/

https://developer.spotify.com/documentation/general/design-and-branding/
