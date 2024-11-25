<template>
    <section class="bg-gradient-to-br from-accentDark to-primaryDark py-16">
        <div class="container mx-auto px-4">
            <Card class="shadow-lg border-round-xl max-w-4xl mx-auto bg-bgLight">
                <template #content>
                    <div class="text-center p-6">
                        <h2 class="text-4xl font-bold text-accentDark mb-6">Ready to Transform Your Business?</h2>
                        <p class="text-xl text-textMedium mb-8">Start your journey towards data-driven success today.</p>
                        <div class="flex flex-wrap justify-center gap-4">
                            <RouterLink to="/signup">
                                <Button label="Get Started" icon="pi pi-rocket" severity="primary" size="large" raised />
                            </RouterLink>
                            <RouterLink to="/demo">
                                <Button label="Watch Demo" icon="pi pi-play" severity="secondary" size="large" outlined />
                            </RouterLink>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Button from 'primevue/button';
import Card from 'primevue/card';
</script>

<style scoped>
</style>