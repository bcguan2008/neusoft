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
      // this.api.get('/Template/detail',{templateNo:this.$state.params.id}).then(res=>{
      //     _this.d=res;
      // })
      /**
      this.editInit();
      this.initTree();
      */
      this.init();
  }

    init(){
      let self = this;
      self.loading = true;
        
      self.loadPromise= self.templateSvc.getDetail({
        id: this.$state.params.id
      })
      this.loadPromise.then(results=>{
        //self.d.nodes = results;
        if (results) {
         // console.log(results)
              self.d.name = results.name;
              self.d.description = results.description;
              self.d.rid = results.rid;
        }
      })

      this.form = {};
      this.loadPromise = this.treeSvc.getselectSopTree(this.$state.params.id)
      this.loadPromise.then(results=>{
        console.log(results)
      self.d.nodes = results;
        //��ȡsop���ĳ���
        self.d.nodessop = results.length;
      })
      this.loadPromiseapp = this.treeSvc.getselectAppTree(this.$state.params.id)
      this.loadPromiseapp.then(results=>{
        self.d.nodesapp = results;
      })
      this.config = {
          fieldOfChildren: 'children',
          fieldOfName: 'name',
          fieldOfId: 'nodeId'
      };

      return self.loadPromise.then(result => {
            if(result){
              self.loading = false;
            }
          });
    }
    
    save(){     

      var curnodes = this.d.nodes.length;
      var oldnodes = this.d.nodessop;
      console.log(this.d.nodes.children)

      if(oldnodes < curnodes){ //�ύ��ʱ��������


      }
      for(var i=0;i<this.d.nodessop;i++) {
        if(nodes=='')
        {
          nodes= nodesid[i].nodeId 
        }else{
         nodes=nodes +','+ nodesid[i].nodeId 
         }
       
     }
       this.templateSvc.postEdit(this.d);
    }
}