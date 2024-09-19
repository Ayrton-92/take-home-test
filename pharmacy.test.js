import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

   // Nouveau test pour Dafalgan
   it("should degrade Dafalgan benefit twice as fast as normal drugs", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 10, 20)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs[0].benefit).toEqual(18); 
    expect(updatedDrugs[0].expiresIn).toEqual(9); 
  });

  it("should degrade Dafalgan benefit twice as fast after expiration", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 0, 10)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs[0].benefit).toEqual(6); 
    expect(updatedDrugs[0].expiresIn).toEqual(-1); 
  });
});

