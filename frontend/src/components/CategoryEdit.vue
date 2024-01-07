<script setup lang="ts">
import {   ref, toRef, watch } from 'vue';
import { Category } from '../lib/types';
import { backend } from '../lib/backend';
import { useCategoryStore } from '../stores/categories';
import { storeToRefs } from 'pinia';

const props = defineProps<{ category: Category, categories: Category[] }>()

const catstore = useCategoryStore()
const {cats:categories} = storeToRefs(catstore)
const { category } = props
const catEditable = toRef(props, "category")
const id = ref(category.id)
const name = ref(category.name)
const parent_id = ref(category.parent_id)

watch(catEditable, (catNew:Category ) => {
    name.value = catNew.name
    parent_id.value = catNew.parent_id
    id.value = catNew.id 
}  )
function submit( ) { 
    console.log("datas", { name: name.value, parent_id: parent_id.value })
    if (id.value) {
        backend.categories.update(id.value, { name: name.value, parent_id: parent_id.value })
    } else {
        backend.categories.create({ name: name.value, parent_id: parent_id.value })
    }
}
</script>
<template>
    <div class="CategoryEdit">
    <h2>Category : {{ catEditable.name }}</h2>
    <div class="PicturePlace">
    <img :src=" catEditable.picture || 'https://unsplash.com/photos/IFxjDdqK_0U/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8c2hvY2tlZCUyMGNhdHxlbnwwfHx8fDE3MDQ0ODM0NjR8MA&force=true&w=240'"    /></div>
    <form @submit.prevent="submit" >
        <input type="hidden" name="id" v-model="id" />
        <div > <label>Name</label> <input v-model="name" name="name" /></div>
        <div > <label>Parent</label> <select v-model="parent_id" name="parent_id" >
            <option v-for="cat in categories" :value=cat.id >{{ cat.name }}</option>
            </select>
        </div>
        <div> <label> </label><input type="submit"  /></div>
    </form>
</div>
</template>