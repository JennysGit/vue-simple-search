<template>
  <el-container>
    <el-header>
      <h3 class="text-center">综合查询</h3>
    </el-header>
     <el-main class="main">
      <!-- 搜索的表单 -->
      <form action="" class="search-form">
        <el-row :gutter="20">
          <el-col :span="6">
            <label for="keyword">菜名</label>
            <el-autocomplete
              v-model="searchData.title"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
          <el-col :span="6">
            <label for="keyword">标签</label>
             <el-autocomplete
              class="inline-input"
              v-model="searchData.tags"
              :fetch-suggestions="querySearchTag"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
           </el-col>
          <el-col :span="6">
            <label for="common">常识</label>
            <el-autocomplete
              class="inline-input"
              v-model="searchData.common"
              :fetch-suggestions="querySearchCommon"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
           </el-col>
          <el-col :span="6">
            <el-button class="search-btn" type="primary" @click="search($event)" :loading="isSearching">搜索</el-button>
           </el-col>
        </el-row>
      </form>
      <!-- 搜索结果表格 -->
      <el-table
        class="search-result-table"
        :data="page.data"
        stripe
        v-loading="isSearching"
        v-show="page.data.length > 0 || isSearching">
        <el-table-column
          prop="title"
          label="菜名"
          width="200"
        ></el-table-column>
        <el-table-column
        label="标签">
          <template slot-scope="scope">
           <el-button v-for="(tag, index) in scope.row.tags" :key="index" type="success" @click="selectTag(tag.text)">{{ tag.text }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
        label="常识"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.common.txt.trim() }}</span>
          </template>
        </el-table-column>
        <el-table-column
        label="操作" width="100" class-name="text-center">
          <template slot-scope="scope">
            <a :href="'http://h5.izhangchu.com/dishes_view/index.html?dishes_id='+ scope.row.dishes_id" target="_blank">详情</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="results-pagination"
        background
        layout="prev, pager, next"
        :page-size="page.size"
        :total="foodList.length"
        @current-change="goPageIndex" v-if="foodList.length > 0">
      </el-pagination>
    </el-main>
    </el-container>
</template>
<script src="./search.js"></script>
<style scoped>
  @import './search.css';
</style>