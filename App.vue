<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	a {
		text-decoration: none;
		color: #000;
	}

	a,
	label,
	button,
	input,
	select {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	img {
		border: 0;
	}

	body {
		background: #fff;
		color: #666;
	}

	html,
	body,
	div,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	button,
	fieldset,
	form,
	input,
	legend,
	textarea,
	th,
	td {
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
		color: #48b480;
	}

	button {
		outline: 0;
	}

	img {
		border: 0;
	}

	button,
	input,
	optgroup,
	select,
	textarea {
		margin: 0;
		font: inherit;
		color: inherit;
		outline: none;
	}

	li {
		list-style: none;
	}

	a {
		color: #666;
	}

	.clearfix::after {
		clear: both;
		content: ".";
		display: block;
		height: 0;
		visibility: hidden;
	}

	::-webkit-scrollbar {
		display: none;
	}
</style>