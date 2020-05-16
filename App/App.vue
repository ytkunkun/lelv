<script>
	export default {
		onLaunch:function(){
			
			
		},
		data(){
			return{
				version:""
			}
		}
		
	}
</script>


<style lang="less">
	@import url("./common/reset.css");
	// *{
	// 	border: none;
	// 	margin: 0;
	// 	padding: 0;
	// 	outline: none;
	// }
	/* 状态栏高度 */
	.static {
		height: var(--status-bar-height);
		width: 100%;
		background-color: white;
		position: fixed;
		top:0px;
		left: 0;
		right:0;
		z-index: 13;
	}
	.top_view {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    position: fixed;  
	    background-color: #F8F8F8;  
	    top: 0;  
	    z-index: 999;  
	} 

	/* 图片样式 */
	.image {
		width: 100%;
		height: 100%;
	}

	/* body样式 */
	page {
		font-family: PingFang SC;
		letter-spacing: 0.5px;
	}

	/* 左右边距为20rpx样式 */
	.mag20 {
		margin: 0 24rpx;
	}
	
	.pad20 {
		padding: 0 24rpx;
	}

	/* 全屏按钮样式 */
	.button {
		width: 100%;
		height: 84rpx;
		background: #fc9898;
		font-size: 17px;
		margin: 0;
		color: white;
	}

	/* 点击弹出框后的灰色背景效果  */
	.bag {
		width: 100vw;
		display: none;
		background-color: #B3B3B3;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 14;
		-moz-opacity: 0.8;
		opacity: 0.8;
		height: 120vh;
	}
	// 暂无数据提示文字
	.noDataTips{
		font-size: 16px;
		color: grey;
		width: 400rpx;
		margin: 0 auto;
		text-align: center;
		margin-top: 15px;
		
		}
		.release{
			input{
				text-align: right;
			}
		}
</style>
<script>
var _self;
export default {
    // components: {
    //     uniPopup,
    // },
    data() {
        return {
            barHeight:25,
        }
    },
    methods: {
        //获取系统状态栏高度
        getSystemStatusBarHeight:function(){
            // #ifdef APP-PLUS
            var height = plus.navigator.getStatusbarHeight();
            _self.barHeight = height;
            // #endif
            // #ifdef H5
            _self.barHeight = 0;
            // #endif
        },
    },
    onLoad:function(){
        _self = this;
        _self.getSystemStatusBarHeight();
        
    }

}
</script>
