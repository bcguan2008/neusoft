import Api from '../api.service';
class storeManageSvc {
    constructor($http, $q) {
        "ngInject";
        this.Api = new Api($http, $q);
    }

    // 获取门店列表
    getStoreList(params) {
        return this.Api.get('/storemanage/store/search', params);
    }

    // 获取门店详情
    getStoreDetail(params) {
        return this.Api.get('/storemanage/store/detail', params);
    }
    
    // 查看单个门店二维码
    getStoreCode(params) {
        return this.Api.get('/storemanage/store/code', params);
    }

    // 经营品牌列表
    getBrandList(brandName) {
        var params = {
            brandName: brandName,
            limit: 99
        }
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

    // 门店认领
    claimStore(params) {
        return this.Api.post('/storemanage/claim/receive', params);
    }

    // 编辑门店
    updateStore(params) {
        return this.Api.post('/storemanage/store/update', params);
    }

    // 新增门店
    saveStore(params) {
        return this.Api.post('/storemanage/claim/save', params);
    }

    // 认领门店详情
    getClaimDetail(params) {
        return this.Api.get('/storemanage/claim/detail', params);
    }

    // 【认领】编辑门店
    updateClaim(params) {
        return this.Api.post('/storemanage/claim/update', params);
    }
}

export default storeManageSvc