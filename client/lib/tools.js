saveContent = function (code) {

	code = code || $(".nav li.active a").data('id') || null;

	if (!code) return false;

	var content = $('.content[data-id="'+code+'"]').find('.summernote').code();

	Meteor.clearTimeout(timeoutKeyUp.get());
	isSaving.set(true);
	Meteor.call('update', code, content, function (err, res) {
		if (!err && res) {
			isSaving.set(false);
			timeoutKeyUp.set(null);
		}
	});


	return true;
}



initSummerNote = function () {
	summernoteLoading.set(Meteor.setTimeout(function () {
		console.log("init summernote");
		$('.summernote').summernote({
			toolbar: [
			['insert', ['picture', 'link', 'hr']],
			['style', ['bold', 'underline', 'clear']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['misc', ['fullscreen', 'codeview', 'undo', 'redo']],
			],
			height: 700,
			minHeight: 300,
			keyMap: {
				pc: {
					'ENTER': 'insertParagraph',
					'CTRL+Z': 'undo',
					'CTRL+Y': 'redo',
					'TAB': 'tab',
					'SHIFT+TAB': 'untab',
					'CTRL+B': 'bold',
					'CTRL+I': 'italic',
					'CTRL+U': 'underline',
					'CTRL+BACKSLASH': 'removeFormat',
					'SHIFT+TAB': 'outdent',
					'TAB': 'indent',
					'CTRL+ENTER': 'insertHorizontalRule',
					'CTRL+K': 'showLinkDialog'
				},
				mac: {
					'ENTER': 'insertParagraph',
					'CMD+Z': 'undo',
					'CMD+SHIFT+Z': 'redo',
					'TAB': 'tab',
					'SHIFT+TAB': 'untab',
					'CMD+B': 'bold',
					'CMD+I': 'italic',
					'CMD+U': 'underline',
					'CMD+BACKSLASH': 'removeFormat',
					'SHIFT+TAB': 'outdent',
					'TAB': 'indent',
					'CMD+ENTER': 'insertHorizontalRule',
					'CMD+K': 'showLinkDialog'
				}
			}
		});
summernoteLoading.set(false);
}, 200));
}
