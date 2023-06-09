@buscar
Feature: Buscar en Google

  Como usuario
  Quiero poder realizar búsquedas en Google
  Para encontrar información relevante

@obtener-infomacion @smoke
Scenario: Encontrar información relevante en una búsqueda
Given estoy en la página de inicio de Google
When  ingreso "automatización" en el campo de búsqueda
And selecciono un resultado de la búsqueda
Then resultado esperado


