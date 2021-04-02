import { html } from '../../node_modules/lit-html/lit-html.js'
import { getUserListings } from '../api/data.js';
import { listingTemplate } from '../views/common/listing.js';

const myListingsTemplate = (data) => html`<section id="my-listings">
<h1>My car listings</h1>
<div class="listings">
${data.length == 0 
        ? html`<p class="no-cars"> You haven't listed any cars yet.</p>` 
        : data.map(listingTemplate)}
</div>
</section>`;

export async function myListingSPage(ctx){
    const userId = sessionStorage.getItem('userId');
    const data = await getUserListings(userId);
    ctx.render(myListingsTemplate(data));
}