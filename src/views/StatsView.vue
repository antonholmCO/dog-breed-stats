<script setup>
    import { useRoute } from 'vue-router'
    import router from "../router/index"
    import axios from "axios"
    import apikey from "../apikey";
    
    const route = useRoute()
    const props = defineProps(["breed"]);
    
    let dogBreed = route.params.breed;
    
    axios({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/dogs?name=" + dogBreed,
        headers: {"X-Api-Key": apikey},
        contentType: "application/json"
    })
    .then(function (response) {
        console.log(response.data[0]);
    })
    .catch(function(error) {
        router.push({ name: 'home'})
    });

</script>

<template>
    <div id="result-card">
        <img id="result-img" src="https://api-ninjas.com/images/dogs/french_bulldog.jpg" alt="" />
        <div id="result-text">
            <h1>{{ dogBreed }}</h1>
            <p>[general description]</p>
        </div>
    </div>
    
    <section id="statistics-section">
        <h2><span>{{ dogBreed }}</span> Statistics</h2>
        
        <div id="statistics">
            <div class="stat">
                <span class="stat-title">Barking</span>
                <div class="stat-value">1/5</div>
            </div>
            <div class="stat">
                <span class="stat-title">Energy</span>
                <div class="stat-value">3/5</div>
            </div>
        </div>
        
    </section>
</template>

<style>
</style>
