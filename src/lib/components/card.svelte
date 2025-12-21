<script>
    import config from '$lib/stores/config.json';
    
    export let item;
    export let data;

    async function handleBuy(item, data) {
        try {
            const response = await fetch('/shop/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item, data })
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Purchase successful:', result);
                alert('Purchase successful!');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error purchasing item:', error);
        }
    }
</script>
<div class="card" style="border-color: {config['secondary-theme-color']}; background-color: {config['background-color']};">
    <h2 style="color: {config['theme-color']};">{item.name}</h2>
    <div class="content">
        <p>{item.description || 'No description available'}</p>
        <p style="font-weight: bold;">Price: {config['tokens-symbol']}{item.price}</p>
    </div>
    <div class="actions">
        {#if item.price <= data.userTokens}
        <button  on:click={() => handleBuy(item, data)} style="background-color: {config['theme-color']}; color: {config['background-color']}; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
            Buy Now
        </button>
        {:else}
        <button disabled style="background-color: grey; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: not-allowed;">
            Insufficient Funds, missing {config['tokens-symbol']}{item.price - data.userTokens}
        </button>
        {/if}
    </div>
</div>
<style>
    .card {
        border: 2px solid;
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 1rem 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .content {
        margin: 1rem 0;
    }
    .actions {
        text-align: right;
    }
</style>
