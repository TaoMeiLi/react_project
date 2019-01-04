import requestUtil from './utils/request';

//取得应用全局配置
export const getAppConfig = ()=>requestUtil.get(`/app/config`);

//登录：获取验证码
export const login_getVerifCode = ()=>requestUtil.get('/captcha');

//登录
export const login_submit = (args)=>requestUtil.post(`/login`,{...args});

// 退出登录
export const logOut = ()=>requestUtil.post('/logout');

//获取桌码信息
export const getTableCode = (args) => requestUtil.get(`/tablecode`, {...args});

export const downTableCode = (args) => requestUtil.get(`/downtable`, args);

//获取菜品分类列表信息
export const getKindsData = (args) => requestUtil.get('/dishkind', {...args});

//批量显隐菜品分类
export const showHideKindsData = (args) => requestUtil.post('/dishkind/show_hide', {...args});

//获取菜品分类明细
export const getKindDetail = (args) => requestUtil.get(`/dishkind/edit`,{...args});

//修改菜品分类信息
export const editKindsData = (args) => requestUtil.post(`/dishkind/editPost`,{...args});

//获取菜品列表信息
export const getDishesData = (args) => requestUtil.get('/dishes', {...args});

export const getDishesAll = (args) => requestUtil.get('/dishes/all', {...args});

//批量显隐菜品信息
export const showHidetDishesData = (args) => requestUtil.post('/dishes/show_hide', {...args});

//获取菜品明细
export const getDishDetail = (args) => requestUtil.get(`/dishes/edit`,{...args});


//修改菜品信息
export const editDishData = (args) => requestUtil.post(`/dishes/editPost`,{...args});

//获取推广列表信息
export const getSpreadData = (args) => requestUtil.get('/spread', {...args});

//批量显隐推广信息
export const showHideSpreadData = (args) => requestUtil.post('/spread/show_hide', {...args});

//删除推广信息
export const deleteSpreadData = (args) => requestUtil.post('/spread/del', {...args});

//获取推广明细
export const getSpreadDetail = (args) => requestUtil.get(`/spread/edit`,{...args});

//修改推广信息
export const editSpreadData = (args) => requestUtil.post(`/spread/editPost`,{...args});

//获取订单信息
export const getOrderList = (args) => requestUtil.get('/orderlist', {...args});

//获取订单详情
export const getOrderDetailData = (orderId) => requestUtil.get(`/order/${orderId}`);

//获取机构信息
export const getOrgData = (param) => requestUtil.get(`/organization`,{...param});

//获取微信点餐设置
export const getWxdcData = (param) => requestUtil.post(`/wxdc`,{...param})


//保存微信点餐设置
export const saveWxdcData = (param) => requestUtil.post(`/wxdc/save`,param)

//上传图片
export const uploadImg = (param) => requestUtil.post(`/upload/image`,param)

//获取对应的门店的菜品分类信
export const getDishesCategoryData = (param) => requestUtil.get(`/dishes/category`,{...param})

//同步收银分类
export const updateDishkindData= (param) => requestUtil.get(`/dishkind/update`,{...param})

//同步收银菜品
export const updateDishesData = (param) => requestUtil.get(`/dishes/update`,{...param})

//订单退款
export const refund = (param) => requestUtil.post(`/order/refund`,{...param})

// 获取在线统计列表数据
export const getStatistics = (args) => requestUtil.get('/statistics', {...args})

// 获取数据指标列表数据
export const getIndicators = (args) => requestUtil.get('/indicators', {...args})

export const getTableData = (id) => requestUtil.get(`/table/${id}`)

export const setTableData = (args) => requestUtil.post('/table/save', {...args})