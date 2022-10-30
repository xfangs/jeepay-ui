let baseUrl = "";
console.info(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
    case 'dev':
        baseUrl = "https://cashier.ccpay.biz/api"  //开发环境url
        break
    case 'production':
        baseUrl = "https://cashier.ccpay.biz/api"   //生产环境url
        break
    case 'test':
        baseUrl = "https://cashier.ccpay.biz/api"   //生产环境url
        break
}

export default baseUrl;
