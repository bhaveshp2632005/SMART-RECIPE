import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Recipe generation endpoint
app.post('/api/generate-recipe', async (req, res) => {
  try {
    const { ingredients, cuisine, dietaryRestrictions } = req.body;
    const ingredientList = ingredients.split(',').map(ing => ing.trim());
    
    // Generate a more detailed recipe based on ingredients
    const mockRecipe = `
Recipe: ${cuisine || 'Custom'} Dish with ${ingredientList.join(', ')}

Ingredients:
${ingredientList.map((ing, index) => `${index + 1}. ${ing}`).join('\n')}

Step-by-Step Instructions:
1. Preparation (10 minutes):
   - Wash and clean all ingredients
   - Chop vegetables if any
   - Measure out all ingredients

2. Cooking Process (20-25 minutes):
   - Heat a large pan over medium heat
   - Add oil and sauté any aromatic ingredients
   - Add main ingredients in order of cooking time
   - Stir occasionally to prevent sticking

3. Finishing (5-10 minutes):
   - Add seasonings and spices
   - Taste and adjust seasoning
   - Let the dish rest for 2-3 minutes

4. Serving:
   - Plate the dish
   - Garnish with fresh herbs if available
   - Serve hot

Cooking Time: 35-45 minutes
Preparation Time: 10 minutes
Total Time: 45-55 minutes
Servings: 4

Dietary Notes: ${dietaryRestrictions || 'None specified'}

Tips:
- Adjust seasoning to taste
- Can be made ahead and reheated
- Great for meal prep
- Store leftovers in an airtight container
- Reheat in microwave or on stovetop

Nutritional Information (per serving):
- Calories: 300-400
- Protein: 15-20g
- Carbohydrates: 30-40g
- Fat: 10-15g
- Fiber: 5-7g

Note: Nutritional values are approximate and may vary based on specific ingredients and portions.
`;

    res.json({ recipe: mockRecipe });
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 