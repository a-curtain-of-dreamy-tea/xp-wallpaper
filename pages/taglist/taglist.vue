<template>
	<view class="home">
		<!-- <view class="search-share">
			<view class="search-box">
				<view class="search">
					<uni-icons type="search" class="search_icon" size="20" color="#999"></uni-icons>
					<input type="text" v-model="keyword" class="search_text" focus placeholder="搜索壁纸" confirm-type="search" @confirm="doSearch" />
				</view>
			</view>
		</view> -->
		
		<view class="scroll">
			<scroll-view class="list-scroll" scroll-y="true"   ref="scrollView" @scrolltolower="loadmore">
				<view class="listcard-image">
						<view class="listcard-image-item" v-for="(item,index) in wallpapersData" :key="index" @click="gotodetail(item.id)">
							 <image :src="item.image" mode="aspectFill"></image>
						</view>
				</view>
				
			</scroll-view>
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
	import { get_search_hot_tags,get_single_taglist } from '../../common/api'
	
	export default {
		data() {
			return {
				name:'',
				keyword:'',
				wallpapersData:[],
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
			this.name = options.name;
			// this.get_single_taglist_api(options.name)
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
				get_single_taglist(({name:this.name,page:this.page})).then((res)=>{
					console.log(this.wallpapersData,'default')
					const { results } = res;
					const { next } =res;
					if(next == null ){
						this.hasMore = false; // 模拟数据加载完毕，没有更多数据
					}
					this.wallpapersData=[...this.wallpapersData,...results];
					this.loadingMore = false;
					setTimeout(()=>{
					    uni.hideLoading()
					  },1000)
					
					uni.stopPullDownRefresh()
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
				
			},
			doSearch(e){
				console.log(e,444);
				this.keyword = e.detail.value;
				if(this.keyword){
					console.log(this.keyword);
				}else{
					uni.showToast({
						title:'请输入关键词',
						icon:'error'
					})
				}
				
			},
			get_single_taglist_api(name){
				get_single_taglist(name).then((res)=>{
					this.tags = res.results
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
			gotodetail(id){
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
	
	.search-share{
		display: flex;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
	
		.search-box{
			justify-content: center;
			align-items: center;
			display: flex;
			flex: 1;
			height: 45px;
			padding: 0 15px;
			box-sizing: border-box;
			margin: 30rpx 0;
			.search{
				padding: 0 10px;
				width: 92%;
				display: flex;
				align-items: center;
				text-align: center;
				height: 45px;
				background-color: #f5f5f5;
				border-radius: 10px;
				.search_icon{
					margin-right: 10px;
				}
				.search_text{
					font-size: 16px;
					color: #333;
					text-align: left;
					height: 45px;
				}
			}
		}
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
					margin-bottom: 70px;
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
