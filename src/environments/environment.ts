// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:9098/api/v1/',
  // apiUrl: 'http://petstorebackend-env.eba-g95jjqqn.us-east-2.elasticbeanstalk.com/api/v1',
  stripe: 'pk_test_51J61qnG9Zk5ebGQ9xZm1u9YP22pYzHhrDilKicmfsejz3ueJTaH9R7wRFsNxdEmnqWIL2hkjOgIap7uKeHbH5zLW00LUtGrVuk',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
