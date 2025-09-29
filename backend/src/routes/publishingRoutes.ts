import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// Publishing metrics endpoint
router.get('/metrics', (req: Request, res: Response) => {
  const mockData = {
    success: true,
    data: {
      activeQueue: [
        {
          id: '1',
          title: 'Action Movie 2024',
          type: 'VOD',
          duration: '120min',
          status: 'processing',
          transcodingProgress: 75,
          qcProgress: 30,
          packageProgress: 0,
          eta: '2h 15m',
          priority: 'High',
          queuePosition: 1,
          metadata: {
            title: true,
            description: true,
            thumbnail: true,
            rating: false
          }
        },
        {
          id: '2',
          title: 'Live Sports Event',
          type: 'Live',
          duration: 'Ongoing',
          status: 'streaming',
          transcodingProgress: 100,
          qcProgress: 100,
          packageProgress: 100,
          eta: 'Live',
          priority: 'Critical',
          queuePosition: 0,
          metadata: {
            title: true,
            description: true,
            thumbnail: true,
            rating: true
          }
        }
      ],
      encodingProfiles: [
        {
          platform: 'Netflix',
          name: 'Netflix 4K HDR',
          resolution: '3840x2160',
          bitrate: '15-25 Mbps',
          audio: 'Dolby Atmos',
          status: 'active',
          dailyVolume: 45
        },
        {
          platform: 'Amazon Prime',
          name: 'Prime Video HD',
          resolution: '1920x1080',
          bitrate: '8-12 Mbps',
          audio: '5.1 Surround',
          status: 'active',
          dailyVolume: 32
        }
      ]
    }
  };
  
  res.json(mockData);
});

// Publishing KPIs endpoint
router.get('/kpis', (req: Request, res: Response) => {
  const mockData = {
    success: true,
    data: {
      summary: {
        totalPublished: 15420,
        successRate: 97.5,
        avgProcessingTime: 25,
        activeStreams: 12,
        growthRate: 8.5
      },
      alerts: [
        {
          severity: 'warning',
          message: 'DRM validation pending for 3 assets in Netflix queue'
        },
        {
          severity: 'info', 
          message: 'Scheduled maintenance for encoding farm at 2:00 AM'
        }
      ]
    }
  };
  
  res.json(mockData);
});

// Publishing trends endpoint
router.get('/trends/:contentType', (req: Request, res: Response) => {
  const { contentType } = req.params;
  const days = parseInt(req.query.days as string) || 7;
  
  const mockData = {
    success: true,
    data: {
      volumeByType: [
        { date: '2024-01-01', vod: 45, live: 12, shorts: 78 },
        { date: '2024-01-02', vod: 52, live: 8, shorts: 65 },
        { date: '2024-01-03', vod: 38, live: 15, shorts: 82 },
        { date: '2024-01-04', vod: 61, live: 10, shorts: 71 },
        { date: '2024-01-05', vod: 55, live: 18, shorts: 69 },
        { date: '2024-01-06', vod: 48, live: 14, shorts: 76 },
        { date: '2024-01-07', vod: 43, live: 11, shorts: 73 }
      ],
      successRates: [
        { date: '2024-01-01', vod: 98.2, live: 99.5, shorts: 96.8 },
        { date: '2024-01-02', vod: 97.8, live: 99.1, shorts: 97.2 },
        { date: '2024-01-03', vod: 98.5, live: 99.8, shorts: 96.5 },
        { date: '2024-01-04', vod: 97.9, live: 99.3, shorts: 97.8 },
        { date: '2024-01-05', vod: 98.1, live: 99.7, shorts: 96.9 },
        { date: '2024-01-06', vod: 98.3, live: 99.4, shorts: 97.5 },
        { date: '2024-01-07', vod: 97.6, live: 99.2, shorts: 97.1 }
      ]
    }
  };
  
  res.json(mockData);
});

// Content stats by type endpoint  
router.get('/stats/:contentType', (req: Request, res: Response) => {
  const { contentType } = req.params;
  
  const generateStats = (type: string) => {
    switch (type) {
      case 'vod':
        return {
          queueCount: 24,
          processingCount: 8,
          publishedCount: 1456,
          successRate: 97.8,
          avgProgress: 65,
          languages: [
            { code: 'EN', complete: true },
            { code: 'ES', complete: true },
            { code: 'FR', complete: false },
            { code: 'DE', complete: true }
          ]
        };
      case 'live':
        return {
          activeCount: 12,
          scheduledCount: 5,
          dvrCount: 8,
          streamHealth: 99.2,
          avgBitrate: 8.5,
          avgLatency: 2.3,
          activeEncoders: [
            { id: 'enc1', name: 'Encoder-01', status: 'healthy' },
            { id: 'enc2', name: 'Encoder-02', status: 'healthy' },
            { id: 'enc3', name: 'Encoder-03', status: 'warning' }
          ]
        };
      case 'shorts':
        return {
          queueCount: 145,
          processingCount: 32,
          publishedCount: 3240,
          successRate: 96.5,
          avgProgress: 78,
          avgDuration: 45,
          avgSize: 25.6,
          platforms: [
            { name: 'TikTok', count: 892, status: 'active' },
            { name: 'YouTube', count: 1245, status: 'active' },
            { name: 'Instagram', count: 1103, status: 'active' }
          ]
        };
      default:
        return {};
    }
  };
  
  const mockData = {
    success: true,
    data: generateStats(contentType)
  };
  
  res.json(mockData);
});

// Content delivery status endpoint
router.get('/delivery-status', (req: Request, res: Response) => {
  const mockData = {
    success: true,
    data: [
      { name: 'Netflix', status: 'success', details: '1,234 assets delivered' },
      { name: 'Amazon Prime', status: 'pending', details: '56 assets in queue' },
      { name: 'Disney+', status: 'success', details: '890 assets delivered' },
      { name: 'HBO Max', status: 'failed', details: '3 failed deliveries' },
      { name: 'Hulu', status: 'success', details: '567 assets delivered' },
      { name: 'Apple TV+', status: 'pending', details: '23 assets in queue' }
    ]
  };
  
  res.json(mockData);
});

// DRM status endpoint
router.get('/drm-status', (req: Request, res: Response) => {
  const mockData = {
    success: true,
    data: [
      { type: 'Widevine', status: 'applied', details: '2,456 assets protected' },
      { type: 'FairPlay', status: 'applied', details: '1,890 assets protected' },
      { type: 'PlayReady', status: 'pending', details: '234 assets processing' },
      { type: 'ClearKey', status: 'applied', details: '345 assets protected' }
    ]
  };
  
  res.json(mockData);
});

// Subtitle tracks endpoint
router.get('/subtitle-tracks', (req: Request, res: Response) => {
  const mockData = {
    success: true,
    data: [
      { language: 'English', status: 'available', details: 'SDH + CC available' },
      { language: 'Spanish', status: 'available', details: 'Subtitles available' },
      { language: 'French', status: 'missing', details: 'Translation in progress' },
      { language: 'German', status: 'available', details: 'Subtitles available' },
      { language: 'Portuguese', status: 'available', details: 'Subtitles available' },
      { language: 'Italian', status: 'missing', details: 'Pending review' }
    ]
  };
  
  res.json(mockData);
});

// Encoding profiles endpoint
router.get('/encoding-profiles', (req: Request, res: Response) => {
  const mockData = {
    success: true,
    data: [
      {
        platform: 'Netflix',
        name: 'Netflix 4K HDR',
        resolution: '3840x2160',
        bitrate: '15-25 Mbps',
        audio: 'Dolby Atmos',
        status: 'active',
        dailyVolume: 45
      },
      {
        platform: 'Amazon Prime',
        name: 'Prime Video HD',
        resolution: '1920x1080',
        bitrate: '8-12 Mbps',
        audio: '5.1 Surround',
        status: 'active',
        dailyVolume: 32
      },
      {
        platform: 'Disney+',
        name: 'Disney+ 4K',
        resolution: '3840x2160',
        bitrate: '20-30 Mbps',
        audio: 'Dolby Atmos',
        status: 'active',
        dailyVolume: 28
      },
      {
        platform: 'HBO Max',
        name: 'HBO Max Premium',
        resolution: '1920x1080',
        bitrate: '10-15 Mbps',
        audio: '7.1 Surround',
        status: 'maintenance',
        dailyVolume: 15
      }
    ]
  };
  
  res.json(mockData);
});

export default router;