<template>
	<section class="pc-time">
		<label class="time-label">
			<span>{{label}}</span>
			<input type="text" class="time-input" placeholder="请输入时间" ref="time">
		</label>

		<!-- time start -->
		<transition name="fade">
			<section class="time-content">
				<pc-time-column :list="hours"></pc-time-column>
				<p class="line i-b v-m">:</p>
				<pc-time-column :list="mins"></pc-time-column>
			</section>
		</transition>
		<!-- time end -->
	</section>
</template>

<script>
import pcTimeColumn from './pc-time-column.vue';
export default {
	name: 'pc-time',
	props: {
		label: {
			type: String,
			default: '时间:'
		},
		thime: {
			type: String,
			default: "#42b983"
		}
	},
	data(){
		return {
			hours: [],
			mins: [],
			lock: false,
			startY: 0,
			translate: 115,
			lastPosition: 115,
			step: 50, //每个span高50px
			scale: 1.5,
		}
	},
	components:{
		pcTimeColumn
	},
	computed: {
		transform(){
			return `translateY(${this.translate}px)`;
		}
	},

	created(){
		let hours=[],mins=[];
		for(let i=0;i<24;i++){
			let hour = i< 10 ? '0'+i:i;
			hours.push(hour);
		}

		for(let i=0;i<60;i++){
			let min = i<10?'0'+i:i;
			mins.push(min);
		}


		this.hours = hours;
		this.mins = mins;
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
			console.log(this.translate);
			this.lastPosition = this.translate;
			this.adjust();
		},

		adjust(){
			if(this.lastPosition>115){
				this.lastPosition = 115;
				this.translate = 115; //00的位置
			}

			

		}
	}
}
</script>

<style lang="less" scoped>
@import "../../assets/style/common.less";

.pc-time {
	position: relative;
	display: inline-block;
	.time-input {
		width: 200px;
		height: 35px;
		line-height: 35px;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

	.time-content {
		position: absolute;
		left: 20%;
		top: 50px;
		width: 202px;
		height: 300px;
		padding: 10px;
		box-sizing: border-box;
		background: #fff;
		border: 1px solid @baseColor;
		border-radius: 10px;
		overflow: hidden;
		font-size: 0;

		.line {
			width: 20px;
			font-size: 20px;
			line-height: 280px;
		}

		.time-column {
			position: relative;
			width: 80px;
			height: 100%;
			overflow: hidden;
			user-select:none;

			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 115px;
				background: #eee;
				opacity: 0.8;
				border-bottom: 1px solid @baseColor;
			}

			&:after {
				content: '';
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
			transition: translate 0.3s linear;
			// transform: translateY(115px);

			.column-item {
				display: block;
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 20px;
			}
		}
	}
}
</style>