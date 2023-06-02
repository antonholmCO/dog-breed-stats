<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter(); 
    const props = defineProps(["text", "path"])

    function goToHome() {
        router.push({ path: props.path});
    }
</script>

<template>
    <button @click="goToHome" class="inline-flex items-center cursor-pointer rounded border-2 border-emerald-500 bg-transparent px-8 py-3 text-sm font-medium text-emerald-500 hover:text-stone-50 transition-colors hover:bg-emerald-500 hover:border-emerald-500 active:bg-emerald-700">{{ props.text }} &#8250;&#8250;&#8250;</button>
</template>

<style scoped>
</style>