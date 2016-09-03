/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope,templateSvc,NgTableParams,$state,$location) {
     "ngInject";
    this.name = 'list';
    this.templateSvc = templateSvc;
    this.$state = $state;
    this.NgTableParams = NgTableParams;
    this.$location = $location;
    this.nowTemplate=null;
    this.nowRow=null;
    this.$scope = $scope;
    this.init();
    this.filter = {
      limit: 10,
      };
  }
     /**
   * 获取格式化后的数据
   */ 
  getSearchFormData(){
    let filter = this.filter
    return filter
  }
  /**
   * [init 初始化 页面获取数据]
   */

  init($scope){
    let self = this;
    this.tableParams = new this.NgTableParams({
      page: 1,
      count: 10 //每页几条
    }, {
      counts:[],
      getData: function(params) {

        self.loading = true;
        let formData = self.getSearchFormData();
        formData.page = params.url().page;
   
        return self.templateSvc.getPageAllTempList(formData)
        .then(result => {
           self.loading = false;
          if(result){
             console.log(result);
            params.total(result.totalCount);
           
            return result.datas; 
          }
        });
      }
    });
  }
//创建
  creatnewTemplate(){
    this.$location.url('/template/add');
  }
  //查看

  detail(id){
    console.log(id)
      this.$state.go('templatedetail',{id:id});
  }

  //修改
  edit(id){
      this.$state.go('templateedit', {id: id});
  }
 changeStatus(){
      var newStatus = this.nowTemplate.status=="1"?"2":"1";
      this.templateSvc.changeStatus({
          templateNo:this.nowTemplate.templateNo,
          status:newStatus,
          operatorId:"1111",
          operatorName:"",
          rid:this.nowTemplate.rid
      }).then(res=>{
          this.nowTemplate.status=newStatus;
          alert("修改成功");
      })
  }
  //返回
  returnTemplatelist(){
    this.templateSvc.returnTemplatelist()
  }
  //在list里 为了传给模拟框参数
  changeStatusAlert(row){
      this.nowTemplate = row;
      if(row.status=='1'){
         $("#alert1").css('display','none'); 
         $("#alert3").css('display','none'); 
       }
       else{
           $("#alert2").css('display','none');
           $("#alert4").css('display','none'); 
       }
  }
    //传值给删除确定窗口
  //在list里 为了传给模拟框参数
  removeInfo (a,b){
      this.nowRow=b;
      //1=暂停 2=启用
      if(b.status=='1'){
         $("#msg1").css('display','none'); 
         $("#msg3").css('display','none'); 
       }
       else{
           $("#msg2").css('display','none');
           $("#msg4").css('display','none'); 
       }
   
    }
  remove_role(){
    this.templateSvc.remove_role(this.nowRow)
  }

  
}