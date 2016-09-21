class storeManageSvc {
    constructor(Api) {
        "ngInject";
        this.Api = Api;
    }

    // 获取门店列表
    getStoreList(params) {
        return this.Api.get('/storemanage/store/search', params);
        // return this.Api.get('/mock/storeList.json', params);
    }

    // 获取门店详情
    getStoreDetail(params) {
        return this.Api.get('/storemanage/store/detail', params);
        // return this.Api.get('/mock/storeDetail.json', params);
    }
}

export default storeManageSvc