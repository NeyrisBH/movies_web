<template>
    <nav class="navbar fixed-top navbar-expand-lg">
        <div class="container-fluid">
            <a>
                <RouterLink to="/" class="navbar-brand">
                    <img src="../assets/images/logo.png" alt="">
                </RouterLink>
            </a>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
                <button class="btn btn-outline-success me-2" type="submit">Buscar</button>
                <RouterLink to="/series" class="btn btn-sm btn-outline-secondary" type="button">Series
                </RouterLink>
            </form>
        </div>
    </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
}
</script>

<style scoped>
.navbar {
    background-color: #ffffff;
    max-height: 80px;
    font-weight: 500;
    font-size: medium;
}

.navbar-brand img {
    max-width: 90px;
    margin-left: 40px;
}
</style>