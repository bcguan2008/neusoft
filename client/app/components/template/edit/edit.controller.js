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
      this.editInit();
      this.initTree();
  }
    initTree(){
        //约定：所有抛到后端的都放到这个键下
        this.form = {};

        //拉去列表数据的promise
        this.loadPromise = this.treeSvc.get()

        //这个配置用于避免或减少数据转换
        this.config = {
            //指示子节点的字段名
            fieldOfChildren: 'child',
            //指示节点名的字段
            fieldOfName: 'categoryName',
            //指示节点id的字段
            fieldOfId: 'categoryId'
        };

        
    }
    save(){
      console.log(this.d)
      this.templateSvc.postEdit(this.d);
       // this.api.post('/Template/updateTemplate',this.d).then(res=>{alert('修改成功'),err=>{alert(err)}})
    }

editInit(){
  
  let self = this;
  var _this = this;
    return self.templateSvc.getDetail({
      id: this.$state.params.id
    }).then(result => {
          if(result){
            console.log(result)
               _this.d={
                 name:result.name,
                 describe:result.description,
                 rid : result.rid,
                 node:result.nodes
               }

          }
        });
    }

}