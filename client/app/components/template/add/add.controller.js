/**
 * (description)
 * 
 * @author yourname
 */

export default class AddController {
  constructor(templateSvc,$scope) {
  	"ngInject";
    this.name = 'add';
    this.templateSvc= templateSvc;
    $scope.vm.cities=
    [
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
]
// end json
// 
    //这个配置用于避免或减少数据转换
    this.config = {
          //指示子节点的字段名
          fieldOfChildren: 'child',
          //指示节点名的字段
          fieldOfName: 'name',
          //指示节点id的字段
          fieldOfId: 'categoryId'
    };

    //约定：所有抛到后端的都放到这个键下
    this.form = {};

  }
  save(){
  	console.log("save")
  	this.templateSvc.savetemplate()
  }
}