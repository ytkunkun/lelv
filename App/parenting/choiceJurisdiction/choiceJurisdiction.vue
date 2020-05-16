<template>
	<view class="choiceJurisdiction">
		<view class="static"></view>
		<parentingNav title="选择权限"></parentingNav>
		<view class="list">
			<view @click="choiceShow(index,item)" class="li" v-for="(item,index) in conList" :key="index" :class="{pink:index==choice}">{{item}}</view>
		</view>
		<view class="sure" @click="sureJump">确定</view>
	</view>
</template>

<script>
	import parentingNav from "../components/parentingNav.vue"
	export default {
		data() {
			return {
				text: "",
				choice: 0,
				conList: [
					"所有人可见", "仅旅友可见", "仅自己可见", "仅部分可见"
				]
			};
		},
		methods: {
			choiceShow(i, item) {
				this.choice = i;
				this.text = item;
			},
			sureJump() {
				uni.redirectTo({
					url: `../sending/sending?text=${this.text}`
				})
			}
		},
		components: {
			parentingNav
		}
	}
</script>

<style lang="less">
	.choiceJurisdiction {
		.list {
			margin-top: 40rpx;
			color: #999999;
			font-size: 16px;

			.li {
				padding: 32rpx 0 32rpx 32rpx;
			}

			.pink {
				background: #fc9898;
				color: white;
			}
		}

		.sure {
			color: white;
			background: #FC9898;
			padding: 22rpx 0;
			text-align: center;
			position: fixed;
			bottom: 0;
			width: 100vw;
		}
	}
</style>
