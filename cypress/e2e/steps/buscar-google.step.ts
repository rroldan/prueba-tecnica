import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import GooglePage from './src/pages/google-page.cy'

const browser = new GooglePage();

Given('estoy en la página de inicio de Google', () => {
  browser.load();
});

When('ingreso {string} en el campo de búsqueda', (title: string) => {
  browser.fillSearch(title)
});

When('selecciono un resultado de la búsqueda',() => {
  browser.select();
});

Then('resultado esperado',() => {
  browser.verify();
});
