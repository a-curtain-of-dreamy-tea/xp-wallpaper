<template>
	<view class="my-header">
		<view class="my-content">
			<view class="my-content-list" @click="mydownloadlist">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="download" size="24" color="#333"></uni-icons>
					<text>我的下载</text>
				</view>
				<uni-icons type="right" size="24" color="#000"></uni-icons>
			</view>
			<view class="my-content-list" @click="aboutUs">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="info" size="24" color="#333"></uni-icons>
					<text>关于我们</text>
				</view>
				<uni-icons type="right" size="24" color="#000"></uni-icons>
			</view>
		</view>
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				avatar:'',
				nickname:''
			}
		},
		onLoad() {
			this.userlogin()
		},
		methods: {
			mydownloadlist(){
				uni.navigateTo({
					url:'/pages/mydownload/mydownload'
				})
			},
			aboutUs(){
				uni.navigateTo({
					url:'/pages/aboutus/aboutus'
				})
			},
	
			
		}
	}
</script>

<style lang="scss">
	page{
		// overflow: hidden;
		}

	.my-header{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		padding: 50px 15px 25px ;
		
		.my-header-avtar{
			margin-bottom: 50px;
			.avtar{
				width: 100px;
				height: 100px;
				border-radius: 100%;
				vertical-align: middle;
				margin-right: 30px;
			}
			.name{
				font-size: 22px;
				color: #333;
				vertical-align: middle;
			}
			.points{
				    display: block;
				    margin-left: 130px;
				    margin-top: -20px;
					color: #666;
			}
		}
		
	}
	.my-content{
		.my-content-list{
			display: flex;
			justify-content: space-between;
			padding: 15px;
			margin-bottom: 15px;
			background-color: #f1f1f1;
			border-radius: 5px;
			font-size: 16px;
			.my-content-list-title{
				display: flex;
				align-items: center;
				.icons{
					margin-right: 10px;
				}
			}
			
		}
	}
</style>
