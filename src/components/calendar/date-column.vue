<template>
	<div class="date-column flex-item">
		<div class="column-before"></div>
		<div class="column-after"></div>
		<div class="column-wrapper">
			<p class="column-item" v-for="(item,i) in list" @key="i"><span>{{item}}</span></p>	
		</div>
	</div>
</template>

<script>
export default {
	name: 'date-column',
	props: {
		list: {
			type: Array,
			default: ()=>[]
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/style/common.less';	

.column-wrapper {
	height: 100%;
	// transform: translateY(-200px);
}

.column-before {
	width: 100%;
	height: 40%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 100;
	background: #eee;
	opacity: 0.8;
	border-bottom: 2px solid @baseColor;
}

.column-after {
	width: 100%;
	height: 40%;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 100;
	background: #eee;
	opacity: 0.8;
	border-top: 2px solid @baseColor;
}

.column-item {
	display: table;
	width: 100%;
	height: 20%;

	>span {
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
}
</style>