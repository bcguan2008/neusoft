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
       store:'',
       laterThan:'',
       earlierThan:''
      };
      this.dmonth={}
      this.d={}
      this.filterBymonth = {
       offset: 0
      };
      this.month ={}
      this.initSearch();
      this.initBymonth(); //本月汇总
      

     //this.action = [{ id: 0, name: '' },{ id: 1, name: '首单支付' }, { id: 2, name: '扫码激励' }, { id: 3, name: '拉新激励' }, { id: 4, name: '拉单激励' }];
    //  $scope.vm.items = [
    //     {"id":"一月","name":"1","description":"description 1","field3":"field3 1","field4":"field4 1","field5 ":"field5 1"}, 
    //     {"id":"二月","name":"性别女","description":"description 1","field3":"field3 2","field4":"field4 2","field5 ":"field5 2"}, 
    //     {"id":"二月","name":"性别女","description":"description 1","field3":"field3 3","field4":"field4 3","field5 ":"field5 3"}, 
    //     {"id":"二月","name":"性别女","description":"description 1","field3":"field3 4","field4":"field4 4","field5 ":"field5 4"}, 
    //     {"id":"18200000006","name":"4","description":"description 1","field3":"field3 5","field4":"field4 5","field5 ":"field5 5"}, 
    //     {"id":"性别女","name":"5","description":"description 1","field3":"field3 6","field4":"field4 6","field5 ":"field5 6"}, 
    //     {"id":"性别女","name":"6","description":"description 1","field3":"field3 7","field4":"field4 7","field5 ":"field5 7"}, 
    //     {"id":"性别女","name":"7","description":"description 1","field3":"field3 8","field4":"field4 8","field5 ":"field5 8"}, 
    //     {"id":"9","name":"7","description":"description 1","field3":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
    //     {"id":"10","name":"8","description":"description 1","field3":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
    //     {"id":"11","name":"11","description":"description 1","field3":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
    // ];
   // this.month =  [{ id: 1, name: '一月' }, { id: 2, name: '二月' }, { id: 3, name: '三月' }, { id: 4, name: '四月' }, { id: 5, name: '五月' }, { id: 6, name: '六月' }, { id: 7, name: '七月' }, { id: 8, name: '八月' }, { id: 9, name: '九月' }, { id: 10, name: '十月' }, { id: 11, name: '十一月' }, { id: 18200000006, name: '十二月' }];
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
      merchantId:this.d.merchantId,
      employeeName:this.filter.employeeName,
      phone:this.filter.phone,
      storeName:this.filter.store

    }
    // filter.bizAccountName=this.filter.bizAccountName;
    // filter.phone=this.filter.phone;
    // filter.storeName=this.filter.store; // 门店名称

 
    // let selectAction = this.selectAction; 
    // if(selectAction.value != undefined)
    // {
    //    filter.status = selectAction.value.name;  
    // }

   
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
            console.log(formData)
            //员工奖励汇总
            self.loadPromise = self.staffExcitationSvc.getBestirByMonth(formData);
            return self.loadPromise 
              .then(result => {
                self.loading = false;
              
                if (result && result.length >0) {

                 //debugger;
                 //计算 激励增加 激励扣除 总激励金额
                   result.items.forEach((item)=>{
                              if (totalBymonth==0)
                              {
                                 totalBymonth = item.awardCount
                                 totalAdd = item.awardCount
                                 totalTake =item.outgoAmount
                              }else{
                                 totalBymonth = totalBymonth+item.awardCount
                                 totalAdd = totalAdd +  item.awardCount
                                 totalTake =  totalTake + item.outgoAmount
                              }
                            })
                   self.dmonth = {
                    totalBymonth:totalBymonth,
                    totalAdd: totalAdd,
                    totalTake: totalTake
                   }
                   // console.log(totalBymonth)
                   // console.log(totalAdd)
                   // console.log(totalTake)
                  self.totalCount = result.totalCount
                  params.total(result.totalCount);

                  return result.items; 
                }
              });
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
           //  console.log(formData) 
           //  console.log(self.staffExcitationSvc.getBestirList(formData))
            self.loadPromiseSearch = self.staffExcitationSvc.getBestirList(formData);
            return self.loadPromiseSearch
              .then(result => {
                self.loading = false;
               
                if (result && result.length > 0) {
              
                    result.items.forEach((item)=>{
                              if (totalAmount==0)
                              {
                                 totalAmount = item.amount
                              }else{
                                 totalAmount = totalAmount+item.amount

                              }
                            })
                  self.d = {
                    totalAmount:totalAmount,
                    totalCountSearch: result.totalCount,
                    merchantId:result.items[0].merchantId
                  }

                //  console.log(result.items[0].merchantId)
                  params.total(result.totalCount);
                  return result.items;
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
    let formData = this.getSearchFormData();
        formData.page = this.tableParams.page(); 
        formData.limit = this.tableParams.data.length;
    this.window.open('/Xapi/encourage/month_total?export=excel&'+ this.httpParamSerializer(formData), '_blank');
  }

    exportExcelSearch(){
   // debugger;
    let formData = this.getSearchFormData();
        formData.page = this.tableParams.page(); 
        formData.limit = this.tableParams.data.length;
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