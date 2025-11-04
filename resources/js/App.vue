<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style scoped>
    .app {
        display: flex;
        justify-content: center;
        background-color: #a6c4e8;
        height: 100vh;
        width: 100vw;
    }
</style>
