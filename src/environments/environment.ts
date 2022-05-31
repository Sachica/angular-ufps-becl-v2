// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleClientId: '132017815030-7sibgsgreh1u9t7bftdkcji6lbh5puag.apps.googleusercontent.com',
  baseUrlAuth: 'http://localhost:8000/auth/api/v1/',
  baseUrlEntrance: 'http://localhost:8001/entrance/api/v1/',
  baseUrlUser: 'http://localhost:8000/users/api/v1/',
  ngrokUrlAuth: 'https://4aa7-200-93-148-32.ngrok.io/auth/api/v1/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
