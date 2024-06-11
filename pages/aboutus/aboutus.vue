<template>
	<view class="aboutus">
		<image src="/static/logo.png" mode="aspectFill" class="logo"></image>
		<text class="tit">小胖壁纸</text>
		<text class="qq">{{data.cooperation}}</text>
		<text class="qqqun">{{data.wallpaper_group}}</text>
		<text class="bottom">
			免责声明:部分内容来源自互联网，如果涉及版权问题，请随时告知我们。
		</text>
	</view>
</template>

<script>
	import { get_aboutus } from '../../common/api'

	export default {
		data() {
			return {
				data:''
			}
		},
		onLoad() {
			this.get_aboutus_api()
		},
		methods: {
			get_aboutus_api(){
				get_aboutus().then((res)=>{
					this.data=res;
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.aboutus{
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
		height: 100vh;
		.logo{
			margin-top: 100px;
			max-width: 61px;
			max-height: 63px;
			margin-bottom: 10px;
		}
		.tit{
			display: block;
			font-size: 30px;
			margin-bottom: 20px;
			color: #333;
		}
		.qq{
			display: block;
			font-size: 14px;
			color:#666;
			line-height: 30px;
			
		}
		.qqqun{
			display: block;
			font-size: 14px;
			color: #666;
			line-height: 30px;
		}
		.bottom{
			position: absolute;
			padding: 0 20px;
			bottom: 15px;
			text-align: center;
			color: #999;
			line-height: 26px;
			
		}
	}

</style>
