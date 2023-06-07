export default class GooglePage {
    private url = 'https://google.com/';
    private acceptButton = '#L2AGLb';
    private inputSearch = '#APjFqb';

    load(): void {
        cy.visit(this.url);
        this.dialogAccept();
        cy.get('body').should('be.visible')
      }

    dialogAccept(): void {
        cy.get(this.acceptButton).click();
    }

    fillSearch(text:string): void {
        cy.get('input[name="q"]').type(`${text}`+"{enter}");
      } 

    select() {
        cy.get('#search div').contains('wikipedia.org').first().invoke('attr', 'href')
          .then((href) => {
            cy.visit(href);
          });
      }

      verify() {
        cy.origin('es.wikipedia.org', () => {
          cy.contains('1785').screenshot();
        });
      }
    }
