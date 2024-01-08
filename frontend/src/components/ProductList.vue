<script setup lang="ts">
import { ref, toRef, watch } from 'vue';
import { Category, EventWFile, Product } from '../lib/types';
import { backend } from '../lib/backend';
import { imgResizeUpload } from '../lib/imgResizeUpload'
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '../stores/categories';

const props = defineProps<{ category: Category }>()
const category = toRef(props, "category")
const catstore = useCategoryStore()
const { cats: categories } = storeToRefs(catstore)
const products = ref<Product[]>([])
const productSelected = ref<Product>()
const productImageElementRef = ref<HTMLImageElement | null>(null)
const deleteDialog = ref<HTMLDialogElement>()

const newProduct: Product = {
    id: 0,
    name: "Name",
    category_id: category.value.id,
    picture: "",
    created_at: new Date(),
    updated_at: new Date()

}
watch(props, (newProps: typeof props) => {
    category.value = newProps.category
    resetPage()
})
function resetPage() {
    backend.categories.products(category.value.id).then(ps => products.value = ps)
    productSelected.value = undefined
}
function selectProduct(id: number) {
    backend.products.getOne(id).then(p => productSelected.value = p)
}
function updateImage(e: Event) {
    if (productImageElementRef.value)
        productImageElementRef.value.src = URL.createObjectURL((e as EventWFile).target.files[0])
}
async function fileUpload(id: number) {
    if (productImageElementRef.value) {
        let result = await imgResizeUpload(productImageElementRef.value, "/api/fileupload/product/" + id, 3200)
        productSelected.value = { ...newProduct, ...productSelected.value, picture: result.picture }
    }

}
async function ProductSave() {
    if (productSelected.value?.id) {
        await backend.products.update(productSelected.value.id, productSelected.value)
    } else {
        if (productSelected.value)
            await backend.products.create(productSelected.value)
    }
    resetPage()
}
async function deleteDialogResult() {
    console.log(deleteDialog?.value?.returnValue, productSelected.value?.id)
    if ((deleteDialog?.value?.returnValue == "really") && productSelected.value?.id) {
        await backend.products.delete(productSelected.value.id)
        resetPage()
    }
}
</script>
<template>
    <div class="ProductList">
        <h2>Products of {{ category.name }} </h2>
        <div class="flex">
            <a v-for="product in products" @click="() => selectProduct(product.id)">{{ product.name }}</a>
            <a @click="() => { productSelected = newProduct }">New Product</a>
        </div>
        <div v-if="productSelected" class="ProductEdit">
            <h3>{{ productSelected.name }}</h3>
            <div class="flex">
                <div>
                    {{ catstore.getParents(productSelected.category_id).map(cat => cat.name).join(' > ') }}
                </div>
                <div>
                    {{ catstore.getChildren(productSelected.category_id).map(cat => cat.name).join(' | ') }}
                </div>
            </div>
            <div v-if="productSelected.id">
                <div class="PicturePlace">
                    <img :src="productSelected.picture || 'https://unsplash.com/photos/IFxjDdqK_0U/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8c2hvY2tlZCUyMGNhdHxlbnwwfHx8fDE3MDQ0ODM0NjR8MA&force=true&w=240'"
                        ref="productImageElementRef" />
                </div>
                <input type="file" accept="image/png, image/jpeg, image/webp, image/jpg" @change="updateImage" />
                <input type="button" @click="() => fileUpload(productSelected?.id || 0)" value="Upload" />
            </div>
            <form @submit.prevent="ProductSave">
                <input type="hidden" name="id" v-model="productSelected.id" />
                <div> <label>Name</label> <input v-model="productSelected.name" name="name" /></div>
                <div>
                    <label>Category</label>
                    <select v-model="productSelected.category_id" name="category_id">
                        <option v-for="cat in categories" :value=cat.id>{{ cat.name }}</option>
                    </select>
                </div>
                <div> <label> </label><input type="submit" /></div>
                <div> <input type="button" @click="() => console.log(deleteDialog?.showModal())" value="X" /> </div>
            </form>
            <dialog @close="deleteDialogResult" ref="deleteDialog">
                <div class="flex column">
                    <div> Are you ready to risk fragging up this {{ productSelected.name }}, a masterpiece pulsating with
                        the binary beats
                        of a cybernetic future?

                        Calculate the consequences of your move, and don't let the malware of destruction corrupt what's
                        been synthetically crafted and unleashed upon this reality. In the cybernetic realm, where circuits
                        hum with electric dreams and feline code rules, think twice before you trigger the crash sequence,
                        unless you crave the scorn of a cyberpunk cat with a glitchy attitude.</div>
                    <div>
                        <button @click="() => deleteDialog?.close('really')">Really Delete</button>
                        <button @click="() => deleteDialog?.close('')">Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    </div>
</template>