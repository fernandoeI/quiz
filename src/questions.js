import react, { Component } from "react";

const Questions = [
  [
    {
      categoria: "0",
      name: "¿En qué año se le dió la categoría de Pueblo Mágico?",
      optionA: "2009",
      optionB: "2015",
      optionC: "2010",
      optionD: "2014",
      answer: "2010",
    },
    {
      categoria: "0",
      name: "¿Sabes qué actividades de aventura puedes realizar en esta Ruta?",
      optionA: "Equitación y esquí",
      optionB: "Rappel y espeleísmo",
      optionC: "Surf y descenso en río",
      optionD: "Espeleísmo y esquí",
      answer: "Rappel y espeleísmo",
    },
    {
      categoria: "0",
      name: "¿Sabes por qué se llama Ruta Aventura en la Sierra?",
      optionA: "Por sus condiciones serranía con cuevas",
      optionB: "Por los callejones que hay en su Pueblo Mágico ",
      optionC: "Porque se pueden practicar deportes extremos",
      optionD: "Porque es  el nombre de una calle importante",
      answer: "Por sus condiciones serranía con cuevas",
    },
    {
      categoria: "0",
      name: "¿Qué municipios comprende la Ruta Aventura en la Sierra?",
      optionA: "Tacotalpa, Tenosique y Huimanguillo",
      optionB: "Jalapa,  Jalpa de Méndez y Balancán",
      optionC: "Jalapa,Macuspana, Tacotalpa y Teapa",
      optionD: "Teapa,Jonuta y Centro",
      answer: "Jalapa,Macuspana, Tacotalpa y Teapa",
    },

    {
      categoria: "0",
      name: "¿A qué se refiere el Puyacatengo?",
      optionA: "A un playon",
      optionB: "A un río",
      optionC: "A una laguna",
      optionD: "A una cueva",
      answer: "A un río",
    },

    {
      categoria: "0",
      name: "Es un barrio famoso de Teapa:",
      optionA: "La Guadalupe",
      optionB: "Tecomajiaca",
      optionC: "El Azufre",
      optionD: "San Marcos",
      answer: "Tecomajiaca",
    },

    {
      categoria: "6",
      name: "¿Qué municipio predomina la ruta del Oro Verde?",
      optionA: "Comalcalco",
      optionB: "Cunduacán",
      optionC: "Teapa",
      optionD: "Jalapa",
      answer: "Teapa",
    },

    {
      categoria: "5",
      name: "¿Qué municipio se distingue por la elaboración de dulces?",
      optionA: "Jalapa",
      optionB: "Emiliano Zapata",
      optionC: "Macuspana",
      optionD: "Jonuta",
      answer: "Jalapa",
    },

    {
      categoria: "4",
      name: "¿El dulce más conocido en esta ruta es?",
      optionA: "Dulce de leche",
      optionB: "Dulce de Joloche",
      optionC: "Dulce de oreja de mico",
      optionD: "Dulce de Coco",
      answer: "Dulce de Joloche",
    },

    {
      categoria: "3",
      name: "¿Dónde elaboran la exquisita longaniza enjamonada?",
      optionA: "Centro",
      optionB: "Jalpa de Mendez",
      optionC: "Teapa",
      optionD: "Macuspana",
      answer: "Teapa",
    },

    {
      categoria: "1",
      name: "¿Cuántos pueblos mágicos hay en Tabasco?",
      optionA: "3",
      optionB: "1",
      optionC: "5",
      optionD: "2",
      answer: "1",
    },

    {
      categoria: "0",
      name: "¿Cuál es el pueblo mágico de Tabasco?",
      optionA: "Tapotzingo",
      optionB: "Tapijulapa",
      optionC: "Taxco",
      optionD: "Tapijiapa",
      answer: "Tapijulapa",
    },

    {
      categoria: "1",
      name:
        "¿Qué municipio de la Ruta Aventura en la Sierra fue capital de Tabasco?",
      optionA: "Macuspana",
      optionB: "Jalapa",
      optionC: "Tacotalpa",
      optionD: "Teapa",
      answer: "Tacotalpa",
    },

    {
      categoria: "2",
      name: "¿Qué ríos cruzan por Tapijulapa?",
      optionA: "Oxolotán y Amatán",
      optionB: "Grijalva y Usumacinta",
      optionC: "Chacamax y Puyacatengo",
      optionD: "Oxolotán y Usumacinta",
      answer: "Oxolotán y Amatán",
    },

    {
      categoria: "3",
      name:
        "¿Dónde se encuentra la casa museo del ex-gobernador Tomás Garrido Canabal?",
      optionA: "Villahermosa",
      optionB: "Villa Luz",
      optionC: "Villa Tapijulapa",
      optionD: "Villa Juan Aldama",
      answer: "Villa Luz",
    },

    {
      categoria: "4",
      name:
        "Desarrollo Ecoturístico que en lengua chol significa “la grandeza del agua”",
      optionA: "Biji Yokotàn",
      optionB: "Kolem Jaá",
      optionC: "Kolem Cheñ",
      optionD: "Kumkum",
      answer: "Kolem Jaá",
    },

    {
      categoria: "5",
      name: "Ex Convento fundado por Franciscanos en 1633:",
      optionA: "Ex Convento de San Marcos",
      optionB: "Ex Convento de San Francisco de Asís",
      optionC: "Ex Convento de Santo Domingo de Guzmán",
      optionD: "Ex Convento de Santiago Apostol",
      answer: "Ex Convento de Santo Domingo de Guzmán",
    },

    {
      categoria: "6",
      name: "Nombra las etnias que habitan en esta zona:",
      optionA: "Zoques y Choles",
      optionB: "Tzeltal y Tzoltzil",
      optionC: "Nahuas y Chontales",
      optionD: "Zoques y Chontales",
      answer: "Zoques y Choles",
    },

    {
      categoria: "2",
      name: "¿Qué significa el nombre de Tapijulapa?",
      optionA: "Lugar entre dos aguas",
      optionB: "Lugar donde se rompen los cántaros",
      optionC: "Lugar donde mejor alumbra el sol",
      optionD: "Lugar de piedras",
      answer: "Lugar donde se rompen los cántaros",
    },
  ],
];
export default Questions;
