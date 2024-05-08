<template>
    <nav class="navbar fixed-top navbar-expand-lg">
        <div class="container-fluid d-flex justify-content-center align-items-center">
            <a class="icon-header">
                <RouterLink to="/" class="navbar-brand">
                    <img src="../assets/images/logo.png" alt="">
                </RouterLink>
            </a>
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
    background-color: #e4e4e4;
    max-height: 80px;
    font-weight: 500;
    font-size: medium;
}

.navbar-brand img {
    max-width: 150px;
    max-height: 70px;
}

.container-fluid{
    margin: 0;
}
</style>
