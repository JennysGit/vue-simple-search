<template>
 <div class="select-search" v-if="typeaheadData" ref="selectSearch" @click.native="showHideMenu($event)">
  <div class="select-header">
   <input type="text" autocomplete="off" readonly :placeholder="placeholder" :value="placeholderValue" @keydown.down.prevent="selectChildWidthArrowDown" @keydown.up.prevent="selectChildWidthArrowUp" @keydown.enter="selectChildWidthEnter">
   <i class="fzicon " :class="isExpand?'fz-ad-jiantou1':'fz-ad-jiantou'"></i>
  </div>
  <div class="select-body" v-if="isExpand && typeaheadData">
   <input type="text" placeholder="关键字" v-model="searchVal" autocomplete="off" @keydown.esc="resetDefaultStatus" @keydown.down.prevent="selectChildWidthArrowDown" @keydown.up.prevent="selectChildWidthArrowUp" @keydown.enter="selectChildWidthEnter">
   <transition name="el-fade-in-linear" mode="out-in">
    <div class="typeahead-filter">
     <transition-group tag="ul" name="el-fade-in-linear" v-show="typeaheadData.length>0">
      <li v-for="(item,index) in typeaheadData" :key="index" :class="item.active ? 'active':''" @mouseenter="setActiveClass(index)" @mouseleave="setActiveClass(index)" @click="selectChild(index)">
       <a href="javascript:;" rel="external nofollow" >
        {{item[mapDataFormat.label]}}
       </a>
      </li>
     </transition-group>
     <p class="noFound" v-show="typeaheadData && typeaheadData.length === 0">未能查询到,请重新输入!</p>
    </div>
   </transition>
  </div>
 </div>
</template>
<script>
 export default {
  name: 'selectSearch',
  data: function () {
   return {
    placeholderValue: '',// 给看到选择内容的
    isExpand: false,
    searchVal: '', // 搜索关键字
    resultVal: '', // 保存搜索到的值
    searchList: [], //保存过滤的结果集
    currentIndex: -1, // 当前默认选中的index,
   }
  },
  computed: {
   mapFormatData () { // 外部有传入格式的时候映射mapData
    return this.mapData.map(item => {
     item[this.mapDataFormat.value] = item[this.mapDataFormat.value];
     return item;
    });
   },
   typeaheadData () {
    let temp = [];
    if (this.searchVal && this.searchVal === '') {
     return this.mapFormatData;
    } else {
     this.currentIndex = -1; // 重置特殊情况下的索引
     this.mapFormatData.map(item => {
      if (item[this.mapDataFormat.label].indexOf(this.searchVal.toLowerCase().trim()) !== -1) {
       temp.push(item)
      }
      return item;
     })
     return temp;
    }
   }
  },
  props: {
   placeholder: {
    type: String,
    default: '--请选择--'
   },
   emptyText: {
    type: String,
    default: '暂无数据'
   },
   mapData: { // 外部传入的列表数据
    type: Array,
    default: function () {
     return []
    }
   },
   mapDataFormat: { // 映射传入数据的格式
    type: Object,
    default: function () {
     return {
      label: 'text',
      value: 'value',
      extraText: 'extraText'
     }
    }
   },
   asyncData: { // 实时响应的值
    type: [Object, String],
    default: function () {
     return {}
    }
   }
  },
  methods: {
   showHideMenu (e) { // 点击其他区域关闭下拉列表
    if (e) {
     if (this.$refs.selectSearch && this.$refs.selectSearch.contains(e.target)) {
      this.isExpand = true;
     } else {
      this.isExpand = false;
     }
    }
   },
   resetDefaultStatus () { // 清除所有选中状态
    this.searchVal = '';
    this.currentIndex = -1;
    this.typeaheadData.map(item => {
     this.$delete(item, 'active');
    })
   },
   setActiveClass (index) { // 设置样式活动类
    this.typeaheadData.map((item, innerIndex) => {
     if (index === innerIndex) {
      this.$set(item, 'active', true);
      this.currentIndex = index; // 这句话是用来修正index,就是键盘上下键的索引,不然会跳位
     } else {
      this.$set(item, 'active', false)
     }
    })
   },
   selectChildWidthArrowDown () {
    // 判断index选中子项
    if (this.currentIndex < this.typeaheadData.length) {
     this.currentIndex++;
     this.typeaheadData.map((item, index) => {
      this.currentIndex === index ? this.$set(item, 'active', true) : this.$set(item, 'active', false);
     })
    }
   },
   selectChildWidthArrowUp () {
    // 判断index选中子项
    if (this.currentIndex > 0) {
     this.currentIndex--;
     this.typeaheadData.map((item, index) => {
      this.currentIndex === index ? this.$set(item, 'active', true) : this.$set(item, 'active', false);
     })
    }
   },
   selectChildWidthEnter () {
    // 若是结果集只有一个,则默认选中
    if (this.typeaheadData.length === 1) {
     this.$emit('update:asyncData', this.typeaheadData[0]); // emit响应的值
     this.placeholderValue = this.typeaheadData[0][this.mapDataFormat.label];
    } else {
     // 若是搜索的内容完全匹配到项内的内容,则默认选中
     this.typeaheadData.map(item => {
      if (this.searchVal === item[this.mapDataFormat.label] || item.active === true) {
       this.$emit('update:asyncData', item); // emit响应的值
       this.placeholderValue = item[this.mapDataFormat.label];
      }
     })
    }
    this.isExpand = false;
   },
   selectChild (index) {
    // 鼠标点击选择子项
    this.typeaheadData.map((item, innerIndex) => {
     if (index === innerIndex || item.active) {
      this.placeholderValue = item[this.mapDataFormat.label];
      this.$emit('update:asyncData', item); // emit响应的值
     }
    });
    this.isExpand = false;
   },
  },
  mounted () {
   window.addEventListener('click', this.showHideMenu);
  },
  beforeDestroy () {
   window.removeEventListener('click', this.showHideMenu);
  },
  watch: {
   'isExpand' (newValue) {
    if (newValue === false) {
     this.resetDefaultStatus();
    }
   }
  }
 }
</script>
<style scoped lang="scss">
 .el-fade-in-linear-enter-active,
 .el-fade-in-linear-leave-active,
 .fade-in-linear-enter-active,
 .fade-in-linear-leave-active {
  transition: opacity .2s linear;
 }
 .el-fade-in-enter,
 .el-fade-in-leave-active,
 .el-fade-in-linear-enter,
 .el-fade-in-linear-leave,
 .el-fade-in-linear-leave-active,
 .fade-in-linear-enter,
 .fade-in-linear-leave,
 .fade-in-linear-leave-active {
  opacity: 0;
 }
 .noFound {
  text-align: center;
 }
 .select-search {
  position: relative;
  z-index: 1000;
  a {
   color: #333;
   text-decoration: none;
   padding: 5px;
  }
  ul {
   list-style: none;
   padding: 6px 0;
   margin: 0;
   max-height: 200px;
   overflow-x: hidden;
   overflow-y: auto;
   li {
    display: block;
    width: 100%;
    padding: 5px;
    font-size: 14px;
    padding: 8px 10px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #48576a;
    height: 36px;
    line-height: 1.5;
    box-sizing: border-box;
    cursor: pointer;
    &.active {
     background-color: #20a0ff;
     a {
      color: #fff;
     }
    }
   }
  }
  .select-header {
   position: relative;
   border-radius: 4px;
   border: 1px solid #bfcbd9;
   outline: 0;
   padding: 0 8px;
   >input {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: 0;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
   }
   >i {
    transition: all .3s linear;
    display: inline-block;
    position: absolute;
    right: 3%;
    top: 50%;
    transform: translateY(-50%);
   }
  }
  .select-body {
   position: absolute;
   border-radius: 2px;
   background-color: #fff;
   box-sizing: border-box;
   margin: 5px 0;
   padding: 8px;
   width: 100%;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
   >input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    display: inline-block;
    &:focus {
     outline: 0;
     border-color: #20a0ff;
    }
   }
  }
 }
</style>