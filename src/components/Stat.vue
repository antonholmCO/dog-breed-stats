<script setup>
    import { ref, onMounted } from 'vue'
    import Chart from 'chart.js/auto'

    const statChart = ref(null)

    const props = defineProps(["attribute", "value", "positive"]);

    let value = props.value;

    let gray = "#e5e7eb";
    let red = "#ef4444";
    let yellow = "#fcd34d";
    let softGreen = "#bef264";
    let mediumGreen = "#a3e635"
    let fullGreen = "#22c55e";

    let colors = [
        red,
        yellow,
        softGreen,
        mediumGreen,
        fullGreen
    ];

    for (let i = (colors.length); i >= value; i--) {
        colors[i] = gray;
    }

    onMounted(() => {
      new Chart(statChart.value, {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [1, 1, 1, 1, 1]
                }
            ]
        },
        options: {
            backgroundColor: colors,
            cutout: 62,
            spacing: 3
        },
      })
    })



</script>

<template>
    <div class="stat flex flex-col max-w-xs mx-auto w-44">
        <span class="stat-title mx-auto text-lg text-stone-900">{{ props.attribute }}</span>
        <div class="stat-value mx-auto text-stone-900">{{ props.value }}/5</div>
        <canvas ref="statChart" class=""></canvas>
    </div>
</template>

<style>
</style>
