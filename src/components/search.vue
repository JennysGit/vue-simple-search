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
          <label for="keyword">other</label>
          <input id="keyword" type="text" class="form-control" placeholder="other" v-model="searchData.other"/>
        </div>
        <div class="col-sm-3 form-group">
          <button class="btn btn-default" @click="search()">搜索</button>
        </div>
      </div>
    </form>
    <table class="table table-hover search-result-table table-striped">
      <thead>
        <th>菜名</th>
        <th>标签</th>
        <th>功效</th>
        <th>操作</th>
      </thead>
      <tr>
        <td>咖喱肉末粉丝</td>
        <td>"炒","健胃消食","宵夜"</td>
        <td>'["羊肉:容易上火 甚至造成便秘","螃蟹:易引起皮肤过敏"]'</td>
        <td><a href="">详情</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'search',
  data () {
    return {
     searchData: {
      title: '',
      tags: '',
      other: ''
     }
    }
  },
  methods: {
    search () {
      
      let searchParams = {};
      let searchData = this.searchData

      if (searchData.title && searchData.title.trim()) {
        searchParams.title = searchData.title
      }

      if (searchData.tags && searchData.tags.trim()) {
        searchParams.tags = searchData.tags // TODO: parse as array.
      }

      if (searchData.other && searchData.other.trim()) {
        searchParams.other = searchData.other
      }

      if (Object.keys(searchParams).length === 0) {
        alert("请输入条件")
        return
      }
      console.log(searchParams)
      axios.get('/search', {data: searchParams})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
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
.search-result-table {
  text-align: left;
  margin-top: 30px;
}
</style>
