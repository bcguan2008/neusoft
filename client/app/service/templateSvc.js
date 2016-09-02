/**
 * Created by guanbingchang
 */

class templateSvc  {
  constructor(Api,$location) {
    "ngInject";
    this.Api = Api;
    this.location = $location;
    this.baseUrl = "/role/";
  }
//保存模板
  savetemplate(params){
  	 return this.Api.post(this.baseUrl + 'save', params);
  }
  //显示所有模板 role/search
	getPageAllTempList(params){
		return this.Api.get(this.baseUrl + 'search',params);
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
	// /role/operate/act/detail/rid/'+params
	getDetail(params){
	    return this.Api.post(this.baseUrl+'/operate/act/detail/rid/', params);
	}

	postEdit(params){
		// debugger;
		console.log("postEdit");
	    return this.Api.post(this.baseUrl+'/operate/act/save/rid/', params);
	}
	changeStatus(params){
	    return this.Api.post('/template/changeStatus', params);
	}
	//删除
	remove_role(params){
		  return this.Api.post(this.baseUrl+'/operate/act/remove/rid', params);

	}
}

export default templateSvc
