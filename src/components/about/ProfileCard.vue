<template>
<div
    class="group max-w-xs w-full h-auto p-6 rounded-xl bg-accentDark backdrop-blur-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-bgMedium animate-fade-in-up"
>
    <img
    :src="imageSrc"
    :alt="name"
    class="w-28 h-28 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
    />
    <h2
    class="text-2xl font-semibold text-bgLight mb-2 group-hover:text-textDark transition-colors duration-300"
    >
    {{ name }}
    </h2>
    <p
    class="text-bgLight/80 group-hover:text-textDark transition-colors duration-300"
    >
    {{ description }}
    </p>
</div>
</template>

<script>
export default {
name: "ProfileCard",
props: {
    name: {
    type: String,
    required: true,
    },
    imageSrc: {
    type: String,
    required: true,
    },
    description: {
    type: String,
    required: true,
    },
},
};
</script>

<style scoped>
/* Optional: Add any additional styles here */
</style>
