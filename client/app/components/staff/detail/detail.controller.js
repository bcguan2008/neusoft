/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
  constructor($scope,staffnewSvc,$state,Api) {
  	 "ngInject";
  	this.staffnewSvc=staffnewSvc;
    this.name = 'detail';
    this.$state = $state;
    this.api = Api;
    this.detailInit();
    this.d={}
 
  }

//返回
  returnstafflistc(){
  	this.staffnewSvc.getstafflist();
  }

     detailInit(){
      let self = this;
      var _this = this;
       self.loading = true;
       let params ={
        id:this.$state.params.id,
        type:1
        };
       self.loadPromise = this.api.get('/Employee/detail',params);

       return self.loadPromise .then(res=>{
         self.loading = false;
         console.log(res)
            _this.d=res;
        })
    }
}