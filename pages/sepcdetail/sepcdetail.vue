<template>
	<view class="sepc-box">
		<view class="imgcover">
			<image :src="thumbnail" mode="aspectFill"></image>
		</view>
		<view class="title">{{name}}</view>
		<view class="des">
			{{description}}
		</view>
		
		<view class="sepc-list">
			<view class="scroll">
				<scroll-view class="list-scroll" scroll-y="true"  ref="scrollView" @scrolltolower="loadmore">
					<view class="listcard-image">
				
							<view class="listcard-image-item" v-for="(item,index) in wallpapersData" :key="index" @click="gotodetail(item.id)">
								 <image :src="item.image" mode="aspectFill"></image>
							</view>
				
					</view>
					
				</scroll-view>
				<view v-if="loadingMore">加载中...</view>
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
	
	import { get_all_albumsdata } from '../../common/api'
	export default {
		data() {
			return {
				albums :'',
				wallpapersData:[],
				thumbnail:'',
				name:'',
				description:'',
				link:'',
				page:1,
				loadingMore: false,
				hasMore:true
			}
		},
		onPullDownRefresh(){
			this.refreshData();
			console.log('fresh')
			
		},
		onReachBottom() {
		 console.log("底部");
		if (this.hasMore) {
		  this.loadingMore = true;
		  uni.showLoading({
		  	title:'加载中',
		  	mask:true
		  })
		  this.loadMoreData();
			}
		},
		mounted() {
			console.log('mouted')
			 this.refreshData();
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中',
				mask:true
			})
			const link = options.link;
			this.link = link;
			const page = this.page;
			this.get_all_albumsdata_api(link,page)
		},
		methods: {
			refreshData(){
			  this.page = 1;
			  this.wallpapersData = []; // 清空列表
			  this.get_page_list();
			  uni.stopPullDownRefresh(); // 停止下拉刷新
			},
			loadMoreData() {
			  this.page += 1;
			  this.get_page_list();
			},
			get_page_list(){
					get_all_albumsdata(({link:this.link,page:this.page})).then((res)=>{
						console.log(this.wallpapersData,'default')
						const { wallpapers } = res;
						const { next } =res;
						if(next == null ){
							this.hasMore = false; // 模拟数据加载完毕，没有更多数据
						}
						this.wallpapersData=[...this.wallpapersData,...wallpapers];
						this.loadingMore = false;
						uni.hideLoading();
						uni.stopPullDownRefresh()
					})
					.catch(err=>{
						console.log('请求失败',err)
					})
				
			},
			get_all_albumsdata_api(link,page){
				get_all_albumsdata(({link:link,page:page})).then((res)=>{
					this.thumbnail = res.thumbnail;
					this.name = res.name;
					this.description = res.description;

				})
				.catch(err=>{
					console.log('请求失败',err)
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

.sepc-box{
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	.imgcover{
		width: 100%;
		height: 200px;
		display: block;
		overflow: hidden;
		image{
			width: 100%;
		}
	}
	.title{
		font-size: 20px;
		line-height: 19px;
		margin: 15px 10px;
	}
	.des{
		font-size: 14px;
		line-height: 20px;
		color: #999;
		margin: 0 10px;
		margin-bottom: 20px;
	}
	
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
				flex: 1;
				overflow: hidden;
				box-sizing: border-box;
				flex-direction: column;
				margin-bottom: 80px;
				.list-scroll{
					height: 100%;
					display: flex;
					overflow: hidden;
					.listcard-image{
						margin-top: 10rpx;
						width: 100%;
						box-sizing: border-box;
						.listcard-image-item{
							display: inline-flex;
							width: 33.333%;
							justify-content: center;
							flex-direction: row;
							box-sizing: border-box;
							margin-bottom: 20rpx;
							image{
								// border: 2px solid #f0f;
								border-radius: 20rpx;
								width: 90%;
								height: 400rpx;
							}
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
		// border-top:1px solid red;
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
