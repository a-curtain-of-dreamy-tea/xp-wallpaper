<template>
	<view class="sepc-box">
		<view class="sepc-list">
			
			<view class="scroll">
				<scroll-view class="list-scroll" scroll-y="true">
					<view class="hot-sepc-list">
						<view class="hot-sepc-item" v-for="(item,index) in albums_all" :key="index" @click="gotosepcdetail(item.name)">
							<view class="cover">
									<image :src="item.thumbnail" mode="aspectFill"></image>
							</view>
							<view class="title">{{ item.name }}</view>
						</view>
						
					</view>
				</scroll-view>
			</view>
		</view>
		
		
		<view class="bottom">
				<view class="b-nav"  @click="gotoindex">
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
	import { get_all_albums } from '../../common/api'
	export default {
		data() {
			return {
				albums_all:[]
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中',
				mask:true
			})
			this.get_all_albums_api()
		},
		methods: {
			get_all_albums_api(){
				get_all_albums().then((res)=>{
					this.albums_all = res;
					uni.hideLoading()
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
			gotosepcdetail(link){
				uni.navigateTo({
					url:decodeURIComponent('/pages/sepcdetail/sepcdetail?link='+link)
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

.sepc-box{
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	
	
	
	.sepc-list{
		.tab{
			margin: 15px 0 15px;
			display: flex;
			background-color: #fff;
			width: 96%;
			box-sizing: border-box;
			.tab-scroll{
				flex: 1;
				overflow: hidden;
				box-sizing: border-box;
				.tab-scroll_box{
					display: flex;
					height: 30px;
					align-items: center;
					flex-wrap: nowrap;
					.tab-scroll_item{
						flex-shrink: 0;
						padding: 0 10px;
						color:#333;
						font-size: 16px;
						padding-bottom: 5px;
						.active {
								color: $mk-base-color;
								padding-bottom: 5px;
								border-bottom: 2px solid #55aaff;
							}
					}
				}	
			}
		}
		
		.scroll{
				overflow: hidden;
				box-sizing: border-box;
				margin: 15px 10px 0rpx;
				.hot-sepc-list{
					display: block;
					justify-content: center;
					align-items: center;
					overflow: hidden;
					margin-bottom: 50px;
					.hot-sepc-item{
						float: left;
						width: 48%;
						margin-bottom: 25px;
						// background-color: #55aaff;
						.cover{
							// border: 2px solid orangered;
							height: 120px;
							image{
								width: 100%;
								border-radius: 10rpx;
								height: 120px;
							}
						}
						&:nth-child(2n-1){
								margin-right:4%;
							}
						.title{
							font-size: 18px;
							color: #363636;
							text-overflow: ellipsis;
							flex-wrap: nowrap;
							white-space: nowrap;
							// width: 100%;
							overflow: hidden;
							margin: 8px 0;
						}
						.uview{
							font-size: 14px;
							color: #b8b8b8;
						}
						
					}
					
				}
		}
	}
	
	
	.bottom{
		display: flex;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		background-color: #fff;
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
				font-size: 16px;
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
	
}
</style>
