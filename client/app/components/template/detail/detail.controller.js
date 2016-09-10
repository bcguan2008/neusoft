/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
    constructor(Api,treeSvc,$state,templateSvc) {
      "ngInject";
      this.name = 'edit';
      this.api = Api;
      this.$state=$state;
      this.treeSvc = treeSvc;
      this.templateSvc = templateSvc;
      this.d={};
      
      this.init();
  }

    init(){
      let self = this;
      self.loading = true;
        
      self.loadPromise= self.templateSvc.getDetail({
        id: this.$state.params.id
      })
      this.loadPromise.then(results=>{
        if (results) {
          self.loading = false;
          self.d.name = results.name;
          self.d.description = results.description;
          self.d.rid = results.rid;
        }
      })

      this.form = {};
      this.loadPromisesop = this.treeSvc.getselectSopTree(this.$state.params.id)
      this.loadPromise.then(results=>{
        self.d.nodes = results;
      })
      this.loadPromiseapp = this.treeSvc.getselectAppTree(this.$state.params.id)
      this.loadPromiseapp.then(results=>{
        self.d.nodes = results;
      })
      this.config = {
          fieldOfChildren: 'children',
          fieldOfName: 'name',
          fieldOfId: 'nodeId'
      };
    }
    
    save(){     
       console.log(this.d);
       this.templateSvc.postEdit(this.d);
    }
}