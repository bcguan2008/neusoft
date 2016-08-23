/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor(storeSvc) {
    "ngInject";
    this.storeSvc = storeSvc;
    this.name = 'list';
    console.log(storeSvc);
  }
}