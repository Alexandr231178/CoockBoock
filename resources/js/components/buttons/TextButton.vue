<script setup></script>

<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
    border: none;
    border-radius: 10px;
    background: #05f11a;
    padding: 8px 20px;
    font-size: 24px;
    line-height: 36px;
    font-weight: 400;
    color: #a6c4e8;
    cursor: pointer;
}

.button:hover {
    background: #0a65e4;
}
</style>
