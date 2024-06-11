<template>
	<view class="home">
		<view class="search-share">
			<view class="search-box">
				<view class="search">
					<uni-icons type="search" class="search_icon" size="20" color="#999"></uni-icons>
					<input type="text" class="search_text" focus placeholder="搜索壁纸" confirm-type="search" @confirm="doSearch"/>
					
				</view>
			</view>
		</view>
		
		<view class="hot-tags">
			<view class="title">
				<text class="big">热门标签</text>
			</view>
			<view class="hot-tags-list">
				<view class="hot-tags-item" v-for="(item,index) in tagsList" :key="index" @click="gototaglist(item.name)">
					{{ item.name }}
				</view>
				
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import { get_search_hot_tags } from '../../common/api'
	
	export default {
		data() {
			return {
				tagsList:[],
				keyword:''
			}
		},
		onLoad() {
			this.get_search_hot_tags_api()
		},
		methods: {
			get_search_hot_tags_api(){
				get_search_hot_tags().then((res)=>{
					this.tagsList = res
					console.log(res,999)
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
					uni.navigateTo({
						url:'/pages/searchresult/searchresult?keyword='+encodeURIComponent(this.keyword)
					})
				}else{
					uni.showToast({
						title:'请输入关键词',
						icon:'error'
					})
				}
						
			},
			gototaglist(name){
				console.log(name,88999111)
				uni.navigateTo({
					url:'/pages/taglist/taglist?name='+encodeURIComponent(name)
				})
			},
		}
	}
</script>

<style lang="scss">
page{
		overflow: hidden;
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
	
		.search-box{
			justify-content: center;
			align-items: center;
			display: flex;
			flex: 1;
			height: 45px;
			padding: 0 15px;
			box-sizing: border-box;
			margin: 15px 0;
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
	
	.hot-tags{
		margin: 25px 10px 0rpx;
		box-sizing: border-box;
		.title{
			margin-bottom: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			.big{
				flex: 1;
				font-size: 18px;
				color: #999;
			}
			
		}
		.hot-tags-list{
			align-items: center;
			margin-bottom: 15px;
			.hot-tags-item{
				display: inline-block;
				justify-content: space-between;
				margin: 0 15px 15px 0;
				background-color: #efefef;
				border-radius: 5px;
				font-size: 15px;
				color: #333;
				text-align: center;
				padding: 8px 7px;
					
			}
		}
		
	}
	
</style>
