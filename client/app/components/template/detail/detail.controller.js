/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
 constructor($scope,Api,$http,$state,templateSvc,treeSvc) {
      "ngInject";
      this.name = 'detail';
      var _this = this;
       this.api = Api;
       this.$state=$state;
  		this.treeSvc=treeSvc;
       this.templateSvc=templateSvc;
       this.d={};
 	   this.detailInit();
 	   this.initTree();

  }
      initTree(){
         //约定：所有抛到后端的都放到这个键下
        this.form = {};
//http://demo1015.sit.ffan.com/staffmgt/role/operate/act/nodes/type/{{sop/app}}/rid/23239
        //拉去列表数据的promise
        this.loadPromise = this.treeSvc.getselectSopTree(this.$state.params.id)

        //这个配置用于避免或减少数据转换
        this.config = {
            //指示子节点的字段名
            fieldOfChildren: 'child',
            //指示节点名的字段
            fieldOfName: 'name',
            //指示节点id的字段
            fieldOfId: 'nodeId'
       };

        
    }

   detailInit(){
          let self = this;
          var _this = this;
        return self.templateSvc.getDetail({
          id: this.$state.params.id
        }).then(result => {
              if(result){
                console.log(result)
                   _this.d={
                     name:result.name,
                     description:result.description,
                     rid : result.rid
                    // nodes:result.nodes
                   }

              }
            });
		    }

}