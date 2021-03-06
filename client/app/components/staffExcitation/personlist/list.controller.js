/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor(staffExcitationSvc,NgTableParams,$window,$httpParamSerializer) {
  	 "ngInject";
     this.name = 'list';
     this.staffExcitationSvc = staffExcitationSvc;
     this.NgTableParams = NgTableParams;
     this.window=$window;
     this.httpParamSerializer=$httpParamSerializer;
     this.filter = {
       offset: 0
    };
    this.selectMonth = {};
    this.selectTask={}
    this.init(); 
    this.selectTask.value = "recruitingOrder"
     // $scope.vm.staffExcitation = [{ id: 1, name: 'name 1' }, { id: 2, name: 'name 2' }, { id: 3, name: 'name 3' }, { id: 4, name: 'name 4' }];
     // $scope.vm.action = [{ id: 1, name: '一般好' }, { id: 2, name: '良' }, { id: 3, name: '优秀' }];
  }
   // 月份 补 0
   Appendzero(obj)  
    {  
        if(obj<10) return "0" +""+ obj;  
        else return obj;  
    }

  //格式化数据
  getSearchFormData()
  {
    
    let filter  = {
      month:this.filter.month,
      type:this.filter.task,
    }

    var now = new Date()
    var curYear = now.getFullYear() 
    var curMonth = now.getMonth()+1 //从0开始，因此需要+1

//获取 选择月份
//如果不选择就显示当前月份信息
   let sMonth = this.selectMonth; 
    if (sMonth.value != undefined  && sMonth.value !="" ) {
      filter.month = sMonth.value;
    }else{
      filter.month = curYear +"-" + this.Appendzero(curMonth); 
    }
//获取激励场景
    let selectTask = this.selectTask; 
    
    if (selectTask.value != undefined) {
      filter.type = selectTask.value;
    }else{
      filter.type = "recruitingOrder"
    }

   //  console.log( filter)
    return filter;

  }

   /**
   * [init 初始化]
   */
  init(){

     let self = this;
      this.tableParams = new this.NgTableParams({
        page: 1,
        count: 10
      }, {
          getData: function ($defer, params) {
          let totalAmount = 0
            let paramsUrl = params.url();
            self.loading = true;
            let formData = self.getSearchFormData();
           
           formData.offset = paramsUrl.page;
            formData.limit = paramsUrl.count;
            // console.log(formData)
            //员工个人奖励汇总
            self.loadPromise = self.staffExcitationSvc.getBestirPerList(formData);
            return self.loadPromise
              .then(result => {
                self.loading = false;
                if (result) {
                    //计算 激励增加 激励扣除 总激励金额
                   result.items.forEach((item)=>{
                              if (totalAmount==0)
                              {
                                 totalAmount = item.amount *1
                              }else{
                                 totalAmount = totalAmount *1 +item.amount *1

                              }
                            })
                  self.d = {
                    totalAmount:totalAmount.toFixed(2)
                  }
                
                  self.d.totalCount = result.totalCount;
                  params.total(result.totalCount);
                  //需要汇总的数据
                  return result.items;
                }
              });
          }
        });
  }


  search() {
    this.tableParams.parameters({ page: 1 }).reload();
  }
  
  // 导出Excel
  exportExcel(){
   // debugger;
    let formData = this.getSearchFormData();
        formData.offset = this.tableParams.page(); 
        formData.limit = this.tableParams.data.length;
  // this.window.open('/Staffmgt/Employee/stafflist?format=excel&'+ this.httpParamSerializer(formData), '_blank');
   this.window.open('/Xapi/encourage/encourage_my_list?export=excel&'+ this.httpParamSerializer(formData), '_blank');

  }
}