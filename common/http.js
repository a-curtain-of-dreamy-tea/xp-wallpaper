export default function $http(options){
	const {
		url,
		data
	} = options;
	return  new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			data:data,
		}).then((res)=>{
			resolve(res.data)
			
		}).catch((err)=>{
			reject(err)
		})
	})
}