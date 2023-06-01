<script setup>
    import { ref } from "vue";
    import { useRoute, useRouter } from 'vue-router'
    import axios from "axios"
    import apikey from "../apikey";

    const props = defineProps(["breedName"])
    const router = useRouter();
    const route = useRoute();
    
    let loadingPage = ref(true);
    let dogInfo = ref({});
    let dogDataStr = history.state.dogDataStr;
    let dogBreed = route.params.breedName;

    if (dogDataStr == null) {
        axios({
            method: "GET",
            url: "https://api.api-ninjas.com/v1/dogs?name=" + dogBreed,
            headers: {"X-Api-Key": apikey},
            contentType: "application/json"
        })
        .then(function (response) {
            if (response.data.length == 0) {
                throw new Error("No response, faulty dog breed");
            }

            dogInfo.value = response.data[0];
            loadingPage.value = false;
        })
        .catch(function(error) {
            console.log("erorrrrr")
            router.push({ name: 'home'})
        });
        
    } else {
        let dogData = JSON.parse(dogDataStr);
        dogInfo.value = dogData;
        loadingPage.value = false;
    }




</script>

<template>
    <div v-if="loadingPage">
        <h1>LOADING</h1>
    </div>

    <div v-else>
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
                    <div class="stat-value">{{ dogInfo.barking }}</div>
                </div>
                <div class="stat">
                    <span class="stat-title">Energy</span>
                    <div class="stat-value">1/5</div>
                </div>
            </div>
        </section>
        <RouterLink to="/">Home</RouterLink>
    </div>
</template>

<style>
</style>
