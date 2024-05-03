<template>
    <div id="app">
        <Header/>
        <div>
            <RouterView />
        </div>
        <Footer/>
    </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

setInterval(()=> {

},600000)

export default {
    name: 'App',
    components: {
    Header,
    Footer
},
    data() {
        return {
            titulo: 'MoviesSmart.com',
        }

    },
}

</script>

<style scoped>
.row {
    margin: 0;
    padding: 0;
}
</style>