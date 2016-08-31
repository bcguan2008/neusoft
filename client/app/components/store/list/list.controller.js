/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
    constructor($q,storeSvc,$scope,$http,NgTableParams,$state) {
        "ngInject";
        this.$state = $state
        this.storeSvc = storeSvc;
        this.q = $q;
    this.NgTableParams = NgTableParams;
    this.name = 'list';
    this.init();
  }
    init(){

        //拉去列表数据的promise
        var q = this.q.defer();
        setTimeout(function(){
            q.resolve([
  {
      "categoryId": 1673,
      "categoryName": "TEST",
      "categoryLevel": 1,
      "sort": 2,
      "isLeaf": 1,
      "version": 3,
      "categoryPicSrc": "T1TH_TBQZT1RCvBVdK",
      "createTime": 1466650558000,
      "updateTime": 1467788030000,
      "route": "goodlist",
      "reqParams": null,
      "restangularized": true,
      "fromServer": true,
      "parentResource": null,
      "restangularCollection": false,
      "checked": true
  },
  {
      "categoryId": 1670,
      "categoryName": "测试系统一级目录y",
      "categoryLevel": 1,
      "sort": 3,
      "isLeaf": 0,
      "version": 3,
      "categoryPicSrc": "T15pKTBjWT1RCvBVdK",
      "createTime": 1466578095000,
      "updateTime": 1466650558000,
      "children": [],
      "route": "goodlist",
      "reqParams": null,
      "restangularized": true,
      "fromServer": true,
      "parentResource": null,
      "restangularCollection": false,
      "checked": true
  },
  {
      "categoryId": 1671,
      "categoryName": "测试系统二级类目y",
      "categoryLevel": 2,
      "parent": 1670,
      "sort": 0,
      "isLeaf": 0,
      "version": 2,
      "categoryPicSrc": "T1z8ATBXAT1RCvBVdK",
      "createTime": 1466578172000,
      "updateTime": 1466578205000,
      "children": [],
      "checked": true
  },
  {
      "categoryId": 1672,
      "categoryName": "测试系统三级类目y",
      "categoryLevel": 3,
      "parent": 1671,
      "sort": 0,
      "isLeaf": 1,
      "version": 1,
      "categoryPicSrc": "T108ATB4AT1RCvBVdK",
      "createTime": 1466578205000,
      "updateTime": 1466578205000,
      "checked": true
  }
            ])
        },100);

        //this.loadPromise = $http.get('/Database/coupon_component/selectCity');
        this.loadPromise = q.promise;

        //这个配置用于避免或减少数据转换
        this.config = {
            //指示子节点的字段名
            fieldOfChildren: 'child',
            //指示节点名的字段
            fieldOfName: 'categoryName',
            //指示节点id的字段
            fieldOfId: 'categoryId'
        };

        //约定：所有抛到后端的都放到这个键下
        this.form = {};



        var _this = this;
      this.tableParams = new this.NgTableParams({
          count: 100 //每页几条
      }, {
          counts:[],
          getData: function(params) {
              //console.log(params.url().page);
              //console.log(vm.filter)
              return _this.storeSvc.getStoreInfoList(params)
              .then(result => {
                  _this.loading = false;
                  if(result){
                      params.total(1);
                      return result
                  }
              });
          }
      })
  }
  search(){
  	this.storeSvc.getStoreInfoList();
    }
  detail(id){
      this.$state.go('storedetail', {id: id});
  }
  edit(id){
      this.$state.go('storeedit', {id: id});
  }
    //新增员工
  getstaffpageadd(){
      this.staffnewSvc.getstaffpage()

  } 
}