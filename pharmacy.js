export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      // Cas spécial pour Dafalgan
      if (this.drugs[i].name === "Dafalgan") {
        if (this.drugs[i].benefit > 0) {
          this.drugs[i].benefit -= 2; // Dafalgan se dégrade deux fois plus vite
        }
        this.drugs[i].expiresIn -= 1;

        if (this.drugs[i].expiresIn < 0 && this.drugs[i].benefit > 0) {
          this.drugs[i].benefit -= 2; // Se dégrade encore plus vite après expiration
        }
        
        // Limiter le benefit à 0 pour éviter des valeurs négatives
        if (this.drugs[i].benefit < 0) {
          this.drugs[i].benefit = 0;
        }
        continue;
      }

      // Logique pour les autres médicaments
      if (this.drugs[i].name != "Herbal Tea" && this.drugs[i].name != "Fervex") {
        if (this.drugs[i].benefit > 0) {
          if (this.drugs[i].name != "Magic Pill") {
            this.drugs[i].benefit -= 1;
          }
        }
      } else {
        if (this.drugs[i].benefit < 50) {
          this.drugs[i].benefit += 1;
          if (this.drugs[i].name == "Fervex") {
            if (this.drugs[i].expiresIn < 11) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit += 1;
              }
            }
            if (this.drugs[i].expiresIn < 6) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit += 1;
              }
            }
          }
        }
      }

      if (this.drugs[i].name != "Magic Pill") {
        this.drugs[i].expiresIn -= 1;
      }

      if (this.drugs[i].expiresIn < 0) {
        if (this.drugs[i].name != "Herbal Tea" && this.drugs[i].name != "Fervex") {
          if (this.drugs[i].benefit > 0) {
            this.drugs[i].benefit -= 1;
          }
        } else if (this.drugs[i].name == "Fervex") {
          this.drugs[i].benefit = 0; // Fervex tombe à 0 après expiration
        } else if (this.drugs[i].name == "Herbal Tea" && this.drugs[i].benefit < 50) {
          this.drugs[i].benefit += 1; // Herbal Tea continue d'augmenter même après expiration
        }
      }

      // Limiter le benefit à 0 pour tous les médicaments
      if (this.drugs[i].benefit < 0) {
        this.drugs[i].benefit = 0;
      }
    }

    return this.drugs;
  }
}