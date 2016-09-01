/**
 * Created by guanbingchang
 */

class templateSvc  {
  constructor(Api,$location) {
    "ngInject";
    this.Api = Api;
    this.location = $location;
    this.baseUrl = "/template/template";
  }
//保存模板
  savetemplate(params){
  	 return this.Api.post(this.baseUrl + 'save', params);
  }
  //显示所有模板
	getPageAllTempList(){
		return this.Api.get('/role/search');
	}
	getTempList(id){
	    return this.Api.get('/template/detail',{});
	}
	//返回新建模板
	returnnewTemplate(){ //ok
     this.location.path("/template/add");
	}

  	//取消
	returnnewTemplate(){ //ok
   		// this.location.path("/template/add");
	}
  	/**
	 * [getDetail 详情]
	 */
	getDetail(params){
	    return this.Api.post('/template/detail', params);
	}
	changeStatus(params){
	    return this.Api.post('/template/changeStatus', params);
	}
}

export default templateSvc
