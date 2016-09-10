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
        //获取sop树的长度
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
     // console.log(this.d.nodes)
      //赋值给nodes 编辑的时候每次都会

      var curnodes = this.d.nodes.length;
      var oldnodes = this.d.nodessop;
      var nodes="";

      //获取已经被选中的子节点的rid
      $.each(this.d.nodes, function(key,val){
        // console.log(val)
        if(typeof val == "object" ) { //根节点
          console.log(val)
          if(val.checked)
                {
                      if(nodes==""){
                        nodes =val.nodeId
                  }else{
                        nodes =nodes+','+val.nodeId
                  }
 
             }

            $.each(val.children, function(keychild,valchild){
                
                      if( typeof(valchild.children) != "undefined" ) {
                          if(val.checked)
                             {
                                if(nodes==""){
                                      nodes =val.nodeId
                                }else{
                                    nodes =nodes+','+val.nodeId
                              }

                        }

                     $.each(valchild.children, function(keycc,valcc){
                     // console.log(valcc +","+ valcc.children);
                      if (valcc.children == "undefined")
                          {
                              if(valcc.checked)
                              {
                                if(nodes==""){
                                  nodes =valcc.nodeId
                                }else{
                                  nodes =nodes+','+valcc.nodeId
                                }

                              }
                          }
                     })
                  }
              });
        
        }
          //console.log(nodes)
      });

    
       this.d.nodes= nodes
       console.log(this.d);
       this.templateSvc.postEdit(this.d); 
    }

}