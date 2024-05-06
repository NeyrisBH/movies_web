<template>
    <section>
        <div class="btn-group">
            <button class="btn" :class="{ 'btn-primary': selectedComponent === 'Comics',
                'btn-secondary': selectedComponent !== 'Comics' }" @click="selectedComponent = 'Comics'">Comics</button>
            <button class="btn" :class="{ 'btn-primary': selectedComponent === 'Series',
                'btn-secondary': selectedComponent !== 'Series' }" @click="selectedComponent = 'Series'">Series</button>
            <button class="btn" :class="{ 'btn-primary': selectedComponent === 'Eventos',
                'btn-secondary': selectedComponent !== 'Eventos' }" @click="selectedComponent = 'Eventos'">Eventos</button>
            <button class="btn" :class="{ 'btn-primary': selectedComponent === 'Creadores',
                'btn-secondary': selectedComponent !== 'Creadores' }" @click="selectedComponent = 'Creadores'">Creadores</button>
        </div>
        <div v-if="loading" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
        <component :is="selectedComponent" v-else/>
    </section>
</template>
  
<script>
import Comics from './Comics.vue';
import Creadores from './Credores.vue';
import Eventos from './Eventos.vue';
import Series from './Series.vue';
  
    export default {
        data() {
            return {
                selectedComponent: 'Comics',
                loading: true
            };
        },
        components: {
            Comics,
            Series,
            Eventos,
            Creadores
        },
        mounted() {
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        }
    };
</script>

<style>
    .btn-group {
        margin: 10% 3% 0 3%
    }

    .btn-primary {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }

    .btn-secondary {
        color: #333;
        background-color: #ccc;
        border-color: #ccc;
    }
</style>
