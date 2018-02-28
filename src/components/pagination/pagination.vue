<!-- don' use now -->
<template>
	<nav aria-label="Page navigation" class="text-center">
      <ul class="pagination">
        <li>
          <a href="javascript:void(0)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li><a href="javascript:void(0)">1</a></li>
        <li><a href="javascript:void(0)">2</a></li>
        <li><a href="javascript:void(0)">3</a></li>
        <li><a href="javascript:void(0)">4</a></li>
        <li><a href="javascript:void(0)">5</a></li>
        <li>
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
</template>
<script type="text/javascript">
	export default {
		name: 'pagination',
		props: {
			pageData： {
				type: Array,
				default: []
			}
		},
		data () {
			return {
				pageSize: 5, // 每页显示条数
				pageCount: 0 // 总页数
				pageCurrent:1, // 当前页
				totalCount: 0, //总页数
			}
		},
		computed: {
			totalPage() {
				return Math.ceil(this.pageNum / this.limit)
			},
			currentPage() {
				return Math.ceil(this.offset / this.limit) + 1
			}
		},
		methods: {
			prev () {

			},

		}
		
	}
</script>