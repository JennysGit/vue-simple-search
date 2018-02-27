<template>
 <div class="container main">
    <form action="" class="form-inline">
      <div class="row">
        <div class="col-sm-3 form-group">
          <label for="keyword">菜名</label>
          <input id="keyword" type="text" class="form-control" placeholder="菜名" v-model="searchData.title"/>
        </div>
        <div class="col-sm-3 form-group">
          <label for="keyword">标签</label>
          <input id="keyword" type="text" class="form-control" placeholder="标签"  v-model="searchData.tags"/>
        </div>
        <div class="col-sm-3 form-group">
          <label for="suit">功效</label>
          <input id="suit" type="text" class="form-control" placeholder="功效" v-model="searchData.suit"/>
        </div>
        <div class="col-sm-3 form-group">
          <button class="btn btn-primary search-btn" @click="search()" :disabled="isSearching">搜索</button>
        </div>
      </div>
    </form>
    <table class="table table-hover table-striped search-result-table" v-show="foodList.length > 0">
      <thead>
        <tr>
          <th width="20%">菜名</th>
          <th width="30%">标签</th>
          <th width="40%">功效</th>
          <th width="10%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in foodList">
          <td>{{food.title}}</td>
          <td class="tags"><button v-for="tag in food.tags" class="btn" :class="{'btn-success': tag.type == 2}">{{ tag.text }}</button></td>
          <td><span v-for="suit in food.suits">{{ suit }}</span></td>
          <td><a href="javascript:void(0)" ng-click="showDetail()">详情</a></td>
        </tr>
      </tbody>
    </table>
    <div class="in-searching text-center" v-show="isSearching">
      <img :src="loadingImgUrl" alt="">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'search',
  data () {
    return {
      searchData: {title: '', tags: '', suit: ''},
      foodList: [],
      isSearching: false,
      loadingImgUrl: require('../assets/loading.gif')
    }
  },
  methods: {
    search () {
      let searchParams = {}
      let searchData = this.searchData

      if (searchData.title && searchData.title.trim()) {
        searchParams.title = searchData.title
      }

      if (searchData.tags && searchData.tags.trim()) {
        searchParams.tags = searchData.tags // TODO: parse as array.
      }

      if (searchData.suit && searchData.suit.trim()) {
        searchParams.suit = searchData.suit
      }

      if (Object.keys(searchParams).length === 0) {
        alert('请输入条件')
        return
      }
      console.log(searchParams)
      this.isSearching = true
      axios.get('api/search', {data: searchParams})
        .then((res) => {
          if (res.data.data) {
            this.foodList = res.data.data
            this.isSearching = false
            console.log(res.data)
          }
        })
        .catch((err) => {
          console.log(err)
          this.isSearching = false
        })
    }
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
