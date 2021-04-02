import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllListings } from '../api/data.js';
import { listingTemplate } from '../views/common/listing.js';

const catalogTemplate = (data) => html`<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${data.length == 0 
        ? html`<p class="no-cars">No cars in database.</p>` 
        : data.map(listingTemplate)}
    </div>
</section>`;

export async function catalogPage(ctx) {
    const data = await getAllListings();
    ctx.render(catalogTemplate(data));
}