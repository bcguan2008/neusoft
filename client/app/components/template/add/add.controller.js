/**
 * (description)
 * 
 * @author yourname
 */

export default class AddController {
  constructor(Api,treeSvc,$scope) {
  	"ngInject";
    this.name = 'add';
    this.treeSvc= treeSvc;
    this.form = {};
    this.api=Api;
    this.d={};
    this.loadPromise = this.treeSvc.get()
    this.config = {
        fieldOfChildren: 'children',
        fieldOfName: 'name',
        fieldOfId: 'id'
    };
  }
  save(){
    console.log(this.d);
     this.api.post('/role/operate/act/save',this.d).then(res=>{alert('保存成功'),err=>{alert(err)}})
  }

}
