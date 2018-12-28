<template>
	<section class="pc-date">
		<label class="date-label">
			<span>{{label}}</span>
			<input type="text" class="date-input" placeholder="请输入日期" ref="input" v-model="inputDate" @focus="isShow = true;" @blur="blurFn">
		</label>
		<!-- date start -->
		<transition name="fade">
			<section class="date" v-show="isShow" @click="makeFocus" :style="{borderColor:color}"> 
				<div class="date-head" :style="{background:color}">
					<a href="javscript:;" @click="lastYear"><<</a>
					<a href="javascript:;" @click="lastMoney"><</a>
					<span class="today">{{showDate}}</span>
					<a href="javascript:;" @click="nextMoney">></a>
					<a href="javascript:;" @click="nextYear">>></a>
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
				<div class="content">
					<p class="row" v-for="(row,i) in [1,2,3,4,5,6]" :key="i">
						<template v-for="(col,k) in [1,2,3,4,5,6,7]">
							<span :class="[dateList[i*7+k].choose? 'choose':'','col last']" v-if="dateList[i*7+k].isLast" @click="chooseDateFn(i*7+k)" :style="{background:dateList[i*7+k].choose? color:''}">{{dateList[i*7+k].value}}</span>
							<span :class="[dateList[i*7+k].choose? 'choose':'','col']" v-if="dateList[i*7+k].isCurrent" @click="chooseDateFn(i*7+k)" :style="{background:dateList[i*7+k].choose? color:''}">{{dateList[i*7+k].value}}</span>
							<span :class="[dateList[i*7+k].choose? 'choose':'','col next']" v-if="dateList[i*7+k].isNext" @click="chooseDateFn(i*7+k)" :style="{background:dateList[i*7+k].choose? color:''}">{{dateList[i*7+k].value}}</span>
							
						</template>
					</p>
				</div>
			</section>
		</transition>
		<!-- date end -->
	</section>
</template>

<script>
export default {
	props: {
		chooseDate: {
			type: String,
			default: '',
			validator: function(val){
				return val.match(/^\d{4}-\d{2}-\d{2}$/) || !val
			}

		},
		label: {
			type: String,
			default: '日期:'
		},
		thime: {
			type: String,
			default: "#42b983"
		},
		minYear: {
			type: Number,
			default: 1970
		},

		maxYear: {
			type: Number,
			default: 2100
		}
	},
	name: 'pc-date',
	data(){
		return {
			dateList: [],
			today: new Date(),
			currentData: null,
			currentYear: null,
			currentMonth: null,
			currentDay: null,
			showDate: '',
			inputDate: '',
			currentIndex: 0,
			isShow: false
		}
	},
	created(){
		this.currentData = this.chooseDate ? new Date(this.chooseDate) : this.today;
		this.setCurrent();
		this.dateFormat();
		this.setDateList();
	},
	computed: {
		color(){
			if(!this.thime){
				this.thime = '#42b983'
			}
			return this.thime;
		}
	},
	watch: {
		inputDate(val){
			this.$emit('dateChange',val);
		},

		showDate(val){
			this.inputDate = val;
		}
	},
	methods: {
		setCurrent(){
			this.currentYear = parseInt(this.currentData.getFullYear());
			this.currentMonth = parseInt(this.currentData.getMonth()+1);
			this.currentDay = parseInt(this.currentData.getDate());

		},
		dateFormat(){
			let month = this.currentMonth >= 10 ? this.currentMonth : `0${this.currentMonth}`;
			let day = this.currentDay >= 10 ? this.currentDay : `0${this.currentDay}`;
			this.showDate = `${this.currentYear}-${month}-${day}`;
		},
		setDateList(){
			this.dateList = [];
			let days = new Date(this.currentYear, this.currentMonth,0).getDate(); //得到本月的天数
			//得到上一个的天数
			let lastDays;
			if(this.currentMonth-1 === 0){
				lastDays = new Date(this.currentYear-1, 12,0).getDate();
			}else{

				lastDays = new Date(this.currentYear, this.currentMonth-1,0).getDate();
			}
			let startDay = `${this.currentYear}-${this.currentMonth}-1`; //本月的开始日期
			let w = new Date(startDay).getDay(); //获取星期几
			if(w<1){
				w = 7;
			}
			let lastDay_start = lastDays - w;
			// 添加上个月的显示天数
			for(let i=1;i<w;i++){
				this.dateList.push({
					value: lastDay_start+i,
					isLast: true,
					isCurrent: false,
					isNext: false,
					choose: false
				})
			}
			// 添加本月的显示天数
			for(let i=1;i<=days;i++){
				let choose ;
				let year = this.today.getFullYear();
				let month = this.today.getMonth()+1;
				// 今天高亮
				if(this.currentYear == year && this.currentMonth == month && i== this.currentDay){
					choose = true;
					this.currentIndex = this.dateList.length;
				}else{
					choose = false;
				}
				this.dateList.push({
					value: i,
					isLast: false,
					isCurrent: true,
					isNext: false,
					choose: choose
				})
			}

			// 添加下个月的显示天数
			let nextLength = 6*7-w-days+1;
			for(let i=1;i<=nextLength;i++){
				this.dateList.push({
					value: i,
					isLast: false,
					isCurrent: false,
					isNext: true,
					choose: false
				})
			}
		},
		lastMoney(){
			if(this.currentMonth-1 === 0){
				// 上一年
				this.currentMonth = 12;
				this.currentYear -= 1;
			}else{
				this.currentMonth -= 1;
			}

			this.dateFormat();
			this.setDateList();
		},
		nextMoney(){
			if(this.currentMonth === 12){
				// 下一年
				this.currentMonth = 1;
				this.currentYear += 1;
			}else{
				this.currentMonth += 1;
			}

			this.dateFormat();
			this.setDateList();
		},

		lastYear(){
			if(this.currentYear>this.minYear){
				this.currentYear -= 1;
			}

			this.dateFormat();
			this.setDateList();

		},

		nextYear(){
			if(this.currentYear < this.maxYear){
				this.currentYear +=1;
			}
			this.dateFormat();
			this.setDateList();
		},

		chooseDateFn(i){
			let lastIndex = this.currentIndex;
			let month = this.currentMonth;
			let year = this.currentYear;
			if(this.dateList[i].isLast){
				month -= 1;
			}else if(this.dateList[i].isNext){
				month += 1;
			}
			if(month<=0){
				month = 12;
				year -= 1;
			}

			if(month >12){
				month = 1;
				year += 1;
			}

			if(year > this.maxYear){
				year = this.maxYear;
			}else if(year < this.minYear){
				year = this.minYear;
			}

			this.dateList[lastIndex].choose = false;
			this.dateList[i].choose = true;
			this.currentIndex = i;
			let day = this.dateList[i].value;
			month = month >= 10 ? month : `0${month}`;
			day = day >= 10 ? day : `0${day}`;
			this.showDate = `${year}-${month}-${day}`;

		},
		makeFocus(e){
			this.$refs.input.focus();
		},
		blurFn(e){
			setTimeout(()=>{
				if(this.$refs.input != document.activeElement){
					this.isShow = false;
				}
				
			},200)
		}
	}
}
</script>

<style lang="less" scoped>
@baseColor: #42b983;
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
.pc-date {
	position: relative;
	display: inline-block;
	.date-input {
		width: 200px;
		height: 35px;
		line-height: 35px;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

	.date {
		position: absolute;
		left: 20%;
		top: 50px;
		width: 200px;
		height: 300px;
		background: #fff;
		border: 1px solid @baseColor;
		border-radius: 10px;
		overflow: hidden;

		.date-head {
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

		.week {
			line-height: 35px;
			background: #eee;
			display: flex;

			span {
				flex: 1;
			}
		}

		.content {
			line-height: 35px;
			color: #666;
			font-size: 13px;
			padding-top: 10px;

			.row {
				display: flex;
				margin: 0;
			}

			.col {
				flex: 1;
				cursor: pointer;
			}

			.last, .next {
				color: #999;
			}

			.choose {
				background: @baseColor;
				color: #fff;
				border-radius: 10%;
			}
		}
	}
}
</style>