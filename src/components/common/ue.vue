<!-- vue quill editor -->
<template>
	<div>
		<scrip id="editor" type="text/plain"></script>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'UE',
		data () {
			return {
				editor: null
			}
		},
		props: {
			defaultMsg: {
				type: String
			},
			config: {
				type: Object
			}
		},
		mounted () {
			this.editor = UE.getEditor('editor', this.config)
			this.editor.addEventListener('ready', () => {
				this.editor.setContent(this.defaultMsg)
			})
		},
		methods: {
			getUEContent() {
				return this.editor.getContent()
			},
			destroyed () {
				this.editor.destroy()
			}
		}
	}
</script>