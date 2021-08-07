<template>
	<div id="app">
		<div>
			<router-link to="/">index</router-link>
			<router-link to="/about">about</router-link>
			<router-link to="/login">login</router-link>
			<router-link to="/logout">logout</router-link>
		</div>
		<router-view/>
	</div>
</template>

<script>
export default {
  name: 'app-1'
}
</script>

<style>

</style>
