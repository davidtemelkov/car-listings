import { html } from '../../node_modules/lit-html/lit-html.js'
import { getListingsByYear } from '../api/data.js';
import { listingTemplate } from '../views/common/listing.js';

const searchTemplate = (data, onClick, year) => html`<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value="${year || ''}">
        <button @click="${onClick}" class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${data.length == 0 
        ? html` <p class="no-cars"> No results.</p>` 
        : data.map(listingTemplate)}
        
    </div>
</section>`;

export async function searchPage(ctx) {
    const year = Number(ctx.querystring.split('=')[1]);
    const data = Number.isNaN(year) ? [] : await getListingsByYear(year);

    ctx.render(searchTemplate(data,onClick, year));
    
    async function onClick() {
        const query = Number(document.querySelector('input').value);

        ctx.page.redirect('/search?query=' + query);
    }
}