<template>
	<div class="time-column i-b v-m"  @mousedown.stop="mouseDown" @mousemove.stop="mouseMove" @mouseup.stop="mouseUp" @mouseleave.stop="mouseUp">
		<div class="column-before" :style="{borderColor:color}"></div>
		<div class="column-after" :style="{borderColor:color}"></div>
		<div class="column-wrapper" :style="{transform: transform}">
			<span class="column-item t-c" v-for="(item, i) in list" @key="i">{{item}}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'pc-time-column',
	props: {
		list: {
			type: Array,
			default: ()=>[]
		},
		thime: {
			type: String,
			default: '#42b983'
		}
	},
	data(){
		return {
			lock: false,
			startY: 0,
			translate: 115,
			lastPosition: 115,
			step: 50, //每个span高50px
			scale: 5,
		}
	},
	computed: {
		transform(){
			return `translateY(${this.translate}px)`;
		},
		color(){
			if(!this.thime){
				this.thime = '#42b983'
			}
			return this.thime;
		}
	},
	methods: {
		mouseDown(e){
			this.lock = true;
			this.startY = e.pageY;
		},
		mouseMove(e){
			if(!this.lock) return;
			this.translate = (e.pageY - this.startY)*this.scale+this.lastPosition;

		},
		mouseUp(e){
			this.lock = false;
			// console.log(this.translate);
			this.lastPosition = this.translate;
			this.adjust();
		},

		adjust(){
			let num;
			let max = (this.list.length-1)*this.step-115;
			if(this.lastPosition>115){
				this.lastPosition = 115;
				this.translate = 115; //00的位置
				num = 0;
			}else if(Math.abs(this.lastPosition)>max){
				this.lastPosition = -max;
				this.translate = -max; //最后的位置
				num = this.list.length-1;
			}else{
				let double = (115-this.lastPosition)/50;
				num = parseInt(double);
				num = double > num+0.5? num+1: num;
				// console.log(num);
				this.lastPosition = this.translate = 115 - num*50;
			}

			this.$emit('columnChange',this.list[num]);

		},
		change(data){
			console.log(this.list.indexOf(data));
			let num = this.list.indexOf(data);
			if(num !=-1){
				this.lastPosition = this.translate = 115 - num*50;
				this.$emit('columnChange',this.list[num]);
			}
		}
	}

}
</script>

<style lang="less" scoped>
@import "../../assets/style/common.less";
.time-column {
	position: relative;
	width: 80px;
	height: 100%;
	overflow: hidden;
	user-select:none;

	.column-before {

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 115px;
		background: #eee;
		opacity: 0.8;
		border-bottom: 1px solid @baseColor;
	}

	.column-after {
	
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 115px;
		background: #eee;
		opacity: 0.8;
		border-top: 1px solid @baseColor;
	}

}

.column-wrapper {
	width: 100%;
	height: auto;
	transition: transform 0.3s linear;
	// transform: translateY(115px);

	.column-item {
		display: block;
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
	}
}
</style>