<template>
    <section class="page-section bg-light" id="team">
        <h2>Series más recientes</h2>
        <form @submit.prevent="fetchSeriesForTitle" class="d-flex" role="search">
            <input v-model="inputTitle" class="form-control me-2" type="search" placeholder="Titulo inicia con..."
                aria-label="Search" style="margin-right: 8px;">
        </form>
        <div v-if="loading" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-3" v-else>
            <div class="col-md-4" v-for="(serie, index) in visibleSeries" :key="serie.id">
                <div class="card mb-3">
                    <a :href="serie.urls[0].url" target="_blank">
                        <div class="card-body p-0">
                            <div class="team-member position-relative overflow-hidden">
                                <img alt="Avatar" class="card-img-top" :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"/>
                                <div class="overlay">
                                    <h4 class="text-white card-title position-absolute top-0 start-50 translate-middle-x">{{ serie.title }}</h4>
                                    <p class="text-white card-text position-absolute bottom-0 start-50 translate-middle-x">{{ cutDescripcion(serie.description) }}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div v-if="hasMore">
            <button @click="loadMore" class="btn btn-primary mt-3">Cargar más</button>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            series: [],
            visibleSeries: [],
            loading: true,
            pageSize: 12,
            currentPage: 1,
            inputTitle: ''
        };
    },
    computed: {
        hasMore() {
            return this.visibleSeries.length < this.series.length;
        }
    },
    mounted() {
        // Llama a una función para cargar las series cuando el componente se monte
        this.fetchSeries();
    },
    methods: {
        async fetchSeries() {
            try {
                const response = await axios.get('https://gateway.marvel.com/v1/public/series', {
                    params: {
                        apikey: '776d27f4503f9642f702889fb1cb6be0',
                        ts: '1',
                        hash: '1d6f981361d6726e532b2ba8524bb31c',
                        startYear: '2024',
                        limit: '100',
                        orderBy: '-modified'
                    }
                });
                this.series = response.data.data.results.filter(serie => {
                    return serie.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
                });
                this.loading = false;
                this.updateVisibleSeries();
            } catch (error) {
                console.error('Error al obtener las series:', error);
            }
        },
        cutDescripcion(descripcion) {
            if (descripcion && descripcion.length > 100) {
                return descripcion.slice(0, 100) + '...'
            }
            return descripcion;
        },
        async fetchSeriesForTitle() {
            try {
                if (this.inputTitle.trim() === '') {
                    await this.fetchSeries();
                } else {
                    const response = await axios.get('https://gateway.marvel.com/v1/public/series', {
                        params: {
                            apikey: '776d27f4503f9642f702889fb1cb6be0',
                            ts: '1',
                            hash: '1d6f981361d6726e532b2ba8524bb31c',
                            startYear: '2024',
                            limit: '100',
                            orderBy: '-modified',
                            titleStartsWith: this.inputTitle
                        }
                    });
                    this.series = response.data.data.results.filter(serie => {
                        return serie.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
                    });
                    this.updateVisibleSeries();
                    this.loading = false;
                }
            } catch (error) {
                console.error('Error al obtener los cómics:', error);
            }
        },
        loadMore() {
            this.currentPage++;
            this.updateVisibleSeries();
        },
        updateVisibleSeries() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            this.visibleSeries = this.series.slice(0, end);
        }
    }
};
</script>

<style>
    .page-section {
        margin-top: 50px;
        margin-right: 10%;
        margin-left: 10%;
        margin-bottom: 50px;
        padding: 1%
    }

    .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        overflow: hidden;
        width: 100%;
        height: 100%;
        transition: 0.3s ease;
        opacity: 0;
        padding: 20px;
    }

    .team-member:hover .overlay {
        opacity: 1;
    }

    .overlay h4,
    .overlay p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 100%;
        margin-bottom: 0;
        padding: 20px
    }

    .card-img-top {
        transition: transform 0.3s ease;
        width: 100%;
        height: auto;
        aspect-ratio: 4/5;
    }

    .team-member:hover .card-img-top {
        transform: scale(1.05);
    }


    @media (min-width: 576px) {
        .row-cols-lg-3 > .col-md-4 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        .card-title, .card-text {
            font-size: 16px;
        }

        .card-title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20%;
        }
    }

    @media (min-width: 900px) {
        .row-cols-lg-3 > .col-md-4 {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
        }

        .card-text {
            font-size: 14px;
            padding: 5px;
        }

        .card-title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20%;
        }
    }
</style>
