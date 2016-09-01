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

  // detailInit(){
  //   var _this = this;
     
  //   return self.staffnewSvc.getDetail({
  //     id: this.$state.params.id
  //   }).then(data => {
       
  //     if(data){
  //        _this.d=data;
  //     }
  //   })
  // }

     detailInit(){
        let params = {
          id:this.$state.params.id,
          type:1
        };

        this.api.get('/Employee/detail/',params).then(res=>{
        })
    }
}