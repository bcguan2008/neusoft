/**
 * (description)
 * 
 * @author yourname
 */

export default class AddController {
  constructor(treeSvc, $scope, templateSvc) {
    "ngInject";
    this.name = 'add';
    this.treeSvc = treeSvc;
    this.form = {};
    this.d = {};
    this.tabType = 1;
    this.templateSvc = templateSvc;
    this.config = {
      fieldOfChildren: 'children',
      fieldOfName: 'name',
      fieldOfId: 'nodeId'
    };
    this.loadPromise = this.treeSvc.getSopTree('sop');
    this.loadPromiseapp = this.treeSvc.getAppTree('app');
  }

  save() {

   if(this.d.nodes.length == 0){
      alert("请选择功能模板！")
      return false;
    }
    this.d.nodes = this.d.nodes.map((node)=>{
      return node.nodeId;
    }).join(',');

  
    this.templateSvc.addTemplate(this.d).
      then(res => {
        this.templateSvc.returntemplist()
      })
  }
}