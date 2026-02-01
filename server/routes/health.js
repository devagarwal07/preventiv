import express from 'express';
import HealthData from '../models/HealthData.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/health/today
// @desc    Get today's health status
// @access  Private
router.get('/today', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let healthData = await HealthData.findOne({
            userId: req.user._id,
            date: { $gte: today }
        }).sort({ date: -1 });

        if (!healthData) {
            // Return default status if no data today
            return res.json({
                hasData: false,
                status: 'stable',
                statusMessage: 'No data recorded today. How are you feeling?',
                suggestedActions: [
                    'Log your morning vitals',
                    'Stay hydrated',
                    'Take a short walk'
                ]
            });
        }

        res.json({
            hasData: true,
            ...healthData.toObject()
        });
    } catch (error) {
        console.error('Error fetching today\'s health:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/health/vitals
// @desc    Submit health vitals
// @access  Private
router.post('/vitals', auth, async (req, res) => {
    try {
        const { vitals, notes } = req.body;

        const healthData = new HealthData({
            userId: req.user._id,
            vitals,
            notes
        });

        await healthData.save();

        res.status(201).json({
            message: 'Vitals recorded successfully',
            data: healthData
        });
    } catch (error) {
        console.error('Error saving vitals:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/health/history
// @desc    Get health history (last 30 days)
// @access  Private
router.get('/history', auth, async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const history = await HealthData.find({
            userId: req.user._id,
            date: { $gte: thirtyDaysAgo }
        }).sort({ date: -1 });

        // Calculate overview stats
        const stats = {
            totalEntries: history.length,
            stableDays: history.filter(h => h.status === 'stable').length,
            attentionDays: history.filter(h => h.status === 'attention').length,
            actionDays: history.filter(h => h.status === 'action').length
        };

        res.json({
            stats,
            history
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/health/summary
// @desc    Get health summary for dashboard
// @access  Private
router.get('/summary', auth, async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentData = await HealthData.find({
            userId: req.user._id,
            date: { $gte: sevenDaysAgo }
        }).sort({ date: -1 });

        if (recentData.length === 0) {
            return res.json({
                weeklyStatus: 'unknown',
                message: 'Start logging your vitals to see your health summary',
                trend: 'neutral',
                averages: null
            });
        }

        // Calculate averages
        const avgHeartRate = recentData
            .filter(d => d.vitals?.heartRate)
            .reduce((sum, d, i, arr) => sum + d.vitals.heartRate / arr.length, 0);

        const avgSleep = recentData
            .filter(d => d.vitals?.sleep)
            .reduce((sum, d, i, arr) => sum + d.vitals.sleep / arr.length, 0);

        const avgSteps = recentData
            .filter(d => d.vitals?.steps)
            .reduce((sum, d, i, arr) => sum + d.vitals.steps / arr.length, 0);

        // Determine overall trend
        const stableCount = recentData.filter(d => d.status === 'stable').length;
        const stablePercentage = (stableCount / recentData.length) * 100;

        let weeklyStatus = 'stable';
        let message = 'Your health indicators have been consistently stable this week';
        let trend = 'positive';

        if (stablePercentage < 50) {
            weeklyStatus = 'attention';
            message = 'Some of your health indicators need attention. Consider reviewing your habits.';
            trend = 'negative';
        } else if (stablePercentage < 80) {
            weeklyStatus = 'mixed';
            message = 'Your health has been mostly stable with some variations';
            trend = 'neutral';
        }

        res.json({
            weeklyStatus,
            message,
            trend,
            averages: {
                heartRate: Math.round(avgHeartRate) || null,
                sleep: Math.round(avgSleep * 10) / 10 || null,
                steps: Math.round(avgSteps) || null
            },
            entriesThisWeek: recentData.length
        });
    } catch (error) {
        console.error('Error fetching summary:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
