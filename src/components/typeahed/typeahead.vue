<template>
	<div class="typeahed-search">
		<div class="search-header">
			<input type="text" autocomplete="off" readonly :placeholder="placeholder"/>
		</div>
		<div class="searc-result">
			<input type="text" placeholder="关键字" v-model="searchVal" autocomplete="off">
			<transition name="el-fade-in-linear" mode="out-in">
				<transition-group tag="ul" name="el-fade-in-linear" v-show="typeaheadData.length > 0">
					<li v-for="(item, index) in typeaheadData" :key="index" :class="{'active' : item.active}">
						<a href="javascript:;" rel="external"></a>
					</li>
				</transition-group>
				
			</transition>
		</div>
	</div>
</template>