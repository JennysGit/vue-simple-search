import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import Vue from 'vue'
import { quillEditor } from 'vue-quill-editor'

// Vue.use(VueQuillEditor)

//console.log(VueQuillEditor)
export default {
  name: 'edit',
  data() {
    return {
      food: {
        title: '',
        common: '',
      },
      editorOption: {},
      commentsForm: {
        display_name: '',
        text: '',
        time: ''
      },
      commentsRules: {
        display_name: [
          { required: true, message: '请输入评论用户名', trigger: 'blur' },
        ],
        text: [
          { required: true, message: '请输入评论', trigger: 'change' }
        ],
      },
      commentsDialogVisible: false
    }
  },
  created() {
    console.log('hello')
    this.food = { "dishes_id": 3682, "suits": ["洋葱:增强免疫力", "茄子:清心明目，可防治心血管疾病", "猪肝:清热解毒，补肝明目", "鸡翅:补脾健胃", "辣椒:排毒瘦身", "猪肉:清热解毒", "鸡蛋:对骨骼、牙齿的健康有帮助"], "restraints": ["胡萝卜:降低营养价值", "黄瓜:降低营养价值", "南瓜:破坏维生素C", "豆腐:易形成结石", "牛奶:不利营养物质的吸收"], "tags": [{ "id": 289, "text": "增强免疫力", "type": 2 }, { "id": 340, "text": "家庭主妇", "type": 2 }, { "id": 326, "text": "炒", "type": 2 }, { "id": 144, "text": "蔬菜", "type": 2 }, { "id": 123, "text": "素菜", "type": 2 }], "_id": "5a94cfcbeefce01d3019d536", "title": "蕨菜炒苦瓜", "subtitle": "夏天食苦，胜过大补。苦瓜与蕨菜的清香合二为一，有菜园子的味道哟~", "category": "3分钟小炒-> 素菜 ", "image": "http://img.szzhangchu.com/1439346681737_8487308714.jpg@340h_640w_1e_1c.jpg", "common": { "title": "相关常识", "txt": "\r\n                                        苦瓜味苦，性寒，归心、肺、脾、胃经，具有消暑清热，解毒健胃，除邪热，聪耳明目，润泽肌肤，强身，使人精力旺盛，不易衰老的功效，还有降血糖、抗肿瘤、抗病毒、抗菌、促进免疫力等作用。" }, "guide": { "title": "制作指导", "txt": "煮制苦瓜时，可撒上少许盐，这样既可以减轻苦味，而且也不会破坏苦瓜原有的风味。" } }
    this.food.addComment = '123';
    this.food.comments = [
      { display_name: '张三', text: 'Good!', time: '2016-01-11 19:56:04' },
      { display_name: '李四', text: '一般!', time: '2016-01-11 19:56:04' },
    ];
  },
  computed: {
    editor() {
      return this.$refs.foodCommonQuillEditor.quill
    }
  },
  mounted() {

  },
  methods: {
    onEditorReady(editor) {
      console.log(editor)
    },
    send() {
      this.$refs.foodItemForm.validate(valid => {
        if (valid) {
          this.$confirm('确认转发该条信息吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            console.log("then")
            // TODO: save data.
          }).catch(() => {
            console.log("catch")
          })
        } else {
          console.log("form valid error")
        }

      });
    },
    save() {
      this.$refs.foodItemForm.validate(valid => {
        if (valid) {
          // TODO:save data.
        } else {
          console.log("form valid error")
        }
      })
    },
    reset() {
      this.$refs.foodItemForm.resetFields();
    },
    removeComment(index, comment) {
      this.food.comments.splice(0, 1)
      console.log(this.food.comments);
    },
    _formValid() {
      this.$refs.foodItemForm.validate(valid => {
        return valid
      })
    },
    closeCommentsDialog(isCancel) {

      if (isCancel) {
        this.commentsDialogVisible = false;
      } else {
        this.$refs.commentsDialogForm.validate(valid => {
          if (valid) {
            this.food.comments.push({
              display_name: this.commentsForm.display_name,
              text: this.commentsForm.text,
              time: Date.now()
            })
            this.commentsForm = {
              display_name: '',
              text: '',
              time: ''
            }
            this.commentsDialogVisible = false;
          }
        })
      }
    }
  },
  components: {
    quillEditor
  }
}
