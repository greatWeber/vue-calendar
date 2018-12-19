<template>
	<section class="pc-calendar">
		<label class="calendar-label">
			<span>日期：</span>
			<input type="text" class="calendar-input" placeholder="请输入日期" ref="input">
		</label>
		<!-- calendar start -->
		<section class="calendar">
			<div class="calendar-head">
				<a href="javscript:;"><<</a>
				<a href="javascript:;"><</a>
				<span class="today">2018-12-19</span>
				<a href="javascript:;">></a>
				<a href="javascript:;">>></a>
			</div>
			<div class="week">
				<span>一</span>
				<span>二</span> 
				<span>三</span>
				<span>四</span>
				<span>五</span>
				<span>六</span>
				<span>日</span>
			</div>
		</section>
		<!-- calendar end -->
	</section>
</template>

<script>
export default {
	name: 'pc-calendar',
	data(){
		return {

		}
	}
}
</script>

<style lang="less" scoped>
@baseColor: #42b983;
.pc-calendar {
	position: relative;
	display: inline-block;
	.calendar-input {
		width: 200px;
		height: 35px;
		line-height: 35px;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

	.calendar {
		position: absolute;
		left: 20%;
		top: 50px;
		width: 200px;
		height: 300px;
		background: #fff;
		border: 1px solid @baseColor;
		border-radius: 10px;
		overflow: hidden;

		.calendar-head {
			height: 35px;
			line-height: 35px;
			text-align: center;
			background: @baseColor;
			color: #fff;

			a {
				text-decoration: none;
				color: #f5f5f5;
			}

			.today {
				padding: 0 10px;
			}
		}
	}
}
</style>