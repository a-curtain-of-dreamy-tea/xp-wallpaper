import $http from '../http.js';

const basehost = 'https://xxx.cn';
// 查询所有的壁纸
export const get_all_ppwdata = (data) =>{
	return $http({
		url : basehost+'/api/wallpapers/',
		method: 'get',
		data
	})
}
// 轮播图
export const get_all_carouselsdata = (data) =>{
	return $http({
		url : basehost+'/api/carousels/',
		method: 'get',
		data
	})
}

//轮播图进专题详情列表
export const get_all_albumsdata = (data) =>{
	return $http({
		url : decodeURIComponent(basehost+'/api/albums/'+data.link+'/?page='+data.page),
		method: 'get',
	})
}

//具体详情页面

export const get_detail = (data) =>{
	return $http({
		url : basehost+'/api/wallpapers/'+data+'/',
		method: 'get',
		data
	})
}


// tab的列表

export const get_all_index_tabdata = (data) =>{
	return $http({
		url : basehost+'/api/sections/',
		method: 'get',
		data
	})
}


// 首页tab切换列表 
export const get_all_index_boxlistdata = (data) =>{
	return $http({
		url : decodeURIComponent(basehost+'/api/sections/'+data+'/'),
		method: 'get',
		data
	})
}
//精选 
export const get_all_jignxuan_boxlistdata = (data) =>{
	return $http({
		url : decodeURIComponent(basehost+'/api/sections/'+data.list_type+'/?page='+data.page),
		method: 'get',
	})
}


//所有专辑列表
export const get_all_albums = (data) =>{
	return $http({
		url : basehost+'/api/albums/',
		method: 'get',
		data
	})
}

// 所以标签列表
export const get_all_tags = (data) =>{
	return $http({
		url : basehost+'/api/tags/',
		method: 'get',
		data
	})
}

// 单个标签列表

export const get_single_taglist = (data) =>{
	return $http({
		url : basehost+'/api/tags/'+data.name+'/wallpapers/?page='+data.page,
		method: 'get',
	})
}


// 搜索flow热门标签
export const get_search_hot_tags = (data) =>{
	return $http({
		url : basehost+'/api/hot-tags/',
		method: 'get',
		data
	})
}

//搜索结果页面

export const get_query = (data) =>{
	return $http({
		url : basehost+'/api/wallpapers/?query='+data,
		method: 'get',
		data
	})
}


// 关于我们
export const get_aboutus = (data) =>{
	return $http({
		url : basehost+'/api/about-us/',
		method: 'get',
		data
	})
}

