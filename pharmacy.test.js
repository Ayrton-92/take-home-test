import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacie", () => {

  // Test de base pour vérifier que le benefit et expiresIn diminuent correctement
  it("devrait diminuer le benefit et expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  // Test pour Dafalgan: vérification de la dégradation avant expiration
  it("devrait dégrader le benefit de Dafalgan deux fois plus vite que les autres médicaments", () => {
    const pharmacie = new Pharmacy([new Drug("Dafalgan", 10, 20)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(18); // Dafalgan doit perdre 2 de benefit
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(9); // expiresIn doit diminuer de 1
  });

  // Test pour Dafalgan: dégradation après expiration
  it("devrait dégrader le benefit de Dafalgan deux fois plus vite après expiration", () => {
    const pharmacie = new Pharmacy([new Drug("Dafalgan", 0, 10)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(6); // Dafalgan doit perdre 4 de benefit
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(-1); // expiresIn doit diminuer de 1
  });

  // Test pour s'assurer que le benefit ne devient jamais négatif
  it("devrait s'assurer que le benefit ne devient jamais négatif", () => {
    const pharmacie = new Pharmacy([new Drug("Dafalgan", 10, 1)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(0); // Le benefit ne doit pas être inférieur à 0
  });

  // Test pour s'assurer que le benefit ne dépasse jamais 50 pour les médicaments normaux
  it("devrait s'assurer que le benefit ne dépasse jamais 50", () => {
    const pharmacie = new Pharmacy([new Drug("Fervex", 5, 49)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toBeLessThanOrEqual(50); // Le benefit ne doit pas dépasser 50
  });

  // Test pour Fervex: augmentation du benefit à l'approche de la date d'expiration
  it("devrait augmenter le benefit de Fervex à mesure que la date d'expiration approche", () => {
    const pharmacie = new Pharmacy([new Drug("Fervex", 10, 45)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(47); // Fervex doit augmenter de 2
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(9); // expiresIn doit diminuer de 1
  });

  // Test pour Herbal Tea: benefit doit augmenter même après expiration
  it("devrait augmenter le benefit de Herbal Tea après expiration", () => {
    const pharmacie = new Pharmacy([new Drug("Herbal Tea", 0, 10)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(12); // Herbal Tea doit augmenter de 2 après expiration
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(-1); // expiresIn doit diminuer de 1
  });

  // Test pour Magic Pill: s'assurer que ni le benefit ni expiresIn ne changent
  it("ne devrait pas changer le benefit ou expiresIn de Magic Pill", () => {
    const pharmacie = new Pharmacy([new Drug("Magic Pill", 10, 40)]);
    const medicamentsMisesAJour = pharmacie.updateBenefitValue();
    expect(medicamentsMisesAJour[0].benefit).toEqual(40); // Magic Pill ne change pas
    expect(medicamentsMisesAJour[0].expiresIn).toEqual(10); // expiresIn reste le même
  });
});