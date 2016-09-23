/**
 * @author name emailAddress
 */

'use strict';

import angular from 'angular';
import 'bp-sop-common';
import 'bp-sop-menu';
import checkboxTree from './checkboxTree/index';

let commonModule = angular.module('app.common', [
  'sop.common',
  'sop.menu',
  'ui.tree',
   checkboxTree.name
]);

export default commonModule;
