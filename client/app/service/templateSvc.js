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
//保存模板role/operate/act/save
  savetemplate(params){
  	 return this.Api.post(this.baseUrl + 'operate/act/save', params);
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
	
	    return this.Api.post(this.baseUrl+'operate/act/save/rid/'+params.rid, params);
	}
	changeStatus(params){ 
		console.log(params.rid); 
		console.log(params.status);  
		//console.log(params.rid);
	    return this.Api.get(this.baseUrl+'operate/act/update/rid/'+params.rid+/pause/+params.status, {});
	}
	//删除
	remove_role(params){
			console.log(params.rid);
		  return this.Api.post(this.baseUrl+'/operate/act/remove/rid/'+ params.rid, params);

	}
}

export default templateSvc
