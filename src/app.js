import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'

import { logout as apiLogout } from './api/data.js';

import { homePage } from './views/home.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myListingSPage } from './views/myListings.js';
import { searchPage } from './views/search.js';

const main = document.getElementById('site-content');

page('/', decorateContext, guestUsersOnly, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/catalog', decorateContext, catalogPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/my-listings', decorateContext, myListingSPage);
page('/search', decorateContext, searchPage);


document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/');
});

setUserNav();

//Application starts

page.start();

function guestUsersOnly(ctx, next) {
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        return ctx.page.redirect('/catalog');
    } else {
        next();
    }
}

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');

    if (userId != null) {
        document.getElementById('welcome').textContent = `Welcome, ${username}`;
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'inline-block';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('profile').style.display = 'none';
    }
}

async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
}