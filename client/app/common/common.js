/**
 * @author name emailAddress
 */

'use strict';

import angular from 'angular';
import 'bp-sop-common';
import 'bp-sop-menu';

let commonModule = angular.module('app.common', [
  'sop.common',
  'sop.menu'
]);

export default commonModule;
