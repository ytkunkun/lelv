<template>
    <view :animation="animationData" style="background:red;height:100rpx;width:100rpx" @click="declick"></view>
</template>

<script>
    export default{
        data() {
            return{
                animationData: {},
                off: false
            }
        },
        onShow: function(){
            // 初始化一个动画
            var animation = uni.createAnimation({
                duration: 1000,
                timingFunction: 'ease',
            })
            this.animation = animation
        },
        methods:{
            declick() {
                if (this.off) {
                    // 使用动画
                    this.rotateAndScale()
                } else {
                    this.norotateAndScale()
                }
                this.off = !this.off
            },
            // 定义动画内容
            rotateAndScale() {
                // 定义动画内容
                this.animation.rotate(45).scale(2, 2).step()
                // 导出动画数据传递给data层
                this.animationData = this.animation.export()
            },
            norotateAndScale() {
                this.animation.rotate(0).scale(1, 1).step()
                this.animationData = this.animation.export()
            }
        }
    }
</script>