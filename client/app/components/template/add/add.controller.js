/**
 * (description)
 * 
 * @author yourname
 */

export default class AddController {
  constructor(treeSvc,$scope) {
  	"ngInject";
    this.name = 'add';
    this.treeSvc= treeSvc;
    this.form = {};
    this.loadPromise = this.treeSvc.get()
    this.config = {
        fieldOfChildren: 'children',
        fieldOfName: 'name',
        fieldOfId: 'id'
    };
  }

  save(){

  }
}
