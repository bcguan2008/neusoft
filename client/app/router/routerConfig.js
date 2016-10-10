
export default [
    {
        /**
         * 新增员工
         */
        name:'staffadd',
        url:"/staff/add",
        template:'<staffadd></staffadd>',
    },
    {
        /** 
         * 员工管理
        */
        name:'stafflist',
        url: '/staff/list/:id',
        template: '<stafflist></stafflist>',
        tracking:{
            key:'SOP_SOPHOME_STAFFTMAN_SW/_SW'
        }
    },
    {
        /**
         * 我的门店
         */
        name:'storelist',
        url: '/store/list',
        template: '<storelist></storelist>',
        tracking:{
            key:'SOP_SOPHOME_STAFFTMAN_STAFFSTORE_TAB'
        }
    },
    {
        /**
         * 功能模板管理
         */
        name:'templatelist',
        url: '/template/list',
        template: '<templatelist></templatelist>',
        tracking:{
            key:'SOP_SOPHOME_STAFFTMAN_FUNCTEMPLATE_TAB'
        }
    },
    {   
        /**
         * 我的权限
         */
        name:'myrole',
        url: '/myrole',
        template: '<myrole></myrole>',
        tracking:{
            key:'SOP_SOPHOME_STAFFTMAN_MYPOWER_TAB'
        }
    },
    {
        /**
         * 员工激励
         */
        name:'staffElist',
        url: '/staffExcitation/list',
        template: '<list></list>',
        tracking:{
            key:'SOP_SOPHOME_STAFFTMAN_STAFFACTIVE_TAB'
        }
    },
    {
        /**
         * 我的激励
         */
        name:'personlist',
        url: '/staffExcitation/personlist',
        template: '<personlist></personlist>',
        tracking:{
            key:'SOP_SOPHOME_STAFFTMAN_MYACTIVE_TAB'
        }
    },
    {
        /**
         * 认领门店
         */
        name:'storeMclaimlist',
        url: '/storeManage/claimList',
        template: '<storemclaimlist></storemclaimlist>',
        tracking:{
            key:'SOP_SOPHOME_STAFFTMAN_MYACTIVE_TAB'
        }
    },
    {
        /**
         * 我的门店
         */
        name:'storeMlist',
        url: '/storeManage/list',
        template: '<storemlist></storemlist>',
        tracking:{
            key:'SOP_SOPHOME_STAFFTMAN_MYACTIVE_TAB'
        }
    }

]
