<template>
    <!-- Team-->
    <section class="page-section bg-light" id="team">
        <div class="container">
            <div class="comics">
                <div class="row">
                    <div class="col-md-4" v-for="comic in comics" :key="comic.id">
                        <div class="team-member">
                            <a :href="comic.urls[0].url" target="_blank">
                                <img class="img-fluid" :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                                    alt="Comic Thumbnail" />
                            </a>
                            <div class="comic-details" @mouseover="showDetails(comic.id)"
                                @mouseleave="hideDetails(comic.id)">
                                <h4 v-if="hoveredComic === comic.id">{{ comic.title }}</h4>
                                <p v-if="hoveredComic === comic.id" class="text-muted descripcion">{{ comic.description
                                    }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            comics: [],
            title: "",
            hoveredComic: null
        };
    },
    mounted() {
        // Llama a una función para cargar los cómics cuando el componente se monte
        this.fetchComics();
    },
    methods: {
        async fetchComics() {
            try {
                const response = await axios.get('https://gateway.marvel.com/v1/public/series', {
                    params: {
                        apikey: '776d27f4503f9642f702889fb1cb6be0',
                        ts: '1',
                        hash: '1d6f981361d6726e532b2ba8524bb31c',
                        startYear: '2024',
                        limit: '5'
                    }
                });
                this.comics = response.data.data.results;
            } catch (error) {
                console.error('Error al obtener los cómics:', error);
            }
            console.log(this.comics);
        },

        cutDescripcion(descripcion) {
            if (descripcion && descripcion.length > 100) {
                return descripcion.slice(0, 100) + '...'
            }
            return descripcion;
        },

        showDetalles(comicId) {
            this.hoveredComic = comicId;
        },

        hideDetails(comicId) {
            this.hoveredComic = null;
        }
    }
}
</script>

<style>
.img-responsive {
    max-width: 100%;
    height: auto;
    max-height: 700px;
}

.team-member {
    position: relative;
    overflow: hidden;
}

img.img-fluid {
    max-width: 100%;
    height: auto;
    transition: transform 0.3s ease-in-out;
}

.comic-details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.team-member:hover .comic-details {
    opacity: 1;
}
</style>