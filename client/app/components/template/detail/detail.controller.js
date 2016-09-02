/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
 constructor($scope,Api,$http,$state,templateSvc) {
      "ngInject";
      this.name = 'detail';
      var _this = this;
       this.api = Api;
       this.$state=$state;
  
       this.templateSvc=templateSvc;
       this.d={};
 	  this.detailInit();

  }

   detailInit(){
		  let self = this;
		  var _this = this;
		    return self.templateSvc.getDetail({
		      id: this.$state.params.id
		    }).then(result => {
		          if(result){
		               _this.d={
		                 name:result.name,
		                 description:result.description
		               }

		          }
		        });
		    }

}