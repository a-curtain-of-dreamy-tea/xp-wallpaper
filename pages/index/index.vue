<template>
	<view class="home">
		<view class="search-share">
			<view class="share">
				<button open-type="share"  plain="true" class="title">
					<text>分享</text>
				</button>
			</view>
			
			<view class="search-box" @click="opensearch">
				<view class="search">
					<uni-icons type="search" class="search_icon" size="20" color="#999"></uni-icons>
					<view class="search_text">搜索壁纸</view>
				</view>
			</view>
		</view>
		<view class="swiper-content">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay">
				<swiper-item>
					<view class="swiper-item">
							<image src="/static/11.jpg" mode="aspectFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
							<image src="/static/11.jpg" mode="aspectFill"></image>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		<view class="navbar">
			<view class="nav-item" v-for="(item,index) in tags_two" :key="index" @click="gototaglist(item.name)">
				<!-- <image :src="item.thumbnail" mode="aspectFill"></image> -->
				<text>{{item.name}}</text>
			</view>
			
		</view>
		
		<view class="hot-sepc">
			<view class="title">
				<text class="big">热门专题</text>
				<view class="more">
					<navigator url="/pages/sepc/sepc" hover-class="navigator-hover">
						更多
					</navigator>
				</view>
			</view>
			<view class="hot-sepc-list">
				<view class="hot-sepc-item" v-for="(item,index) in albums_two" :key="index" @click="gotosepcdetail(item.name)">
					
						<image :src="item.thumbnail" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<view class="tab">
			<scroll-view class="tab-scroll" scroll-x="true">
				<view class="tab-scroll_box">
					<view class="tab-scroll_item" v-for="(item,idx) in tabList" :key="idx">
						<view :class="{active:activeIndex === idx}" @click="clickTab(item,idx)">
						      {{item}}
						</view>
					</view>
					
				</view>
			</scroll-view>
			
		</view>
		
		<view class="scroll aaa">
			<scroll-view class="list-scroll" scroll-y="true"  ref="scrollView" @scrolltolower="loadmore">
				<view class="listcard-image">
						<view class="listcard-image-item" v-for="(item,index) in ppwList" :key="index" @click="gotodetail(item.id)">
							 <image :src="item.image" mode="aspectFill"></image>
						</view>
						
				</view>
			</scroll-view>
			<view v-if="loadingMore">加载中...</view>

		</view>
		
		
	</view>
</template>

<script>
	import { get_all_ppwdata,get_all_carouselsdata,get_all_index_tabdata,get_all_index_boxlistdata,get_all_albums,get_all_tags,get_all_jignxuan_boxlistdata } from '../../common/api'
	export default {
	    data() {
	        return {
	            indicatorDots: true,
	            autoplay: true,
	            interval: 500,
	            duration: 2000,
				ppwList:[],
				carouselsList:[],
				tabList:[],
				activeIndex : 0,
				boxList:[],
				albums_two:[],
				tags_two:[],
				list_type_default:'精选',
				page:1,
				list_type:'',
				loadingMore: false,
				hasMore:true
			
				
	        }
	    },
		onLoad() {
			
			uni.showLoading({
				title:'加载中',
				mask:true
			})
			this.list_type = '精选';
			this.get_all_carouselsdata_api()
			this.get_all_index_tabdata_api()
			this.get_all_albums_api()
			this.get_all_tags_api()
		},
		onShareAppMessage() {
		    return {
		      title: '小胖壁纸',
		      path: '/pages/index/index'
		    }
		},
		onPullDownRefresh(){
			console.log('底部')
			this.refreshData();
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
	    methods: {
	        changeIndicatorDots(e) {
	            this.indicatorDots = !this.indicatorDots
	        },
	        changeAutoplay(e) {
	            this.autoplay = !this.autoplay
	        },
	        intervalChange(e) {
	            this.interval = e.target.value
	        },
	        durationChange(e) {
	            this.duration = e.target.value
	        },
			refreshData(){
			  this.page = 1;
			  this.ppwList = []; // 清空列表
			  this.get_jignxuan_list();
			  uni.stopPullDownRefresh(); // 停止下拉刷新
			},
			loadMoreData() {
			      this.page += 1;
			      this.get_jignxuan_list();
			    },
			get_jignxuan_list(){
			
					get_all_jignxuan_boxlistdata(({list_type:this.list_type,page:this.page})).then((res)=>{
						const { wallpapers } = res.results;
						const { next } =res;
						if(next == null ){
							this.hasMore = false; // 模拟数据加载完毕，没有更多数据
						}
						this.ppwList=[...this.ppwList,...wallpapers];
						this.loadingMore = false;
						uni.hideLoading();
						uni.stopPullDownRefresh()
					})
					.catch(err=>{
						console.log('请求失败',err)
					})
				
				
			},
			// 获取所有壁纸
			get_all_ppwdata_api(){
				 this.page = 1;
				get_all_ppwdata().then((res)=>{
					this.ppwList = res
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
			//获取轮播图
			get_all_carouselsdata_api(){
				get_all_carouselsdata().then((res)=>{
					this.carouselsList = res
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
			get_all_index_tabdata_api(){
				get_all_index_tabdata().then((res)=>{
					this.tabList = res
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
			
			get_all_albums_api(){
				get_all_albums().then((res)=>{
					this.albums_two = res.slice(0,2)
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
			get_all_tags_api(){
				get_all_tags().then((res)=>{
					this.tags_two = res.slice(0,2)
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
			clickTab(item,idx){
				this.activeIndex = idx;
				this.page = 1;
				this.list_type = item;
				this.hasMore=true
				get_all_index_boxlistdata(item).then((res)=>{
					const { wallpapers } = res.results;
					this.ppwList = wallpapers;
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
			gotosepcdetail(link){
				uni.navigateTo({
					url:decodeURIComponent('/pages/sepcdetail/sepcdetail?link='+link)
				})
			},
			gototaglist(name){
				uni.navigateTo({
					url:'/pages/taglist/taglist?name='+encodeURIComponent(name)
				})
			},
			opensearch(){
				uni.navigateTo({
					url:'/pages/searchflow/searchflow'
				})
			},
			
	    }
	}
</script>

<style lang="scss">
	page{
		// overflow: hidden;
	}
	.ad-container{
		width: 100%;
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
		.share{
			flex: .2;
			overflow: hidden;
			box-sizing: border-box;
			text-align: center;
			
			.title{
				font-size: 16px;
				background: url(../../static/share.png) no-repeat center top #fff;
				width: 100%;
				display: block;
				background-size: 25px 25px;
				border-color: #fff;
				padding: 0;
				padding-top:14px ;
			}
			
		}
		
		.search-box{
			justify-content: left;
			// align-items: center;
			display: flex;
			flex: 1;
			height: 45px;
			padding: 0 15px;
			box-sizing: border-box;
			.search{
				padding: 0 10px;
				width: 80%;
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
					color: #7c7175;
				}
			}
		}
	}
	
	
	.swiper-content{
			// width: 100%;
			justify-content: center;
			align-items: center;
			margin: 15px 10px;
			box-sizing: border-box;
			// background-color: #f0f;
			.swiper {
				height: 150px;
			
			.swiper-item {
				display: block;
				height: 150px;
				line-height: 150px;
				text-align: center;
				image{
					border-radius: 5px;
					height: 150px;
					width: 100%;
				}
			}
			
		}
			
	}
	
	.navbar{
		display: flex;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 15px;
		margin-top: 15px;
		.nav-item{
			flex: 1;
			justify-content: center;
			align-items: center;
			text-align: center;
			image{
				width: 50px;
				height: 50px;
				border-radius: 100%;
				margin: 5px auto;
				display: block;
				overflow: hidden;
			}
			text{
				font-size: 18px;
			}
		}
	}
	
	.hot-sepc{
		margin: 15px 10px 0rpx;
		box-sizing: border-box;
		.title{
			margin-bottom: 15px;
			display: flex;
			justify-content: center;
			align-items: center;
			.big{
				flex: 1;
				font-size: 20px;
				font-weight: bold;
			}
			.more{
				font-size: 14px;
			}
		}
		.hot-sepc-list{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 15px;
			
			.hot-sepc-item{
				flex: 1;
				width: 47%;
				height: 100px;
				
				image{
					width: 100%;
					border-radius: 10rpx;
					height: 100px;
				}
				&:first-child{
					margin-right: 3%;
				}
				
			}
			
		}
		
	}
	
	.tab{
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
				height: 60rpx;
				align-items: center;
				flex-wrap: nowrap;
				.tab-scroll_item{
					flex-shrink: 0;
					padding: 0 20rpx;
					color:#333;
					font-size: 16px;
					padding-bottom: 5px;
					view{
						padding-bottom: 5px;
					}
					.active {
						color: $mk-base-color;
						border-bottom: 4rpx solid #55aaff;
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
			padding-bottom: 80rpx;
			.list-scroll{
				height: 100%;
				display: flex;
				// overflow: hidden;
				overflow-y: auto;
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
	
	
</style>
