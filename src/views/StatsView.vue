<script setup>
    import { ref } from "vue";
    import { useRoute, useRouter } from 'vue-router'
    import axios from "axios"
    import apikey from "../apikey";
    import Stat from "../components/Stat.vue"

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
        <div id="result-card" class="fle flex-col m-4 rounded bg-red-500">
            <img id="result-img" :src="dogInfo.image_link" alt="" class="rounded"/>
            <div id="result-text" class="bg-green-500">
                <h1>{{ dogBreed }}</h1>
                <p>[general description]</p>
            </div>
        </div>
        
        <section id="statistics-section">
            <h2><span>{{ dogBreed }}</span> Statistics</h2>
            
            <div id="statistics">
                <Stat attribute="Protectiveness" :value="dogInfo.protectiveness" />
                <Stat attribute="Good with Children" :value="dogInfo.good_with_children" />
            </div>
        </section>
        <RouterLink to="/">Home</RouterLink>
    </div>
</template>

<style>
</style>
