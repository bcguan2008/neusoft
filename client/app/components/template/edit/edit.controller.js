/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
  constructor(Api, treeSvc, $state, templateSvc) {
    "ngInject";
    this.name = 'edit';
    this.api = Api;
    this.$state = $state;
    this.treeSvc = treeSvc;
    this.templateSvc = templateSvc;
    this.d = {}
    this.init();
  }

  init() {
    let self = this;
    self.loading = true;
    self.loadPromise = self.templateSvc.getDetail({
      id: this.$state.params.id
    })
    this.form = {};
    this.loadPromisesop = this.treeSvc.getselectSopTree(this.$state.params.id)
    this.loadPromiseapp = this.treeSvc.getselectAppTree(this.$state.params.id)

    this.config = {
      fieldOfChildren: 'children',
      fieldOfName: 'name',
      fieldOfId: 'nodeId'
    };
    
    this.loadPromise.then(results => {
      if (results) {
        self.d.name = results.name;
        self.d.description = results.description;
        self.d.rid = results.rid;
      }
    });
  }


  save() {
    this.submitting = true;
    this.d.nodes = this.d.nodes.map(node=>{
      return node.nodeId;
    }).join(',');

    this.templateSvc.postEdit({
      rid:this.d.rid,
      description:this.d.description,
      name:this.d.name,
      nodes:this.d.nodes
    }).then(res => {
      this.submitting = false;
      alert('修改成功');
      this.templateSvc.returntemplist();
    });
  }

}