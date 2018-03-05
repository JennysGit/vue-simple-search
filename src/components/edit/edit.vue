<template>
  <el-container>
    <el-header>
      <h3 class="text-center">编辑</h3>
    </el-header>
    <el-main class="main">
      <el-form :model="food" label-width="80px" ref="foodItemForm">
        <el-form-item :model="food" label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
          <el-input v-model="food.title"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="common.txt" :rules="[{ required: true, message: '请输入详情', trigger: 'blur' }]">
          <quill-editor v-model="food.common.txt" ref="foodCommonQuillEditor" class="editor" @ready="onEditorReady($event)"></quill-editor>
        </el-form-item>
        <el-form-item label="评论">
          <el-row ng-show="food.comments.length > 0" v-for="(comment, index) in food.comments" :key="index" class="comment-box">
            <div class="comment-title">
              <span class="name">{{comment.display_name}}</span>
              <span class="time">{{comment.time}}</span>
            </div>
            <div class="comment-content">
              {{comment.text}}
            </div>
            <el-button type="text" class="remove-comment-btn" @click="removeComment(index, comment)">删除评论</el-button>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="commentsDialogVisible = true">添加评论</el-button>
          <el-button type="success">预览</el-button>
          <el-button type="primary" @click="save()">保存</el-button>
          <el-button type="warning" @click="send()">转发</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-dialog title="添加评论" :visible.sync="commentsDialogVisible">
      <el-form ref="commentsDialogForm" :model="commentsForm" label-width="80px" :rules="commentsRules">
        <el-form-item label="用户名" prop="display_name">
          <el-input v-model="commentsForm.display_name"></el-input>
        </el-form-item>
        <el-form-item label="评论" prop="text">
          <el-input :rows="5" type="textarea" v-model="commentsForm.text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCommentsDialog(true)">取 消</el-button>
        <el-button type="primary" @click="closeCommentsDialog(false)">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script type="text/javascript" src="./edit.js"></script>
<style type="text/css">
@import "./edit.css";

</style>
