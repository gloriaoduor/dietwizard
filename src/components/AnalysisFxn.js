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
        "Sugar(brown) 1tsp - 5g",
        "Sugar(white) 1tsp - 5g",
        "Jaggery 1tsp - 5g",
        "Jam 1tsp - 5g",
        "Marmalade 1tsp - 5g",
        "Honey 1tsp - 5g",
      ],
    },
    {
      name: "Fat exchanges",
      portions: [2, 3],
      calPerPortion: 45,
      foodRecommendations: [
        "Peanut butter 1tsp - 5g",
        "Corn oil 1tsp - 5g",
        "Avocado oil 1tsp - 5g",
        "Cream cheese 1tbsp - 5g",
        "Shredded coconut oil 1tsp - 5 g",
        "Cottonseed oil 1tsp - 5g",
        "Sunflower oil 1tsp - 5g",
        "Soya oil 1tsp - 5g",
        "Sesame oil (simsim) 1tsp - 5g",
        "Flaxseed oil 1tsp - 5g",
        "Olive oil 1tsp - 5g",
        "Canola oil 1tsp - 5g",
        "Margarine 1tsp - 5g",
        "Butter 1tsp - 5g",
        "Lard 1tsp - 5g",
        "Ghee 1tsp - 5g",
        "Cream 2tsp - 5g",
        "Cheese 2tsp - 5g",
      ],
    },
    {
      name: "Vegetable exchange",
      portions: [3, 4, 5],
      calPerPortion: 25,
      foodRecommendations: [
        "Cooked spinach 1/2 cup - 150mg",
        "Cooked kales 1/2 cup - 150mg",
        "Cooked brinjals/eggplant 1/2 cup - 150mg",
        "Cooked cabbage 1/2 cup - 150mg",
        "Cooked amaranth leaves 1/2 cup - 150mg",
        "Cooked okra 1/2 cup - 150mg",
        "Cooked cauliflower 1/2 cup - 150mg",
        "Cooked French beans (whole pod) 1/2 cup - 150mg",
        "Cooked cassava leaves 1/2 cup - 150mg",
        "Cooked Jute mallow (mrenda) 1/2 cup - 150mg",
        "Cooked cucumber 1/2 cup - 150mg",
        "Cooked nightshade (managu) 1/2 cup - 150mg",
        "Cooked spider plant (saga) 1/2 cup - 150mg",
        "Cooked pumpkin leaves 1/2 cup - 150mg",
        "Cooked broccoli 1/2 cup - 150mg",
        "Cooked bean leaves 1/2 cup - 150mg",
        "Cooked vine spinach (nderema) 1/2 cup - 150mg",
      ],
    },
    {
      name: "Fruit exchange",
      portions: [2, 3, 4],
      calPerPortion: 60,
      foodRecommendations: [
        "Apples 1 small - 150mg",
        "Oranges 1 medium size - 150g",
        "Pineapples 1cup - 150g",
        "Watermelon 1cup - 150g",
        "Papaya 1cup - 150g",
        "Guava 1serving - 150g",
        "Strawberries 1cup - 150g",
        "Pears 1piece - 150g",
        "Passion fruit 1piece - 150g",
        "Baobab fruit powder 2tbsp - 150g",
        "Avocado 1/4 serving (medium size) - 150g",
        "Lime 1 small - 150g",
        "Lemon 1 medium size - 150g",
        "Tamarind fruit 1/2 cup - 150g",
        "Tamarillo fruit 2 tamarillos - 150g",
        "Grapefruit 1/2 grapefruit - 150g",
        "Mango 1medium size - 150g",
        "Tree tomato 1serving - 150g",
        "Dates 5dates - 150g",
        "Ripe banana 1 small size - 150g",
      ],
    },
    {
      name: "Meat exchange",
      portions: [2, 3],
      calPerPortion: 55,
      foodRecommendations: [
        "Lean meat 1 matchbox size - 30 mg",
        "Medium fat meat 1 matchbox size - 30 mg",
        "High fat meat 1 matchbox size - 30 mg",
        "A leg, thigh or breast of chicken 1 serving - 30 mg",
        "Liver meat 1 matchbox size - 30 mg",
        "Kidney meat 1 matchbox size - 30 mg",
        "Heart meat 1 matchbox size - 30 mg",
        "Egg 1 serving - 30 mg",
        "Bacon 2 slices - 30 mg",
        "Fish 1 palm size - 30 mg",
        "Omena 1/2 cup - 30 mg",
        "Soya meat/tofu 1/2 cup - 30 mg",
        "Cashew nuts 1/3 cup - 30 g",
        "Roasted peanuts 1/4 cup - 30 g",
        "Macadamia nuts 1/3 cup - 30 g",
        "Bambara nuts 1/3 cup - 30 g",
        "Sunflower seeds 3 tbsp - 30 g",
        "Sesame seeds 3 tbsp - 30 g",
        "Cotton seeds 2 tbsp - 30 g",
        "Flaxseed 2 tbsp - 30 g",
        "Amaranth seeds 1/4 cup - 30 g",
        "Baobab seeds 2 tbsp - 30 g",
        "Watermelon seeds 1/4 cup - 30 g",
        "Pumpkin seeds 3 tbsp - 30 g",
        "Chia seeds 2 1/2 tbsp - 30 g",
      ],
    },
    {
      name: "Milk exchange",
      portions: [2, 3, 4],
      calPerPortion: 120,
      foodRecommendations: [
        "Fresh whole milk 250ml - 250mg",
        "Free fat milk 250ml - 250mg",
        "Yoghurt (mala) 250ml - 250mg",
        "Ice cream 250ml - 250mg",
        "Soya milk 250ml - 250mg",
        "Fermented milk (mursik) 250ml - 250mg",
        "Goat milk 250ml - 250mg",
      ],
    },
    {
      name: "Starch exchange",
      portions: [6, 7, 8, 9, 10, 11],
      calPerPortion: 60,
      foodRecommendations: [
        "Brown bread 1 slice - 30 mg",
        "White bread 1 slice - 30 mg",
        "Bun 1 slice - 30 mg",
        "Biscuit 1 piece (2 1/2 inches) - 30 mg",
        "Bagel 1/4 piece - 30 mg",
        "Muffin 1 medium size - 30 mg",
        "Whole grain chapatti 1/2 small - 30 mg",
        "Refined grain chapatti 1/2 small - 30 mg",
        "Pancake 1/2 medium size - 30 mg",
        "Mandazi 1/2 medium size - 30 mg",
        "Pasta cooked 1/2 cup - 30 mg",
        "Noodles cooked 1/2 cup - 30 mg",
        "Brown rice 1/2 cup - 30 mg",
        "White rice 1/2 cup - 30 mg",
        "Whole maize meal (ugali) 1/3 cup - 30 mg",
        "Sweet millet porridge 1/2 cup - 30 mg",
        "Millet (ugali) 1/3 cup - 30 mg",
        "Cassava meal (ugali) 1/3 cup - 30 mg",
        "Sifted maize meal (ugali) 1/3 cup - 30 mg",
        "Cassava 1/2 cup - 30 mg",
        "Cow pea cooked 1/2 cup - 30 mg",
        "Cooked ground nuts 1/2 cup - 30 mg",
        "Cooked pigeon pea 1/2 cup - 30 mg",
        "Soya beans cooked 1/2 cup - 30 mg",
        "Cooked pumpkin 1/2 cup - 30 mg",
        "Green grams 1/2 cup - 30 mg",
        "Cooked lentils 1/2 cup - 30 mg",
        "Cooked chick pea 1/2 cup - 30 mg",
        "Cooked butternut 1/2 cup - 30 mg",
        "Corn maize cob 1/2 cob - 30 mg",
        "Corn + beans (githeri) 1/2 cup - 30 mg",
        "Sweet potato 1/2 cup - 30 mg",
        "Beans cooked 1/2 cup - 30 mg",
        "Peas cooked 1/2 cup - 30 mg",
        "Cooked green banana (matoke) 1/2 cup - 30 mg",
        "Yams 1/2 cup - 30 mg",
        "Arrow roots 1/2 cup - 30 mg",
        "Squash (butternut) 1/2 cup - 30 mg",
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
