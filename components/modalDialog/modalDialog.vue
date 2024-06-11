<template>
	<view class="modalDialog" v-if="showModal">
			<view class="modal-content">
				<view class="close" @click="handleConfirm(2)">
					<uni-icons type="closeempty" class="icon" size="25" color="#666"></uni-icons>
				</view>
				<view class="modal-box">
					<uni-icons type="info" class="info-icon" size="18" color="red"></uni-icons>
					<text class="info-tit">应作者要求不能免费下载，可通过以下方式获取：</text>
				</view>
				<view class="modal-buttons"  @click="handleConfirm(1)">
					<uni-icons type="videocam" class="play-icon" size="20" color="#fff"></uni-icons>
					<text class="title">观看视频解锁</text>
				</view>
				<view class="tips">
					<view class="item">
						<uni-icons class="star-icon" type="star-filled" size="10" color="#999"></uni-icons>
						<text class="txt">不可商用</text>
					</view>
					<view class="item">
						<uni-icons class="star-icon" type="star-filled" size="10" color="#999"></uni-icons>
						<text class="txt">不可二次传播</text>
						</view>
					<view class="item">
						<uni-icons class="star-icon" type="star-filled" size="10" color="#999"></uni-icons>
						<text class="txt">不可二次编辑</text>
					</view>
				</view>
				
			</view>
	</view>
</template>

<script>
	export default {
		name:"modalDialog",
		props:{
			showModal:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				// showModal:false,
			};
		},
		methods:{
			handleConfirm(type){
				this.$emit('handleConfirm',{type})
			}
		}
	}
</script>

<style lang="scss">
.modalDialog{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	.modal-content{
		background-color: #fff;
		border-radius: 10px;
		width: 300px;
		position: relative;
		box-sizing: border-box;
		padding: 12px;
		.close{
			text-align: right;
			margin-bottom: 10px;
		}
		.modal-box{
			line-height: 24px;
			margin-bottom: 30px;
			text-align: center;
			.info-icon{
				margin-right:6px;
			}
			.info-tit{
				font-size: 16px;
			}
		}
		.modal-buttons{
			overflow: hidden;
			box-sizing: border-box;
			text-align: center;
			background-color: #5091f9;
			border-radius: 20px;
			padding: 10px 20px;
			margin-bottom: 30px;
			color: #fff;
			.play-icon{
				margin-right: 10px;
			}
		}
		.tips{
			display: flex;
			.item{
				flex: 1;
				font-size: 12px;
				color: #666;
				.star-icon{
					vertical-align: middle;
				}
				.txt{
					vertical-align: middle;
				}
			}
		}
	}
}


</style> 