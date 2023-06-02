<script setup>
    import { ref, onMounted } from 'vue'
    import Chart from 'chart.js/auto'
    const statChart = ref(null)
    const props = defineProps(["attribute", "value", "positive"]);

    let value = props.value;

    let grayUnfilled = "#e5e7eb";
    let greenWeak = "#22c55e";
    let greenStrong = "#16a34a"
    let yellow = "#fbbf24";    
    let redWeak = "#ef4444";
    let redStrong = "#dc2626";

    let colors = [
        grayUnfilled,
        grayUnfilled,
        grayUnfilled,
        grayUnfilled,
        grayUnfilled
    ];

    let color = null;

    if (props.positive == true) {
        switch(value) {
            case 1:
                color = redStrong;
                break;
            case 2:
                color = redWeak;
                break;
            case 3:
                color = yellow;
                break;
            case 4:
                color = greenWeak;
                break;
            case 5:
                color = greenStrong;
                break;
            default:
                color = grayUnfilled;
        }
    } else {
        switch(value) {
            case 1:
                color = greenStrong;
                break;
            case 2:
                color = greenWeak;
                break;
            case 3:
                color = yellow;
                break;
            case 4:
                color = redWeak;
                break;
            case 5:
                color = redStrong;
                break;
            default:
                color = grayUnfilled;
        }
    }
    
    for (let i = 0; i < value; i++) {
        colors[i] = color;
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
