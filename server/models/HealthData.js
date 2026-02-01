import mongoose from 'mongoose';

const healthDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    vitals: {
        heartRate: {
            type: Number,
            min: 30,
            max: 220
        },
        bloodPressure: {
            systolic: Number,
            diastolic: Number
        },
        steps: {
            type: Number,
            min: 0
        },
        sleep: {
            type: Number, // hours
            min: 0,
            max: 24
        },
        weight: Number,
        bloodSugar: Number,
        mood: {
            type: String,
            enum: ['great', 'good', 'okay', 'low', 'bad']
        },
        energy: {
            type: Number,
            min: 1,
            max: 10
        }
    },
    status: {
        type: String,
        enum: ['stable', 'attention', 'action'],
        default: 'stable'
    },
    statusMessage: {
        type: String,
        default: 'All vitals look normal'
    },
    suggestedActions: [{
        type: String
    }],
    notes: String
});

// Calculate status based on vitals
healthDataSchema.pre('save', function (next) {
    const vitals = this.vitals;
    let concerns = [];
    let actions = [];

    // Check heart rate
    if (vitals.heartRate) {
        if (vitals.heartRate < 50 || vitals.heartRate > 100) {
            concerns.push('Heart rate outside normal range');
            actions.push('Rest and monitor your heart rate');
        }
    }

    // Check blood pressure
    if (vitals.bloodPressure?.systolic && vitals.bloodPressure?.diastolic) {
        const { systolic, diastolic } = vitals.bloodPressure;
        if (systolic > 140 || diastolic > 90) {
            concerns.push('Blood pressure elevated');
            actions.push('Reduce salt intake');
            actions.push('Consider relaxation techniques');
        }
    }

    // Check sleep
    if (vitals.sleep !== undefined) {
        if (vitals.sleep < 6) {
            concerns.push('Sleep below recommended hours');
            actions.push('Try to get 7-8 hours of sleep tonight');
        }
    }

    // Check steps
    if (vitals.steps !== undefined && vitals.steps < 3000) {
        actions.push('Take a 15-minute walk');
    }

    // Check energy
    if (vitals.energy && vitals.energy <= 3) {
        concerns.push('Low energy reported');
        actions.push('Hydrate with 2 glasses of water');
        actions.push('Consider a short break or light exercise');
    }

    // Set status based on concerns
    if (concerns.length >= 2) {
        this.status = 'action';
        this.statusMessage = 'Multiple indicators need attention';
    } else if (concerns.length === 1) {
        this.status = 'attention';
        this.statusMessage = concerns[0];
    } else {
        this.status = 'stable';
        this.statusMessage = 'All vitals look normal. Keep it up!';
        if (actions.length === 0) {
            actions.push('Stay hydrated throughout the day');
            actions.push('Maintain your current routine');
        }
    }

    this.suggestedActions = actions.slice(0, 3); // Max 3 actions
    next();
});

const HealthData = mongoose.model('HealthData', healthDataSchema);

export default HealthData;
