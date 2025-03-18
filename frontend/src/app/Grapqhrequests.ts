import {gql} from "@urql/core";


export const GET_WORLD = gql`
  query getWorld($user: String!) {
    getWorld(user: $user) {
      name
      angelbonus
      logo
      money
      score
      totalangels
      lastupdate
      activeangels
      products{
        id
        name
        logo
        cout
        croissance
        revenu
        vitesse
        quantite
        timeleft
        managerUnlocked
        paliers{
          name
          logo
          seuil
          idcible
          ratio
          typeratio
          unlocked
        }
      }
      allunlocks{
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      upgrades{
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      angelupgrades{
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      managers{
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  }
`;

export const LANCER_PRODUCTION = gql`
  mutation lancerProductionProduit($user: String!, $id: Int!) {
    lancerProductionProduit(user: $user, id: $id) {
      id
    }
  }`;

  export const ACHETER_PRODUIT = gql`
  mutation acheterQtProduit($user: String!, $id: Int!, $quantite: Int!) {
    acheterQtProduit(user: $user, id: $id, quantite: $quantite) {
      id
    }
  }
`;