/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($q,staffExcitationSvc,NgTableParams,$httpParamSerializer,storeSvc,$window) {
  	 "ngInject";
      this.name = 'list';
      this.staffExcitationSvc = staffExcitationSvc;
      this.NgTableParams = NgTableParams;
      this.httpParamSerializer = $httpParamSerializer;
      this.storeSvc= storeSvc;
      this.q = $q;
      this.window = $window;
      //查询条件
      this.filter = {
       offset: 0 ,
       employeeName:'',
       phone:'',
       storeId:'',
       laterThan:'',
       earlierThan:'',
       merchantId:''
      };
      this.dmonth={}
      this.d={}
      this.filterBymonth = {
       offset: 0
      };
      this.month ={}
      this.merchantSearch = '';
      this.initSearch();
      this.initBymonth(); //本月汇总
      this.parseInt = parseInt;
  }
 // 月份 补 0
   Appendzero(obj)  
    {  
        if(obj<10) return "0" +""+ obj;  
        else return obj;  
    }

  /**
   * 获取格式化后的数据
   */
  getSearchFormDataBymonth(){
    let filter = this.filterBymonth
     var now = new Date()
     var curYear = now.getFullYear() 
     var curMonth = now.getMonth()+1 //从0开始，因此需要+1
      //获取当前月份传给后台
    let selectmonth = this.month; 

    if(selectmonth.value != undefined && selectmonth.value !="" ) 
    {
       filter.month = selectmonth.value;  
    }else{
      filter.month = curYear +"-" + this.Appendzero(curMonth); 
    }
    return filter

  }


  getSearchFormData(){
    
    let filter = {
     
      employeeName:this.filter.employeeName,
      phone:this.filter.phone,
      //storeName:this.filter.store

    }
  // console.log(this.filter.store.relation_id)
   if(this.filter.store!=undefined){
    filter.storeId=  this.filter.store.relation_id;
  }
    filter.merchantId = $('#merchantId').val()
    filter.laterThan = this.filter.laterThan; //开始时间
    filter.earlierThan = this.filter.earlierThan; //结束时间
    return filter;
  }

  /**
   * [init 初始化]
   */
  initBymonth(){

     let self = this;
      this.tableParams = new this.NgTableParams({
        page: 1,
        count: 10
      }, {
          getData: function ($defer, params) {
            let totalBymonth = 0
            let totalAdd = 0
            let totalTake = 0

            let paramsUrl = params.url();
            self.loading = true;
            let formData = self.getSearchFormDataBymonth();
            formData.offset = paramsUrl.page;
            formData.limit = paramsUrl.count;
            //员工奖励汇总 
            self.loadPromise = self.staffExcitationSvc.getBestirByMonth(formData);
           // console.log(formData)
            return self.loadPromise 
              .then(result => {
                self.loading = false;
                if (result) {

                 //debugger;
                 //计算 激励增加 激励扣除 总激励金额
                   result.items.forEach((item)=>{
                   
                              if (totalBymonth==0)
                              {
                              //*1 接受的是字符 为了计算变成number
                                 totalBymonth = item.amount *1
                                 totalAdd = item.incomeAmount *1
                                 totalTake = item.outgoAmount *1
                              }else{
                            
                                 totalBymonth = totalBymonth *1 + item.amount*1
                                 totalAdd = totalAdd *1 +  item.incomeAmount*1
                                 totalTake =  totalTake*1 + item.outgoAmount*1
                              }
                            })
                   self.dmonth = {
                    totalBymonth:totalBymonth.toFixed(2),
                    totalAdd: totalAdd.toFixed(2),
                    totalTake: totalTake.toFixed(2)
                   }
                  self.totalCount = result.totalCount
                  params.total(result.totalCount);

                  return result.items; 
                }
              })
              // .then(error=>{ self.totalCount = 0
              //  console.log("aa")});
          }
        });
  }

initSearch(){
     
     let self = this;

      this.tableParamsSearch = new this.NgTableParams({
        page: 1,
        count: 10
      }, { 
          getData: function ($defer, params) {
             let totalAmount=0;
            let paramsUrl = params.url();
            self.loading = true;
            let formData = self.getSearchFormData();//filter

            formData.offset = paramsUrl.page;
            formData.limit = paramsUrl.count;
            //员工奖励汇总 
            console.log('=========',formData)              
            self.loadPromiseSearch = self.staffExcitationSvc.getBestirList(formData);
            return self.loadPromiseSearch
              .then(resultsearch => {
                self.loading = false;
             // console.log(resultsearch)
                if (resultsearch) {
             
                    resultsearch.items.forEach((item)=>{
                              if (totalAmount==0)
                              {
                                 totalAmount = item.amount *1
                              }else{
                                
                                 totalAmount = totalAmount *1 +item.amount *1

                              }
                            })
              
                  self.d = {
                    totalAmount:totalAmount.toFixed(2),
                    totalCountSearch: resultsearch.totalCount,
                 
                  }
                  
                  if(resultsearch.totalCount > 0){
                     $('#merchantId').attr("value",resultsearch.items[0].merchantId)
                  }

                  params.total(resultsearch.totalCount);
                  return resultsearch.items;
                }
              });
          }
        });
  }

  searchBymonth(){
          this.tableParams.parameters({page : 1}).reload();
  }

  searchExcitation(){
    
    let laterThan=new Date(this.filter.laterThan)
    let earlierThan=new Date(this.filter.earlierThan)
   
    if(Date.parse(earlierThan) < Date.parse(laterThan))
    {
      alert("结束时间要大于开始时间！")
      return false;
    }
  			//return staffExcitationSvc.getExcitationList(formData)
  	this.tableParamsSearch.parameters({page : 1}).reload();
  }
  /**
   * [reset 重置]
   */
  reset(){
    this.filter = {
      name: '',
      phone: '',
      store:'',
      update_start_time: '',
      update_end_time: ''
    };
    // this.selectAction={}
  }
  /**
   * [downloadExcel]
   */
  exportExcelMonth(){
   // debugger;
    let formData = this.getSearchFormDataBymonth();
        formData.page = this.tableParams.page(); 
        formData.limit = this.tableParams.data.length;
    this.window.open('/Xapi/encourage/month_total?export=excel&'+ this.httpParamSerializer(formData), '_blank');
  }

    exportExcelSearch(){
   // debugger;
    let formData = this.getSearchFormData();
        formData.page = this.tableParamsSearch.page(); 
        formData.limit = this.tableParamsSearch.data.length;
    this.window.open('/Xapi/encourage/list?export=excel&'+ this.httpParamSerializer(formData), '_blank');
  }

    //获取门店list
  getStorelist(storename) {
    let deferred = this.q.defer();
    let storeList = this.storeSvc.getstorebyname(storename).then((result) => {
      return result.datas;
    });
    deferred.resolve(storeList);
    return deferred.promise;
  }

}