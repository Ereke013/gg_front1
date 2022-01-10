// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  urlPrefix: 'http://' + location.hostname + ':1313/web/',
  production: false,
  apiUrl: 'http://' + location.hostname + ':8080/',
  wsUrlPrefix: 'ws://' + location.hostname + ':8484/websocket',
  ncaLayerWsUrlPrefix: 'wss://'+ location.hostname + ':13579',
  imageUrl: 'http://' + location.hostname + ':8484/file/download-photo'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
