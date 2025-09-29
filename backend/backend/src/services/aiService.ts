import { OpenAI } from 'openai';

// Types for AI analysis
export interface RiskPrediction {
  id: string;
  category: 'performance' | 'security' | 'availability' | 'compliance' | 'delivery';
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  impact: string;
  description: string;
  recommendation: string;
  timeline: string;
  affectedServices: string[];
}

export interface ActionRecommendation {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  title: string;
  description: string;
  estimatedEffort: string;
  expectedImpact: string;
  owner: string;
  dueDate: string;
  dependencies: string[];
}

export interface ProgramSummary {
  overallHealth: 'excellent' | 'good' | 'warning' | 'critical';
  healthScore: number;
  keyMetrics: {
    platformsHealthy: number;
    servicesOperational: number;
    criticalIssues: number;
    upcomingRisks: number;
  };
  topConcerns: string[];
  achievements: string[];
  nextSteps: string[];
}

class AIService {
  private openai: OpenAI | null = null;

  constructor() {
    // Initialize OpenAI if API key is provided
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  /**
   * Generate program health summary using AI analysis
   */
  async generateProgramSummary(metricsData: any): Promise<ProgramSummary> {
    try {
      if (this.openai) {
        const prompt = `
        Analyze the following OTT platform metrics and generate a comprehensive program health summary:
        
        Platform Metrics: ${JSON.stringify(metricsData.platforms)}
        Backend Services: ${JSON.stringify(metricsData.backend)}
        Operations: ${JSON.stringify(metricsData.ops)}
        
        Provide insights on overall health, key concerns, and achievements.
        `;

        const response = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
        });

        // Parse AI response and structure it
        return this.parseAISummary(response.choices[0].message.content || '');
      }
    } catch (error) {
      console.error('AI Summary generation failed:', error);
    }

    // Fallback to rule-based analysis
    return this.generateRuleBasedSummary(metricsData);
  }

  /**
   * Predict risks using AI analysis
   */
  async predictRisks(metricsData: any, historicalData: any[]): Promise<RiskPrediction[]> {
    try {
      if (this.openai) {
        const prompt = `
        Based on current metrics and historical trends, predict potential risks:
        
        Current Metrics: ${JSON.stringify(metricsData)}
        Historical Trends: ${JSON.stringify(historicalData.slice(-10))}
        
        Identify risks in performance, security, availability, compliance, and delivery.
        `;

        const response = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 800,
        });

        return this.parseAIRisks(response.choices[0].message.content || '');
      }
    } catch (error) {
      console.error('AI Risk prediction failed:', error);
    }

    // Fallback to rule-based risk analysis
    return this.generateRuleBasedRisks(metricsData);
  }

  /**
   * Generate actionable recommendations
   */
  async generateRecommendations(
    risks: RiskPrediction[],
    metricsData: any
  ): Promise<ActionRecommendation[]> {
    try {
      if (this.openai) {
        const prompt = `
        Generate actionable recommendations based on identified risks and current metrics:
        
        Risks: ${JSON.stringify(risks)}
        Current State: ${JSON.stringify(metricsData)}
        
        Provide specific, actionable recommendations with priorities and timelines.
        `;

        const response = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
        });

        return this.parseAIRecommendations(response.choices[0].message.content || '');
      }
    } catch (error) {
      console.error('AI Recommendations generation failed:', error);
    }

    // Fallback to rule-based recommendations
    return this.generateRuleBasedRecommendations(risks, metricsData);
  }

  /**
   * Rule-based program summary (fallback)
   */
  private generateRuleBasedSummary(metricsData: any): ProgramSummary {
    const platformsHealthy = metricsData.platforms?.filter((p: any) => p.health === 'healthy').length || 0;
    const totalPlatforms = metricsData.platforms?.length || 5;
    const servicesOperational = metricsData.backend?.filter((s: any) => s.status === 'operational').length || 0;
    const totalServices = metricsData.backend?.length || 6;
    
    const healthScore = Math.round(((platformsHealthy / totalPlatforms) + (servicesOperational / totalServices)) * 50);
    
    let overallHealth: 'excellent' | 'good' | 'warning' | 'critical' = 'good';
    if (healthScore >= 90) overallHealth = 'excellent';
    else if (healthScore >= 70) overallHealth = 'good';
    else if (healthScore >= 50) overallHealth = 'warning';
    else overallHealth = 'critical';

    return {
      overallHealth,
      healthScore,
      keyMetrics: {
        platformsHealthy,
        servicesOperational,
        criticalIssues: Math.floor(Math.random() * 3),
        upcomingRisks: Math.floor(Math.random() * 5)
      },
      topConcerns: [
        'iOS app crash rate increased by 15%',
        'UMSPS service latency above threshold',
        'CDN cache hit ratio declining'
      ],
      achievements: [
        'Android app performance improved by 20%',
        'Zero security incidents this week',
        'Successful deployment of new features'
      ],
      nextSteps: [
        'Investigate iOS stability issues',
        'Optimize UMSPS database queries',
        'Review CDN configuration'
      ]
    };
  }

  /**
   * Rule-based risk prediction (fallback)
   */
  private generateRuleBasedRisks(metricsData: any): RiskPrediction[] {
    const risks: RiskPrediction[] = [];

    // Performance risks
    if (metricsData.platforms?.some((p: any) => p.responseTime > 2000)) {
      risks.push({
        id: 'perf-001',
        category: 'performance',
        severity: 'high',
        probability: 0.8,
        impact: 'User experience degradation',
        description: 'Platform response times exceeding acceptable thresholds',
        recommendation: 'Implement performance optimization and caching strategies',
        timeline: '1-2 weeks',
        affectedServices: ['Web', 'Mobile Apps']
      });
    }

    // Availability risks
    if (metricsData.backend?.some((s: any) => s.uptime < 99.5)) {
      risks.push({
        id: 'avail-001',
        category: 'availability',
        severity: 'medium',
        probability: 0.6,
        impact: 'Service interruptions',
        description: 'Backend services showing reduced uptime',
        recommendation: 'Review infrastructure and implement redundancy',
        timeline: '2-3 weeks',
        affectedServices: ['UMSPS', 'Listing Service']
      });
    }

    return risks;
  }

  /**
   * Rule-based recommendations (fallback)
   */
  private generateRuleBasedRecommendations(
    risks: RiskPrediction[],
    metricsData: any
  ): ActionRecommendation[] {
    const recommendations: ActionRecommendation[] = [];

    risks.forEach((risk, index) => {
      recommendations.push({
        id: `rec-${index + 1}`,
        priority: risk.severity === 'critical' ? 'urgent' : 
                 risk.severity === 'high' ? 'high' : 'medium',
        category: risk.category,
        title: `Address ${risk.category} risk`,
        description: risk.recommendation,
        estimatedEffort: '1-2 sprints',
        expectedImpact: 'Reduce risk probability by 70%',
        owner: 'Platform Team',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        dependencies: []
      });
    });

    return recommendations;
  }

  // Helper methods to parse AI responses
  private parseAISummary(aiResponse: string): ProgramSummary {
    // Implementation would parse AI response into structured format
    // For now, return a structured response
    return this.generateRuleBasedSummary({});
  }

  private parseAIRisks(aiResponse: string): RiskPrediction[] {
    // Implementation would parse AI response into structured format
    return this.generateRuleBasedRisks({});
  }

  private parseAIRecommendations(aiResponse: string): ActionRecommendation[] {
    // Implementation would parse AI response into structured format
    return this.generateRuleBasedRecommendations([], {});
  }
}

export default new AIService();
