/**
 * @author name emailAddress
 */

'use strict';

import angular from 'angular';
import 'ffan-bp-menu';
import 'ffan-bp-header';

let commonModule = angular.module('app.common', [
  'bp.menu',
  'bp.header'
]);

export default commonModule;
