<template>
	<div class="form-group" @click.native="showHideResult($event)" ref="typeaheadSearch">
		<input type="text" class="form-control" :placeholder="placeholder" v-model="searchData" >
		<transition name="fade-in-linear" mode="out-in">
			<div class="typeahead-filter" v-if="isExpand">
				<transition-group tag="ul" name="fade-in-linear" v-show="typeaheadData.length > 0">
					<li v-for="(item, index) in typeaheadData" :key="index">
						  <a href="javascript:;" rel="external nofollow" >
				         {{item}}
				       </a>
					</li>
				</transition-group>
			</div>
		</transition>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			placeholder: {
				type: String,
				default: ''
			},
			searchData: {
				type: String,
				default: ''
			},
			resultList:{
				type: Array,
				default:[]
			}
		},
		data () {
			return {
				filterData: [],
				isExpand: false
			}
		},
		methods: {
			showHideResult(e) {
				if(e) {
					 if (this.$refs.selectSearch && this.$refs.selectSearch.contains(e.target)) {
					 	this.isExpand = true;
					 }else{
					 	this.isExpand = false;
					 }
				}
			}
		},
		computed: {
			typeaheadData () {
				let temp = [];
				let searchData = this.searchData.trim()
				if(!searchData){
					return this.resultList
				}else{
					this.currentIndex = -1
					this.resultList.map(item => {
						if(item.indexOf(searchData) > -1){
							temp.push(item)
						}
					})
					return item
				}
				return temp
			}
		}
	}
</script>