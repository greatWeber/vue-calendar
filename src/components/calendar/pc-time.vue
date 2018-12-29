<template>
	<section class="pc-time">
		<label class="time-label">
			<span>{{label}}</span>
			<input type="text" class="time-input" placeholder="请输入时间" ref="time" :value="time" @keyup.stop="changeTime" @focus="isShow=true;" @blur="blurFn">
		</label>

		<!-- time start -->
		<transition name="fade"> 
			<section class="time-content" v-show="isShow" @click="keepFocus" :style="{borderColor: color}">
				<pc-time-column :list="hours" :thime="thime" @columnChange="hourChange" ref="hour"></pc-time-column>
				<p class="line i-b v-m">:</p>
				<pc-time-column :list="mins" :thime="thime" @columnChange="minChange" ref="min"></pc-time-column>
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
		chooseTime: {
			type: String
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
			hour:'',
			min: '',
			isShow: false
		}
	},
	components:{
		pcTimeColumn
	},
	computed: {
		time(){
			if(this.hour&&this.min){
				this.$emit('timeChange',`${this.hour}:${this.min}`);
				return `${this.hour}:${this.min}`;
				
			}
		},
		color(){
			if(!this.thime){
				this.thime = '#42b983'
			}
			return this.thime;
		}
	},

	created(){
		let hours=[],mins=[];
		for(let i=0;i<24;i++){
			let hour = i< 10 ? '0'+i:i+'';
			hours.push(hour);
		}

		for(let i=0;i<60;i++){
			let min = i<10?'0'+i:i+'';
			mins.push(min);
		}


		this.hours = hours;
		this.mins = mins;
	},
	mounted(){
		let time = this.chooseTime;
		let reg = /([0-2][0-9]):([0-5][0-9])/g
		if(reg.test(time)){
			this.hour = RegExp.$1;
			this.min = RegExp.$2;
		}
	},
	methods: {
		hourChange(data){
			this.hour = data;
		},
		minChange(data){
			this.min = data;
		},
		changeTime(e){
			let time = e.target.value;
			let reg = /([0-2][0-9]):([0-5][0-9])/g
			if(reg.test(time)){
				this.$refs.hour.change(RegExp.$1);
				this.$refs.min.change(RegExp.$2);
			}
		},
		blurFn(e){
			setTimeout(()=>{
				if(this.$refs.time != document.activeElement){
					this.isShow = false;
				}
				
			},200)
		},
		keepFocus(e){
			this.$refs.time.focus();
		}
	},

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