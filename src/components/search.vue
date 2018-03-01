<template>
 <div class="container main">
    <form action="" class="form-inline">
      <div class="row">
        <div class="col-sm-3 form-group">
          <label for="keyword">菜名</label>
          <typeahead placeholder="菜名" v-model="searchData.title" :resultList="userSearchCacheData.title"></typeahead>
          <!-- <input id="keyword" type="text" class="form-control" placeholder="菜名" v-model="searchData.title"/> -->
        </div>
        <div class="col-sm-3 form-group">
          <label for="keyword">标签</label>
          <input id="keyword" type="text" class="form-control" placeholder="标签"  v-model="searchData.tags"/>
        </div>
        <div class="col-sm-3 form-group">
          <label for="common">常识</label>
          <input id="common" type="text" class="form-control" placeholder="常识" v-model="searchData.common"/>
        </div>
        <div class="col-sm-3 form-group">
          <button class="btn btn-primary search-btn" @click="search($event)" :disabled="isSearching">搜索</button>
        </div>
      </div>
    </form>
    <table class="table table-hover table-striped search-result-table" v-show="page.data.length > 0 && !isSearching">
      <thead>
        <tr>
          <th width="20%">菜名</th>
          <th width="30%">标签</th>
          <th width="40%">常识</th>
          <th width="10%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in page.data">
          <td>{{food.title}}</td>
          <td class="tags">
            <button v-for="tag in food.tags" class="btn" :class="{'btn-success': tag.type == 2, 'btn-default': tag.type != 2}" @click="selectTag(tag.text)">{{ tag.text }}</button>
            </td>
          <td><span>{{ food.common.txt.trim() }}</span></td>
          <td><a :href="'http://h5.izhangchu.com/dishes_view/index.html?dishes_id='+food.dishes_id" target="_blank">详情</a></td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation" class="text-center" v-show="foodList.length > 0 && !isSearching">
      <ul class="pagination">
        <li v-show="page.curIndex != 0">
           <a href="javascript:void(0)" aria-label="first"  @click="goPageIndex(0)">
            <span aria-hidden="true">第一页</span>
          </a>
        </li>
        <li :class="{'disabled': page.curIndex == 0}">
          <a href="javascript:void(0)" aria-label="Previous"  @click="goPageIndex(page.curIndex - 1)">
            <span aria-hidden="true">上一页</span>
          </a>
        </li>
        <li v-show="page.showPrevMore">
          <a href="javascript:void(0)" aria-label="Next" @click="goPageIndex(page.prevMoreVal)">
            <span aria-hidden="true">...</span>
          </a>
        </li>
        <li v-for="pageNum in page.numArray" :class="{'active': page.curIndex == pageNum - 1}">
          <a href="javascript:void(0)" @click="goPageIndex(pageNum - 1)">
          <span>{{ pageNum }}</span>
          </a>
        </li>
        <li v-show="page.showNextMore">
          <a href="javascript:void(0)" aria-label="Next" @click="goPageIndex(page.nextMoreVal)">
            <span aria-hidden="true">...</span>
          </a>
        </li>
        <li :class="{'disabled': page.curIndex == page.total - 1}">
          <a href="javascript:void(0)" aria-label="Next"  @click="goPageIndex(page.curIndex + 1)">
            <span aria-hidden="true">下一页</span>
          </a>
        </li>
        <li v-show="page.curIndex != page.total - 1">
           <a href="javascript:void(0)" aria-label="last" @click="goPageIndex(page.total - 1)">
            <span aria-hidden="true">最后一页</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="in-searching text-center" v-show="isSearching">
      <img :src="loadingImgUrl" alt="">
    </div> 
  </div>
</template>

<script>
import axios from 'axios'
import typeahead from './typeahed/test.vue'

export default {
  name: 'search',
  data () {
    return {
      searchData: {title: '', tags: '', common: ''},
      userSearchCacheData: {
        title: ["炒", "煮", "蒸饭"],
        tags: [],
        common: []
      },
      foodList: [],
      isSearching: false,
      loadingImgUrl: require('../assets/loading.gif'),
      page: {
        total: 0,
        curIndex: 0,
        size: 5,
        data: [],
        numArray: [],
        prevMoreVal: null,
        nextMoreVal: null
      }
    }
  },
  methods: {
    search ($event) {
      $event.preventDefault() // 阻止表单默认提交

      let searchParams = {}
      let searchData = this.searchData

      if (searchData.title && searchData.title.trim()) {
        searchParams.title = searchData.title.trim()
      }

      if (searchData.tags && searchData.tags.trim()) {
        searchParams.tags = searchData.tags.trim()
      }

      if (searchData.common && searchData.common.trim()) {
        searchParams.common = searchData.common.trim()
      }

      if (Object.keys(searchParams).length === 0) {
        alert('请输入条件')
        return
      }
      console.log(searchParams)
      this.isSearching = true
      axios.post('api/search', searchParams)
        .then((res) => {
          if (res.data.data) {
            this.foodList = res.data.data
            this._pageData(this.foodList)
            this.isSearching = false
            console.log("foodList", this.foodList)
          }
        })
        .catch((err) => {
          console.log(err)
          this.isSearching = false
          this.page.data = []
          this.foodList = []
        })
    },
    _pageData (data) {
      this.page.numArray = []
      this.page.total = Math.ceil(data.length / this.page.size)
     
      if(data.length == 0){
        this.page.data = []
        return
      }
    
      this.goPageIndex(0)
    },
    goPageIndex (index) { 
      if(index >= 0 && index <= this.page.total - 1) {
        this.page.numArray = []
        let startIndex = index * this.page.size
        let endIndex = startIndex + this.page.size
        this.page.data = this.foodList.slice(startIndex, endIndex)
        this.page.curIndex = index

        if(this.page.total > 6){
          this.page.showPrevMore = true
          this.page.showNextMore = true
          let startNumIndex, endNumIndex
          if(index < 3){
            startNumIndex = 0
            endNumIndex = 4
            this.page.showPrevMore = false
            this.page.nextMoreVal = endNumIndex + 3
          }else if(index > this.page.total - 3){
            startNumIndex = this.page.total - 5
            endNumIndex = this.page.total -1
            this.page.showNextMore = false;
            this.page.prevMoreVal = startNumIndex - 3
          }else {
           startNumIndex = index - 2
           endNumIndex = index + 2 
           this.page.prevMoreVal = startNumIndex -3
           this.page.nextMoreVal = endNumIndex + 3
          }
          for(let i = startNumIndex + 1; i<= endNumIndex + 1; i++){
            this.page.numArray.push(i)
          }
        }else{
          this.page.showPrevMore = false
          this.page.showNextMore = false
          for(let i = 1; i <= this.page.total; i++) {
              this.page.numArray.push(i)
          }
        }
      }
    },
    selectTag (tag) {
      console.log("select tag")
      let searchTag = this.searchData.tags
      this.searchData.tags = tag
      // multi tags query.
      // if(searchTag.length === 0) {
      //   this.searchData.tags = tag
      // }else {
      //    if(searchTag.indexOf(tag) === -1){

      //     this.searchData.tags = searchTag + ', ' + tag
      //   }
      // }
    }
  },
  components: {
    typeahead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  margin-top: 50px;
}
.search-btn {
  width: 80%;
}
.search-result-table {
  text-align: left;
  margin-top: 30px;
}
.food-title {
  min-width: 200px;
}
.tags .btn {
  padding: 4px;
  margin: 3px;
  min-width: 50px;
}
</style>
