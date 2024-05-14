export const calculateBmr = (sex, weight, height, age, activityLevel) => {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let bmr, bmi, category, caloriesQty;

  if (sex === "male") {
    bmr = 10 * weight + 6.25 * (height * 100) - 5 * age + 5;
  } else if (sex === "female") {
    bmr = 10 * weight + 6.25 * (height * 100) - 5 * age - 161;
  }
  switch (activityLevel) {
    case "Sedentary":
      bmr = bmr * 1.2;
      break;
    case "Light":
      bmr *= 1.375;
      break;
    case "Moderate":
      bmr *= 1.55;
      break;
    case "Very":
      bmr *= 1.725;
      break;
    case "Super":
      bmr *= 1.9;
      break;
    default:
      bmr *= 1.2;
      break;
  }

  bmi = (weight / (height * height)).toFixed(1);
  bmr = bmr.toFixed(1);

  if (bmi < 18.5) {
    category = "Underweight";
    caloriesQty = bmr + 500;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal";
    caloriesQty = bmr;
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "OverWeight";
    caloriesQty = bmr - 500;
  } else if (bmi >= 30) {
    category = "Obese";
    caloriesQty = bmr - 500;
  }

  const foodGroups = [
    {
      name: "Sugar exchange",
      portions: [6, 7, 8, 9],
      calPerPortion: 20,
      foodRecommendations: [
        "Sugar (brown)",
        "Sugar (white)",
        "Jaggery",
        "Jam",
        "Marmalade",
        "Honey",
      ],
    },
    {
      name: "Fat exchanges",
      portions: [2, 3],
      calPerPortion: 45,
      foodRecommendations: [
        "Peanut butter",
        "Corn oil",
        "Avocado oil",
        "Cream cheese",
        "Shredded coconut oil",
        "Cottonseed oil",
        "Sunflower oil",
        "Soya oil",
        "Sesame oil (simsim)",
        "Flaxseed oil",
        "Olive oil",
        "Canola oil",
        "Margarine",
        "Butter",
        "Lard",
        "Ghee",
        "Cream",
        "Cheese",
      ],
    },
    {
      name: "Vegetable exchange",
      portions: [3, 4, 5],
      calPerPortion: 25,
      foodRecommendations: ["Cooked spinach",
      "Cooked kales",
      "Cooked brinjals/eggplant",
      "Cooked cabbage",
      "Cooked amaranth leaves",
      "Cooked okra",
      "Cooked cauliflower",
      "Cooked French beans (whole pod)",
      "Cooked cassava leaves",
      "Cooked Jute mallow (mrenda)",
      "Cooked cucumber",
      "Cooked nightshade (managu)",
      "Cooked spider plant (saga)",
      "Cooked pumpkin leaves",
      "Cooked broccoli",
      "Cooked bean leaves",
      "Cooked vine spinach (nderema)"],
    },
    {
      name: "Fruit exchange",
      portions: [2, 3, 4],
      calPerPortion: 60,
      foodRecommendations: ["Apples",
      "Oranges",
      "Pineapples",
      "Watermelon",
      "Papaya",
      "Guava",
      "Strawberries",
      "Pears",
      "Passion fruit",
      "Baobab fruit powder",
      "Avocado",
      "Lime",
      "Lemon",
      "Tamarind fruit",
      "Tamarillo fruit",
      "Grapefruit",
      "Mango",
      "Tree tomato",
      "Dates",
      "Ripe banana"],
    },
    {
      name: "Meat exchange",
      portions: [2, 3],
      calPerPortion: 55,
      foodRecommendations: ["Lean meat",
      "Medium fat meat",
      "High fat meat",
      "A leg, thigh or breast of chicken",
      "Liver meat",
      "Kidney meat",
      "Heart meat",
      "Egg",
      "Bacon (2 slices)",
      "Fish (palm size)",
      "Omena (1/2 cup)",
      "Soya meat/tofu"],
    },
    {
      name: "Milk exchange",
      portions: [2, 3, 4],
      calPerPortion: 120,
      foodRecommendations: ["Fresh whole milk (250ml)",
      "Free fat milk (250ml)",
      "Yoghurt (mala) (250ml)",
      "Ice cream (250ml)",
      "Soya milk (250ml)",
      "Fermented milk (mursik) (250ml)",
      "Goat milk"],
    },
    {
      name: "Starch exchange",
      portions: [6, 7, 8, 9, 10, 11],
      calPerPortion: 60,
      foodRecommendations: [
        "Arrow roots",
        "Ugali",
        "Bread",
        "Cassava",
        "Dried Cooked beans",
        "Cooked rice",
        "Pasta",
        "Sweet Potatoes",
        "Porridge",
        "Irish Potatoes",
        "Chapati",
      ],
    },
  ];

  let remainingCalories = caloriesQty;

  const foodPortions = {};
  const selectedRecommendations = {};

  for (const group of foodGroups) {
    let groupCalories = 0;
    const shuffledRecommendations = group.foodRecommendations.sort(
      () => 0.5 - Math.random()
    );
    const selectedFoods = shuffledRecommendations.slice(0, 3).join(", \n");
    while (groupCalories < remainingCalories) {
      const randomPortion =
        group.portions[getRandomInt(0, group.portions.length - 1)];
      const portionCalories = randomPortion * group.calPerPortion;
      groupCalories += portionCalories;
      if (!(group.name in foodPortions)) {
        foodPortions[group.name] = {
          portion: randomPortion,
          calories: portionCalories,
        };
      }
    }

    // const randomRecommendation = group.foodRecommendations
    //   .slice(0, group.foodRecommendations.length)
    //   .join(", \n");
    selectedRecommendations[group.name] = selectedFoods;
  }

  const result = {
    bmr,
    bmi,
    category,
    caloriesQty,
    foodPortions,
    selectedRecommendations,
  };

  return result;
};
