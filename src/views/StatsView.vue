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

    <div v-else class="m-10 lg:p-2 lg:my-10 lg:max-w-screen-lg lg:mx-auto">
        <div id="result-card" class="flex flex-col rounded bg-emerald-500 lg:flex-row lg:shadow-md">
            <img id="result-img" :src="dogInfo.image_link" alt="" class="rounded-t lg:max-h-[400px] lg:rounded-none lg:rounded-l"/>
            <div id="result-text" class="bg-emerald-500 flex flex-col items-center pt-4 pb-8 px-8 rounded-b lg:items-start lg:w-full lg:my-10 lg:mx-6">
                <h1 class="bg-emerald-500 text-stone-50 text-2xl lg:text-left">{{ dogInfo.name }}</h1>
                <p class="bg-emerald-500 text-stone-50 text-sm sm:text-base mt-2 text-center lg:text-left lg:mt-1">Below you can find comprehensive information about the {{ dogInfo.name }}. Please note that while we strive to provide accurate and up-to-date information, dogs can vary individually, and it's always essential to consult with professionals, such as veterinarians or breeders, when making specific decisions related to the {{ dogInfo.name }}.</p>
            </div>
        </div>
        
        <section id="statistics-section" class="mt-12 flex flex-col lg:mt-20" >
            <h2 class="mx-auto text-center text-2xl text-emerald-500 md:text-3xl"><span>{{ dogInfo.name }}</span> Statistics</h2>
            <h3 class="mx-auto text-center text-2xl text-emerald-500 md:text-1xl mt-8 md:mt-10">Desired attributes</h3>
            <div id="statistics" class="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
                <Stat attribute="Trainability" :value="dogInfo.trainability" />
                <Stat attribute="Protectiveness" :value="dogInfo.protectiveness" />
                <Stat attribute="Playfulness" :value="dogInfo.playfulness" />
                <Stat attribute="Good with children" :value="dogInfo.good_with_children" />
                <Stat attribute="Good with other dogs" :value="dogInfo.good_with_other_dogs" />
                <Stat attribute="Good with strangers" :value="dogInfo.good_with_strangers" />
            </div>
        </section>

        <section id="statistics-section" class="mt-12 flex flex-col lg:mt-20" >
            <h3 class="mx-auto text-center text-2xl text-emerald-500 md:text-1xl mt-8 md:mt-10">Undesired attributes</h3>
            <div id="statistics" class="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
                <Stat attribute="Barking" :value="dogInfo.barking" />
                <Stat attribute="Drooling" :value="dogInfo.drooling" />
                <Stat attribute="Shedding" :value="dogInfo.shedding" />
                <Stat attribute="Grooming" :value="dogInfo.grooming" />
                <Stat attribute="Energy" :value="dogInfo.energy" />
            </div>
        </section>
        <RouterLink to="/">Go back ></RouterLink>   <!-- change to button and do push instead -->
    </div>
</template>

<style>
</style>
