<template>
	<view class="home">
		<view class="scroll"v-if="!nodata">
			<scroll-view class="list-scroll" scroll-y="true">
				<view class="listcard-image">
						<view class="listcard-image-item" v-for="(item,index) in list" :key="index" @click="gotodetail(item.id)">
							 <image  :src="item.image" mode="aspectFill"></image>
						</view>
				</view>
				
			</scroll-view>
		</view>
		<view class="empty" v-if="nodata">
			暂无下载数据
		</view>
		<view class="bottom">
				<view class="b-nav" @click="gotoindex">
					<image src="../../static/home.png" class="icon"></image>
					<text class="title">首页</text>
				</view>
				<view class="b-nav">
					<button open-type="share"  plain="true" class="sharebtn">
						<text>分享</text>
					</button>
				</view>
			
		</view>
		
	</view>
</template>

<script>
	import { get_search_hot_tags } from '../../common/api'
	
	export default {
		data() {
			return {
				nodata:true,
				list:[]
			}
		},
		onLoad() {
			this.getlist()
		},
		methods: {
			getlist(){
				let tha = this;
			
			},
			opensearch(){
				uni.navigateTo({
					url:'/pages/searchflow/searchflow'
				})
			},
			gotodetail(id){
				console.log(id,88999)
				uni.navigateTo({
					url:'/pages/detail/detail?id='+id
				})
			},
			gotoindex(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
		// overflow: hidden;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		
	}
	
	.scroll{
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			flex-direction: column;
			margin: 20px 10px 15px;
			.list-scroll{
				height: 100%;
				display: flex;
				overflow: hidden;
				.listcard-image{
					margin-top: 5px;
					width: 100%;
					box-sizing: border-box;
					.listcard-image-item{
						display: inline-flex;
						width: 33.333%;
						justify-content: center;
						flex-direction: row;
						box-sizing: border-box;
						margin-bottom: 10px;
						image{
							// border: 2px solid #f0f;
							border-radius: 10px;
							width: 90%;
							height: 200px;
						}
					}
					
				}
		
			
				
		}
	}
	.empty{
		text-align: center;
		font-size: 20px;
		margin: 100px auto 0;
	}
	.bottom{
		display: flex;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, .9);
		height: 50px;
		width: 100%;
		position: fixed;
		bottom: 0%;
		.b-nav{
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			text-align: center;
			image.icon{
				width: 25px;
				height: 25px;
				display: block;
				vertical-align: middle;
				margin: 0 auto;
			}
			.title{
				font-size: 15px;
			}
			.sharebtn{
				background: url(../../static/share.png) no-repeat center top #fff;
				width: 100%;
				display: block;
				background-size: 25px 25px;
				border-color: #fff;
				padding: 0;
				padding-top:14px ;
				height: 50px;
			}
		}
	}
	
</style>
