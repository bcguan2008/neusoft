/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope, templateSvc, NgTableParams, $state, $location) {
    "ngInject";
    this.name = 'list';
    this.templateSvc = templateSvc;
    this.$state = $state;
    this.NgTableParams = NgTableParams;
    this.$location = $location;
    this.nowTemplate = null;
    this.nowRow = null;
    this.$scope = $scope;
    this.d = {};
    this.init();
    this.filter = {
      limit: 10,
    };
  }
  /**
* 获取格式化后的数据
*/
  getSearchFormData() {
    let filter = this.filter
    return filter
  }
  /**
   * [init 初始化 页面获取数据]
   */

  init() {
    var _this = this;
    let self = this;
    this.tableParams = new this.NgTableParams({
      page: 1
    }, {
        //counts:[],
        getData: function (params) {

          self.loading = true;
          let formData = self.getSearchFormData();
          formData.page = params.url().page;
          formData.limit = params.url().count;
          self.loadPromise = self.templateSvc.getPageAllTempList(formData);
          return self.loadPromise
            .then(result => {
              self.loading = false;
              if (result) {
                _this.d = {
                  totalCount: result.totalCount
                }
                params.total(result.totalCount);
                return result.datas;
              }
            });
        }
      });
  }
  //创建
  creatnewTemplate() {
    this.$location.url('/template/add');
  }
  //查看

  detail(id) {
    this.$state.go('templatedetail', { id: id });
  }

  //修改
  edit(id) {
    this.$state.go('templateedit', { id: id });
  }

  changeStatus(){
    return this.changeStatusFactory(this.nowTemplate);
  }

  enableTemplate(row){
    let mockRow = angular.copy(row);
    /**
     * 启用的状态接口是2
     */
    mockRow.status='2';
    return this.changeStatusFactory(mockRow);
  }

  changeStatusFactory(row) {
    let operateStatus = row.status ;
    this.templateSvc.changeStatus({
      templateNo: row.templateNo,
      status: operateStatus,
      rid: row.rid
    }).then(res => {
      alert("修改成功");
      $('#myModal').modal('hide');
      this.init();
    }, err => {
      $('#myModal').modal('hide');
      this.init();
    })
  }
  //返回
  returnTemplatelist() {
    this.templateSvc.returnTemplatelist()
  }
  //在list里 为了传给模拟框参数
  changeStatusAlert(row) {
    this.nowTemplate = row;
    console.log(row)
    if (row.status == '1') { //生效
      $("#alert2").css('display', '');
      $("#alert4").css('display', '');
      $("#alert1").css('display', 'none');
      $("#alert3").css('display', 'none');
    
    }
    else { //4 暂停
      $("#alert1").css('display', '');
      $("#alert3").css('display', '');
      $("#alert2").css('display', 'none');
      $("#alert4").css('display', 'none');
    }
  }

  removeInfo(a, b) {
    this.nowRow = b;
    //1=暂停 2=启用
    if (b.status == '1') {
      $("#msg1").css('display', 'none');
      $("#msg3").css('display', 'none');
       $("#msg2").css('display', '');
      $("#msg4").css('display', '');
    }
    else {
      $("#msg2").css('display', 'none');
      $("#msg4").css('display', 'none');
        $("#msg1").css('display', '');
      $("#msg3").css('display', '');
    }

  }
  remove_role() {
    this.templateSvc.remove_role(this.nowRow);
    $('#myModal_1').modal('hide');
    this.init();
  }


}