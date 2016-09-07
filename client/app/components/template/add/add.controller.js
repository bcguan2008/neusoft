/**
 * (description)
 * 
 * @author yourname
 */

export default class AddController {
  constructor(Api,treeSvc,$scope,templateSvc) {
    "ngInject";
    this.name = 'add';
    this.treeSvc= treeSvc;
    this.form = {};
    this.api=Api;
    this.d={};
    this.templateSvc = templateSvc;
        this.loadPromise = this.treeSvc.getSopTree('sop');
        this.config = {
            fieldOfChildren: 'children',
            fieldOfName: 'name',
            fieldOfId: 'nodeId'
        };
        this.loadPromiseapp = this.treeSvc.getAppTree('app');
        this.config = {
          fieldOfChildren: 'children',
          fieldOfName: 'name',
          fieldOfId: 'nodeId'
        };


  }

  save(){
   // console.log(this.d.nodes[0].nodeId)
   var nodes='';
    var nodesid = this.d.nodes
    //只算了增加的，没有计算减少的
     for(var i=0;i<nodesid.length;i++) {
        if(nodes=='')
        {
          nodes= nodesid[i].nodeId 
        }else{
         nodes=nodes +','+ nodesid[i].nodeId 
         }
       
     }
     console.log(nodes)
     this.d.nodes = nodes

     this.api.post('/role/operate/act/save',this.d).
       then(res=>{
        this.templateSvc.returntemplist()
      })
  }
}