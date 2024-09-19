import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacie", () => {

  it("devrait diminuer le benefit et expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("devrait dégrader le benefit de Dafalgan deux fois plus vite que les autres médicaments", () => {
    const pharmacie = new Pharmacy([new Drug("Dafalgan", 10, 20)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(18); 
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(9);
  });

  it("devrait dégrader le benefit de Dafalgan deux fois plus vite après expiration", () => {
    const pharmacie = new Pharmacy([new Drug("Dafalgan", 0, 10)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(6); 
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(-1);
  });

  it("devrait s'assurer que le benefit ne devient jamais négatif", () => {
    const pharmacie = new Pharmacy([new Drug("Dafalgan", 10, 1)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(0); 
  });

  it("devrait s'assurer que le benefit ne dépasse jamais 50", () => {
    const pharmacie = new Pharmacy([new Drug("Fervex", 5, 49)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toBeLessThanOrEqual(50);
  });

  it("devrait augmenter le benefit de Fervex à mesure que la date d'expiration approche", () => {
    const pharmacie = new Pharmacy([new Drug("Fervex", 10, 45)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(47); 
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(9); 
  });

  it("devrait augmenter le benefit de Herbal Tea après expiration", () => {
    const pharmacie = new Pharmacy([new Drug("Herbal Tea", 0, 10)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(12); 
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(-1); 
  });

  it("ne devrait pas changer le benefit ou expiresIn de Magic Pill", () => {
    const pharmacie = new Pharmacy([new Drug("Magic Pill", 10, 40)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(40); 
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(10); 
  });
});
