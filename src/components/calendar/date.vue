<template>
<section class="date-wrapper">
	<label class="date-label">
		<span>{{label}}</span>
		<input type="text" class="date-input"/>
	</label>
	<!-- date start -->
	<transition name="fade">
		<section>
			<div class="mask"></div>
			<section class="date-box">
				<div class="date-head flex space-between align-center">
					<span class="cancel">取消</span>
					<span class="sure">确定</span>
				</div>
				<div class="date-content flex t-c">
					<date-column :list="years"></date-column>	
					<date-column :list="months"></date-column>	
				</div>
			</section>
			
		</section>
	</transition>
	<!-- date end -->
</section>
</template>

<script>
import dateColumn from './date-column.vue'; 
export default {
	name: 'date',
	props: {
		label: {
			type: String,
			default: '日期'
		},
		minYear: {
			type: Number,
			default: 1997
		},
		maxYear: {
			type: Number,
			default: 2050
		}
	},
	data(){
		return{
			years: [],
			months: []
		}
	},
	created(){
		let years = [], months = [];
		for(let i=this.minYear;i<=this.maxYear;i++){
			years.push(i);
		}

		for(let i=1;i<=12;i++){
			months.push(i);
		}

		this.years = years;
		this.months = months; 
	},
	components: {
		dateColumn
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/style/common.less';	
.date-wrapper {
	width: 100%;

	.date-label {
		width: 100%;
		display: block;
		font-size: 16px;
		color: #666;
		height: 50px;
		line-height: 50px;

		>span {
			width: 25%;
		}

		.date-input {
			width: 70%;
			border: none;
			border-bottom: 1px solid #ccc;
		}

	}

	// date 
	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		background: rgba(0,0,0,0.5);
	}

	.date-box {
		width: 100%;
		height: 50%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 100;
		background: #fff;
	}

	.date-head {
		padding: 0px 20px;
		height: 15%;
		font-size: 16px;
		border-bottom: 1px solid @baseColor;

		.sure {
			color: @baseColor;
		}
	}

	.date-content {
		width: 100%;
		height: 85%;
		
		.date-column {
			height: 100%;
			position: relative;
			overflow: hidden;
		}


	}
}
</style>