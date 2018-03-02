import axios from 'axios'
export default {
  name: 'search',
  data() {
    return {
      searchData: { title: '', tags: '', common: '' },
      userSearchCacheData: {
        title: [],
        tags: [],
        common: []
      },
      foodList: [],
      isSearching: false,
      searchResultError: '',
      page: {
        size: 5,
        data: []
      }
    }
  },
  created() {
    axios.get('api/search').then(res => {
      if (res.data) {
        // TODO: get search data
        this.searchResultError = false
        this.userSearchCacheData = res.data.data;
        console.log(this.userSearchCacheData)
      } else {
        this.searchResultError = true
      }
    }).catch(err => {
      this.searchResultError = true
    })
  },
  methods: {
    search($event) {
      if ($event) {
        $event.preventDefault() // 阻止表单默认提交
      }

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
      this._saveCacheData()
      this.isSearching = true

      axios.post('api/search', searchParams)
        .then((res) => {
          if (res.data.data) {
            this.foodList = res.data.data
            this._pageData(this.foodList)
            this.isSearching = false
          } else {
            this.searchResultError = true
          }
        })
        .catch((err) => {
          console.log(err)
          this.isSearching = false
          this.searchResultError = true
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
      this.search();
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
      console.log(all);
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
    handleSelect(item) {},
    _saveCacheData() {
      let cacheData = this.userSearchCacheData;
      if (!this._hasItem(cacheData.title, "value", this.searchData.title)) {
        let len = this.userSearchCacheData.title.length;
        this.userSearchCacheData.title.unshift({ id: len + 1, value: this.searchData.title });
      }
      if (!this._hasItem(cacheData.tags, "value", this.searchData.tags)) {
        let len = this.userSearchCacheData.tags.length;
        this.userSearchCacheData.tags.unshift({ id: len + 1, value: this.searchData.tags });
      }
      if (!this._hasItem(cacheData.common, "value", this.searchData.common)) {
        let len = this.userSearchCacheData.common.length;
        this.userSearchCacheData.common.unshift({ id: len + 1, value: this.searchData.common });
      }
    },
    _hasItem(arr, prop, propVal) {
      return arr.filter(item => item[prop] === propVal).length !== 0
    }
  }
}
