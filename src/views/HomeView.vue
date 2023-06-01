<script setup>
import { ref } from "vue";
import axios from "axios";
import apikey from "../apikey";
import { useRouter } from 'vue-router';
const router = useRouter(); 

const userInput = ref("");

function getDogBreed(e) {
    e.preventDefault();
    queryApi(userInput.value);
}

function queryApi(dogBreed) {
    axios({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/dogs?name=" + dogBreed,
        headers: {"X-Api-Key": apikey},
        contentType: "application/json"
    })
    .then(function (response) {
        let breed = response.data[0].name;
        router.push({ name: 'stats', params: {breed: breed}})
    })
    .catch(function(error) {
        alert("not a dog breed");
    });
}

</script>

<template>
    <section class="flex justify-center">
        <div class="container relative top-44 flex flex-col items-center">
            <h1 class="text-4xl">Dog Breed Picker</h1>
            <h2 class="text-md mt-1">Information about your dog breed</h2>
            <form class="relative top-10 w-4/6 flex flex-col">
                <input v-model="userInput" id="search-field" placeholder="Enter a dog breed" class="mx-auto w-full max-w-xl px-4 py-2 rounded-md border border-emerald-500 shadow-md text-lg" />
                <button id="search-button" @click="getDogBreed" class="mt-6 mx-auto px-6 py-1.5 border rounded-md  bg-emerald-500 text-stone-50 hover:bg-emerald-600 active:bg-emerald-900 ">Search</button>
            </form>
        </div>
    </section>
</template>

<style>
</style>