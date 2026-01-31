'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions.
 *
 * - generateProductDescription - A function that generates a product description based on the given input.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the drink.'),
  flavor: z.string().describe('The flavor profile of the drink.'),
  description: z.string().describe('Short description of the drink.'),
  ingredients: z.string().describe('A list of ingredients in the drink.'),
  category: z.enum(['Soda', 'Juice', 'Energy', 'Mocktail']).describe('The category of the drink.'),
  price: z.number().describe('The price of the drink.'),
});

export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A detailed and engaging product description.'),
});

export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a marketing expert specializing in crafting enticing product descriptions for cold drinks.

  Given the following specifications, generate a detailed and engaging product description:

  Drink Name: {{{name}}}
  Flavor: {{{flavor}}}
  Short Description: {{{description}}}
  Ingredients: {{{ingredients}}}
  Category: {{{category}}}
  Price: {{{price}}}

  Write a description that is:
  - Friendly
  - Fresh
  - Youthful
  - Brand-focused

  The description should highlight the drink's unique qualities and appeal to customers looking for a refreshing and flavorful experience.  Focus on the flavor, refreshment, and overall drinking experience.
  `,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
