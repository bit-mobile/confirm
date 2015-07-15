var Backbone = require("modules-common/backbone/backbone.js"),
	$ = require("modules-common/zepto/zepto.js");

var View = Backbone.View.extend({
	tagName: "div",

	attributes: {
		class: "confirm"
	},

	initialize: function(option) {
		this.render();
		this.initEvent();
		if (option) {
			this.set(option);
		}
	},

	render: function() {
		this.$el.append(__inline("confirm.html"));

		this.$text = this.$el.find(".JS-text");
		this.$ok = this.$el.find(".JS-ok");
		this.$cancel = this.$el.find(".JS-cancel");
		$("#wraper").append(this.$el);
	},

	initEvent: function() {
		var that = this;
		this.$ok.on("click", function() {
			that.hide();
			that.onOk && that.onOk();
		});

		this.$cancel.on("click", function() {
			that.hide();
			that.onCancel && that.onCancel();
		});
	},

	set: function( option ) {
		option = option || {};
		if (option.text) {
			this.$text.text(option.text);
		}

		this.onCancel = option.onCancel;
		this.onOk = option.onOk;
	},

	show: function(option) {
		this.$el.show();
		if ( option ) {
			this.set(option);
		}
	},

	hide: function() {
		this.$el.hide();
	},

	destroy: function(){
		this.remove();
	}
});

// 实现单例模式
module.exports = {
	show: function(option){
		var that = this;
		if ( !this.confirm ) {
			this.confirm = new View();
		}

		function onCancel(){
			option.onCancel && option.onCancel();
			that.hide();
		}

		function onOk(){
			option.onOk && option.onOk();
			that.hide();
		}

		this.confirm.set({
			text:option.text,
			onOk: onOk,
			onCancel: onCancel
		})；
	},

	hide: function(){
		if ( this.confirm ) {
			this.confirm && this.confirm.destroy();
			this.confirm = null;
		}
	}
}