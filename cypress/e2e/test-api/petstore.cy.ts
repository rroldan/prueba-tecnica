
describe('test api petstore', () => {
    before(() => {
    cy.fixture('users').then((user) => {
        this.user = user
      })
    })

    after(() => {
        cy.request({
            method: 'DELETE', 
            url: `/user/${this.user.username}`
          }).then((response) => {
            expect(response.status).to.equal(200);
        })
    })

    it('debería crear nuevo usuario', () => {
        cy.request({
            method: 'POST', 
            url: '/user', 
            body: this.user
          }).then((response) => {
            expect(response.status).to.equal(200); 
          })
    });

    it('debería obtener información de un usuario', () => {
        cy.request('GET', `/user/${this.user.username}`).then((response) => {
            expect(response.body).to.deep.equal(this.user);
            Object.entries(this.user).forEach(([key, value]) => {
                cy.log(key, value)
              })
          });
    });

    it('debería obtener la información de las mascotas que se han vendido', () => {
        cy.request('GET', `/pet/findByStatus?status=sold`).then((response) => {
          expect(response.status).to.equal(200);
          const result = response.body.map((data) => {
            return {
              'id':data.id,
              'name':data.name
            }
          });
          const categories = result.reduce((categories, post) => categories.set(post.name, (categories.get(post.name) ?? 0) + 1), new Map<string, number>());
            categories.forEach((count, category) => 
            count > 1 ? cy.log(`${category} (count: ${count})`): null);
        });
      });
 });

 class EqualCount {
    protected list: { id: number, name: string }[] ;
    
    constructor(list: { id: number, name: string }[] ) {
      this.list = list;
    }

    public equalCountList() {
        return this.list.reduce((names, data) => 
        names.set(data.name, (names.get(data.name) ?? 0) + 1), new Map<string, number>());    
    }
}