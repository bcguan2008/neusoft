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

    // 经营品牌列表
    getBrandList(brandName) {
        var params = {
            brandName: brandName,
            limit: 10000
        }
        console.log(params);
        return this.Api.get('/storemanage/label/brand', params);
    }

    // 全国省/市
    getProvinceList() {
        return this.Api.get('/storemanage/label/province');
    }

    // 根据省份查询城市
    getCityList(provinceId) {
        return this.Api.get('/storemanage/label/city', provinceId);
    }

    // 根据城市查询区域
    getRegionList(cityId) {
        return this.Api.get('/storemanage/label/region', cityId);
    }
    
    // 认领门店列表
    getClaimList(params) {
        return this.Api.get('/storemanage/claim/search', params);
    }
}

export default storeManageSvc