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
		
		
		<view class="hot-tags">
			<view class="title">
				<text class="big">热门标签</text>
			</view>
			<view class="hot-tags-list">
				<view class="hot-tags-item"  v-for="(item,index) in tagsList.slice(0,3)" :key="index" @click="gototaglist(item.name)">
					<image :src="item.tagpic" mode="aspectFill"></image>
					<view class="name">{{ item.name }}</view>
				</view>
				
			</view>
		</view>
		
		<view class="hot-fenlei">
			<view class="title">
				<text class="big">标签合集</text>
				
			</view>
			<view class="hot-fenlei-list">
				<view class="hot-fenlei-item"  v-for="(item,index) in tags_all" :key="index" @click="gototaglist(item.name)">
						<image :src="item.tagpic" mode="aspectFill"></image>
					<view class="name">{{ item.name }}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { get_search_hot_tags ,get_all_tags } from '../../common/api'
	
	export default {
		data() {
			return {
				tagsList:[],
				tags_all:[]
			}
		},
		onLoad() {
			this.get_search_hot_tags_api()
			this.get_all_tags_api()
		},
		methods: {
			get_search_hot_tags_api(){
				get_search_hot_tags().then((res)=>{
					this.tagsList = res
				})
				.catch(err=>{
					console.log('请求失败',err)
				})
			},
			get_all_tags_api(){
				get_all_tags().then((res)=>{
					this.tags_all = res
				})
				.catch(err=>{
					console.log('请求失败',err)
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
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		
	}
	.ad-container{
		width: 100%;
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
	
	
	.hot-tags{
		margin: 40px 10px 0rpx;
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
		.hot-tags-list{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 15px;
			.hot-tags-item{
				flex: 1;
				width: 30%;
				height: 100px;
				position: relative;
				image{
					width: 100%;
					border-radius: 5px;
					height: 100px;
				}
				&:first-child{
					margin-right: 3%;
				}
				&:nth-child(2){
					margin-right: 3%;
					// .name{
					// 	color:#639fff;
					// 	border: #639fff 1px solid;
					// }
				}
				.name{
					background-color: rgba(0,0,0,.5);
					width: 100%;
					height: 100%;
					position: absolute;
					border-radius: 10rpx;
					font-size: 18px;
					letter-spacing: 2px;
					font-weight: 600;
					color: #fff;
					text-align: center;
					top: 0%;
					left: 0%;
					line-height: 100px;
					// border: 1px solid #e1b79b;
					
				}
			}
			
			
		}
		
	}
	
	
	.hot-fenlei{
		margin: 20px 10px 0rpx;
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
		.hot-fenlei-list{
			display: block;
			justify-content: center;
			align-items: center;
			margin-bottom: 15px;
			
			
			.hot-fenlei-item{
				float: left;
				width: 47%;
				height: 100px;
				position: relative;
				margin-bottom: 15px;
				image{
					width: 100%;
					border-radius: 5px;
					height: 100px;
				}
				&:nth-child(2n-1){
					margin-right: 3%;
				}
				&:nth-child(2n+1){
					// .name{
					// 	color:#639fff;
					// 	border: #639fff 1px solid;
					// }
				}
			.name{
				background-color: rgba(0,0,0,.5);
				width: 100%;
				height: 100%;
				position: absolute;
				letter-spacing: 2px;
				border-radius: 5px;
				font-size: 18px;
				font-weight: 600;
				color: #fff;
				text-align: center;
				top: 0%;
				left: 0%;
				// border: 1px solid #ff8b3e;
				line-height: 100px;
				
			}
			}
			
		}
		
	}
	
	
</style>
