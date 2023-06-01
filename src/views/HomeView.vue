<script setup>
import { ref } from "vue";
import axios from "axios";
import apikey from "../apikey";
import router from "../router/index"

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
    <h1>DogBreedPicker</h1>
    <h2>Information about your dog breed</h2>
    <form>
        <input v-model="userInput" id="search-field" />
        <button id="search-button" @click="getDogBreed">Search</button>
    </form>
</template>

<style>
</style>