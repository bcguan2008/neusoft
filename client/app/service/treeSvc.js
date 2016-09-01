/**
 * Created by guanbingchang
 */

class treeSvc  {
  constructor(Api,$q) {
      "ngInject";
      this.q = $q;
    this.Api = Api;
  }
    //得到tree数据
    get(params){
      //模拟
      var q = this.q.defer();
      setTimeout(function(){
          q.resolve([
              {
                  'name':'1级',
                  'id':'407',
                  'children':[
                      {
                        'name':'2级',
                        'id':'409',
                        'children':[
                            {
                                'name':'3级',
                                'id':'410',
                                'children':[]
                            },
                            {
                                'name':'3级',
                                'id':'410',
                                'children':[]
                            }
                        ]       
                      }
                  ],
              },{
                  'name':'1级',
                  'id':'407',
                  'children':[
                      {
                        'name':'2级',
                        'id':'409',
                        'children':[
                           
                        ]       
                      }
                  ],
              }
          ])
      },100);
      return q.promise;
  }

}

export default treeSvc
