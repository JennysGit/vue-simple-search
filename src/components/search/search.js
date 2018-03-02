import axios from 'axios'
export default {
  name: 'search',
  data() {
    return {
      searchData: { title: '', tags: '', common: '' },
      userSearchCacheData: {
        title: [{ id: 1, value: "炒" }, { id: 2, value: "煮" }, { id: 3, value: "蒸饭" }],
        tags: [{ id: 1, value: '2' }],
        common: []
      },
      foodList: [],
      isSearching: false,
      page: {
        size: 5,
        data: []
      }
    }
  },
  methods: {
    search($event) {
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
    _pageData(data) {
      if (data.length == 0) {
        this.page.data = []
        return
      }
      this.goPageIndex(1)
    },
    goPageIndex(index) {
      let startIndex = (index - 1) * this.page.size
      let endIndex = startIndex + this.page.size
      this.page.data = this.foodList.slice(startIndex, endIndex)
    },
    selectTag(tag) {
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
    },
    querySearch(queryString, cb) {
      var all = this.userSearchCacheData.title
      console.log(all)
      var results = queryString ? all.filter(this.createFilter(queryString)) : all;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchTag(queryString, cb) {
      var all = this.userSearchCacheData.tags
      var results = queryString ? all.filter(this.createFilter(queryString)) : all;
      cb(results)
    },
    querySearchCommon(queryString, cb) {
      var all = this.userSearchCacheData.common
      var results = queryString ? all.filter(this.createFilter(queryString)) : all;
      cb(results)
    },
    createFilter(queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
