<script>
    import config from '$lib/stores/config.json';
    let { data } = $props();
</script>

<div class="center">
    <div class="title">Welcome to {config["ysws-name"]}'s Shop</div>
    <p class="subtitle">{config["ysws-description"]}</p>
    {#if data.user}
        <a href="{config['url-base']}/shop"><button class="login-button">Go to Shop</button></a>
    {:else}
    <a href="/api/login"><button class="login-button">Login</button></a>
    {/if}
</div>

