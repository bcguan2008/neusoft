/**
 * 首先这个文件是被忽略的
 * 根据每个人环境不一样做修改, 这样从webpack.dist.config里面解放出来, 不用跟踪了.
 */

module.exports = {
  /**
   * 要发布的xadmin项目路径
   */
  distPath: '../sop/webroot/SOPAPPS/staff',
  /**
   * 要过滤的api, 解决跨域的, 根据项目的情况改一下
   */
  apiFilter: ['/Database','/Staffmgt','/storemanage/store'],
  /**
   * 要跨的目标域, 一般是sit, 需要服务端提交到sit之后才行
   */
  targetDomain: 'http://demo1015.sit.ffan.com/',
  /**
   * 登陆的cookie, 这里暂时自己先登陆一下, 把cookie拷贝过来
   */
  cookie: 'PHPSESSID=l81i8cso62nvlv3ti8iiq1ga53'
  
};