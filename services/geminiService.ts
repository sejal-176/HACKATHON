import { GoogleGenAI } from "@google/genai";
import { RideDetails, AnalysisResponse } from "../types";

// Always use process.env.API_KEY directly and within a named parameter object.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMobilityInsights = async (details: RideDetails): Promise<AnalysisResponse> => {
  const prompt = `
    Analyze this student ride-pooling scenario. This app (StudentPool) optimizes existing services like ${details.provider} for massive student groups.
    
    Group: ${details.studentCount} students
    College: ${details.collegeName}
    Drop-off: ${details.destination}
    Booking Fare: ₹${details.totalFare}

    JSON Schema to return:
    {
      "splitSuggestion": "A catchy, motivating summary of the split (e.g., 'Only ₹${(details.totalFare/details.studentCount).toFixed(0)} per student!').",
      "environmentalBenefits": "Quantifiable carbon reduction for this massive pool vs individual trips.",
      "economicImpact": "A deep analysis of the positive economic impact. Explain how pooling increases student spending power and optimizes urban mobility efficiency in Mumbai.",
      "safetyMeasures": ["Peer-verified tip 1", "Safety protocol 2", "Safety protocol 3"],
      "feasibilityAnalysis": "Hyper-local traffic and route analysis for ${details.destination}.",
      "weeklySavings": "Impactful individual savings per week (e.g., '₹1,500/week').",
      "integrationFlow": "Simplified steps to transition to ${details.provider}.",
      "optimizationLogic": "The smart logic used to cluster these students efficiently."
    }

    Goal: Show how StudentPool creates a massive, connected network of students. Focus on the 'Student Economy' and community benefits.
    Use Google Maps grounding for accurate campus context.
  `;

  try {
    // Maps grounding is only supported in Gemini 2.5 series models. 
    // Do not use gemini-3-flash-preview for maps grounding.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: details.currentLat && details.currentLng ? {
              latitude: details.currentLat,
              longitude: details.currentLng
            } : undefined
          }
        },
      },
    });

    // The GenerateContentResponse features a `text` property, not a method.
    const text = response.text || '';
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    const data = JSON.parse(jsonStr);

    // Extracting grounding sources from candidates.
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.maps)
      .map((chunk: any) => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri
      }));

    return {
      ...data,
      groundingSources: sources
    } as AnalysisResponse;

  } catch (error) {
    console.error("Error generating mobility insights:", error);
    const share = (details.totalFare / details.studentCount).toFixed(2);
    return {
      splitSuggestion: `Massive pool: Just ₹${share} each.`,
      environmentalBenefits: "Significant reduction in local emissions and congestion by sharing 1 vehicle instead of many.",
      economicImpact: "Pooling dramatically lowers daily costs, allowing students to reallocate funds to education while maintaining high utility for taxi services.",
      safetyMeasures: ["Verified Campus IDs", "Live Route Sharing", "Emergency Contact Sync"],
      feasibilityAnalysis: "Optimized for peak Mumbai commute hours.",
      weeklySavings: `Approx ₹${((details.totalFare - parseFloat(share)) * 5).toFixed(0)} saved/week.`,
      integrationFlow: "Group Check -> Fare Lock -> One-tap Booking.",
      optimizationLogic: "Smart clustering based on campus arrival times and pickup proximity.",
      groundingSources: []
    };
  }
};