/**
 * Created by guanbingchang
 */

class storeSvc  {
  constructor(Api,$q) {
    "ngInject";
    this.Api = Api;
    this.q=$q;
  }
  
    /*
    店铺明细 模拟
    */
    getDetail(id){
        //return this.Api.post('/sop/门店明细',params) ;
        return {
            
            id:1,
            name:"门店A",
            manager:"门店A管理员",
            managerTel:"13050000627",
            bak:"备注",
            template:[
                {name:"模版1",id:1},
                {name:"模版2",id:2},
            ]
        }
    }

  /**
   * 获取门店信息
   */
    getStoreInfoList(params){
        //return this.Api.get('http://admin.sit.ffan.com/Staffmgt/Employee/storelist',params)
        
        return this.Api.get('/Organization/storelist',{id:1})

      //var q = this.q.defer();
      //setTimeout(function(){
      //    q.resolve({
      //        list:[
      //    {id:1,name:"1111",manager:"1111管理员",managerTel:"13234681111"},
      //    {id:2,name:"2222",manager:"2222管理员",managerTel:"13234681122"},
      //    {id:3,name:"3333",manager:"3333管理员",managerTel:"13234681121"},
      //    {id:4,name:"4444",manager:"4444管理员",managerTel:"13234681112"},
      //    {id:5,name:"5555",manager:"5555管理员",managerTel:"13234681123"},
      //    {id:6,name:"6666",manager:"6666管理员",managerTel:"13234681133"},
      //    {id:7,name:"7777",manager:"7777管理员",managerTel:"13234681132"},
      //    {id:8,name:"8888",manager:"8888管理员",managerTel:"13234681134"},

      //    ],
      //      total:12
      //    })
      //},100)
      //return  q.promise;
  }
    //显示模板 根据名字
  getstorebyname(params){
    return this.Api.get('/Organization/storelist/');
  }
   //导出门店信息
  exportExcellist(params){
    return this.Api.get('/Organization/storelist?format=excel');  
  }
}

export default storeSvc
