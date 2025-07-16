import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Activity, MapPin, Clock, Target } from 'lucide-react';

const QuestionnaireCompare = ({ questionnaires = [] }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Extract and process questionnaire data
  const processQuestionnaireData = (questionnaires) => {
    const preAssessment = questionnaires.find(q => q.type === 'pre');
    const postAssessments = questionnaires.filter(q => q.type === 'post').sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return { preAssessment, postAssessments };
  };

  const { preAssessment, postAssessments } = processQuestionnaireData(questionnaires);

  // Helper function to get response value
  const getResponseValue = (responses, questionId) => {
    const response = responses.find(r => r.questionId === questionId);
    return response?.selectedOption ?? response?.selectedValue ?? response?.selectedValues ?? response?.scaleValue ?? null;
  };

  // Walking distance mapping
  const walkingDistanceMap = {
    0: { text: "Wohnung (0-10m)", value: 10 },
    1: { text: "Nachbar (10-50m)", value: 50 },
    2: { text: "Straßenecke (50-200m)", value: 200 },
    3: { text: "Geschäfte (200m-1km)", value: 1000 },
    4: { text: "Längere Strecken (>1km)", value: 1500 }
  };

  // Generate walking distance trend data
  const getWalkingTrend = () => {
    const data = [];
    
    if (preAssessment) {
      const preWalking = getResponseValue(preAssessment.responses, 'walking_distance_pre');
      data.push({
        date: 'Pre-Assessment',
        distance: walkingDistanceMap[preWalking]?.value || 0,
        label: walkingDistanceMap[preWalking]?.text || 'Unknown'
      });
    }
    
    postAssessments.forEach((assessment, index) => {
      const postWalking = getResponseValue(assessment.responses, 'walking_distance_post');
      data.push({
        date: `Post ${index + 1}`,
        distance: walkingDistanceMap[postWalking]?.value || 0,
        label: walkingDistanceMap[postWalking]?.text || 'Unknown'
      });
    });
    
    return data;
  };

  // Wound analysis
  const getWoundAnalysis = () => {
    const analysis = { pre: [], post: [] };
    
    if (preAssessment) {
      const preWounds = getResponseValue(preAssessment.responses, 'wounds');
      const preWoundLocations = getResponseValue(preAssessment.responses, 'wounds_image');
      
      analysis.pre = {
        hasWounds: preWounds === 0, // 0 = "Ja"
        locations: preWoundLocations || [],
        count: Array.isArray(preWoundLocations) ? preWoundLocations.length : 0
      };
    }
    
    postAssessments.forEach((assessment, index) => {
      const postWounds = getResponseValue(assessment.responses, 'wounds_post');
      const postWoundLocations = getResponseValue(assessment.responses, 'wounds_image_post');
      const woundChange = getResponseValue(assessment.responses, 'wound_change');
      
      analysis.post.push({
        assessment: index + 1,
        hasWounds: postWounds === 0, // 0 = "Ja"
        locations: postWoundLocations || [],
        count: Array.isArray(postWoundLocations) ? postWoundLocations.length : 0,
        change: woundChange
      });
    });
    
    return analysis;
  };

  // Quality of life indicators
  const getQualityOfLife = () => {
    const data = [];
    
    postAssessments.forEach((assessment, index) => {
      const shoeAppearance = getResponseValue(assessment.responses, 'shoe_appearance_post');
      const fitQuality = getResponseValue(assessment.responses, 'fit_quality');
      const walkingQuality = getResponseValue(assessment.responses, 'walking_quality_post');
      const usageSatisfaction = getResponseValue(assessment.responses, 'usage_satisfaction');
      const goalAchieved = getResponseValue(assessment.responses, 'goal_achieved');
      const advantagesOverDisadvantages = getResponseValue(assessment.responses, 'advantages_over_disadvantages');
      
      data.push({
        assessment: `Post ${index + 1}`,
        appearance: shoeAppearance ?? 0,
        fit: fitQuality ?? 0,
        walking: walkingQuality ?? 0,
        satisfaction: usageSatisfaction ?? 0,
        goalAchieved: goalAchieved === 0 ? 1 : 0, // 0 = "Ja"
        advantages: advantagesOverDisadvantages ?? 0
      });
    });
    
    return data;
  };

  // Compliance monitoring
  const getComplianceData = () => {
    const frequencyMap = {
      0: { text: "6-7 Tage/Woche", value: 6.5 },
      1: { text: "4-5 Tage/Woche", value: 4.5 },
      2: { text: "2-3 Tage/Woche", value: 2.5 },
      3: { text: "1 Tag/Woche", value: 1 },
      4: { text: "Nie", value: 0 }
    };
    
    const hoursMap = {
      0: { text: ">12 Stunden", value: 12 },
      1: { text: "8-12 Stunden", value: 10 },
      2: { text: "4-8 Stunden", value: 6 },
      3: { text: "1-4 Stunden", value: 2.5 },
      4: { text: "<1 Stunde", value: 0.5 }
    };
    
    return postAssessments.map((assessment, index) => {
      const frequency = getResponseValue(assessment.responses, 'usage_frequency');
      const hours = getResponseValue(assessment.responses, 'daily_hours');
      const asExpected = getResponseValue(assessment.responses, 'usage_as_expected');
      
      return {
        assessment: `Post ${index + 1}`,
        frequency: frequencyMap[frequency]?.value || 0,
        frequencyText: frequencyMap[frequency]?.text || 'Unknown',
        hours: hoursMap[hours]?.value || 0,
        hoursText: hoursMap[hours]?.text || 'Unknown',
        asExpected: asExpected === 0 ? 'Ja' : asExpected === 1 ? 'Nein' : 'Unbekannt'
      };
    });
  };

  // Get key indicators
  const getKeyIndicators = () => {
    const walkingTrend = getWalkingTrend();
    const woundAnalysis = getWoundAnalysis();
    const qualityData = getQualityOfLife();
    const complianceData = getComplianceData();
    
    const indicators = {
      walkingImprovement: walkingTrend.length > 1 ? 
        walkingTrend[walkingTrend.length - 1].distance > walkingTrend[0].distance : null,
      woundHealing: woundAnalysis.pre.count > 0 && woundAnalysis.post.length > 0 ? 
        woundAnalysis.post[woundAnalysis.post.length - 1].count < woundAnalysis.pre.count : null,
      overallSatisfaction: qualityData.length > 0 ? 
        qualityData[qualityData.length - 1].satisfaction >= 3 : null,
      compliance: complianceData.length > 0 ? 
        complianceData[complianceData.length - 1].frequency >= 4 : null
    };
    
    return indicators;
  };

  const walkingTrend = getWalkingTrend();
  const woundAnalysis = getWoundAnalysis();
  const qualityData = getQualityOfLife();
  const complianceData = getComplianceData();
  const keyIndicators = getKeyIndicators();

  // Tab components
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg ${keyIndicators.walkingImprovement === true ? 'bg-green-50 border-green-200' : keyIndicators.walkingImprovement === false ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gehfähigkeit</p>
              <p className="text-2xl font-bold text-gray-900">
                {keyIndicators.walkingImprovement === true ? 'Verbessert' : 
                 keyIndicators.walkingImprovement === false ? 'Verschlechtert' : 'Unverändert'}
              </p>
            </div>
            {keyIndicators.walkingImprovement === true ? <TrendingUp className="h-8 w-8 text-green-600" /> : 
             keyIndicators.walkingImprovement === false ? <TrendingDown className="h-8 w-8 text-red-600" /> : 
             <Activity className="h-8 w-8 text-gray-600" />}
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${keyIndicators.woundHealing === true ? 'bg-green-50 border-green-200' : keyIndicators.woundHealing === false ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wundheilung</p>
              <p className="text-2xl font-bold text-gray-900">
                {keyIndicators.woundHealing === true ? 'Verbessert' : 
                 keyIndicators.woundHealing === false ? 'Verschlechtert' : 'Stabil'}
              </p>
            </div>
            {keyIndicators.woundHealing === true ? <CheckCircle className="h-8 w-8 text-green-600" /> : 
             keyIndicators.woundHealing === false ? <AlertTriangle className="h-8 w-8 text-red-600" /> : 
             <MapPin className="h-8 w-8 text-gray-600" />}
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${keyIndicators.overallSatisfaction === true ? 'bg-green-50 border-green-200' : keyIndicators.overallSatisfaction === false ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Zufriedenheit</p>
              <p className="text-2xl font-bold text-gray-900">
                {keyIndicators.overallSatisfaction === true ? 'Hoch' : 
                 keyIndicators.overallSatisfaction === false ? 'Niedrig' : 'Unbekannt'}
              </p>
            </div>
            {keyIndicators.overallSatisfaction === true ? <CheckCircle className="h-8 w-8 text-green-600" /> : 
             keyIndicators.overallSatisfaction === false ? <AlertTriangle className="h-8 w-8 text-red-600" /> : 
             <Target className="h-8 w-8 text-gray-600" />}
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${keyIndicators.compliance === true ? 'bg-green-50 border-green-200' : keyIndicators.compliance === false ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance</p>
              <p className="text-2xl font-bold text-gray-900">
                {keyIndicators.compliance === true ? 'Gut' : 
                 keyIndicators.compliance === false ? 'Schlecht' : 'Unbekannt'}
              </p>
            </div>
            {keyIndicators.compliance === true ? <CheckCircle className="h-8 w-8 text-green-600" /> : 
             keyIndicators.compliance === false ? <AlertTriangle className="h-8 w-8 text-red-600" /> : 
             <Clock className="h-8 w-8 text-gray-600" />}
          </div>
        </div>
      </div>

      {/* Walking Distance Trend */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gehfähigkeit Verlauf</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={walkingTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value, name) => [`${value}m`, 'Gehstrecke']} />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const FunctionalTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Funktionale Fortschritte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Gehstrecke Entwicklung</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={walkingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value}m`, 'Gehstrecke']} />
                <Bar dataKey="distance" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Qualitätsindikatoren</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="assessment" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="fit" stroke="#3B82F6" name="Passform" />
                <Line type="monotone" dataKey="walking" stroke="#10B981" name="Gehqualität" />
                <Line type="monotone" dataKey="satisfaction" stroke="#F59E0B" name="Zufriedenheit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const WoundTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Wundmanagement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Wundanzahl Verlauf</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium">Vor Behandlung:</span>
                <span className={`px-2 py-1 rounded text-sm ${woundAnalysis.pre.hasWounds ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {woundAnalysis.pre.hasWounds ? `${woundAnalysis.pre.count} Wunden` : 'Keine Wunden'}
                </span>
              </div>
              
              {woundAnalysis.post.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Nach Behandlung {index + 1}:</span>
                  <span className={`px-2 py-1 rounded text-sm ${post.hasWounds ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {post.hasWounds ? `${post.count} Wunden` : 'Keine Wunden'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Wundlokalisationen</h4>
            <div className="space-y-2">
              {woundAnalysis.pre.hasWounds && (
                <div className="p-3 bg-red-50 rounded">
                  <p className="text-sm font-medium text-red-800">Vor Behandlung:</p>
                  <p className="text-sm text-red-600">{woundAnalysis.pre.locations.join(', ')}</p>
                </div>
              )}
              
              {woundAnalysis.post.map((post, index) => (
                post.hasWounds && (
                  <div key={index} className="p-3 bg-red-50 rounded">
                    <p className="text-sm font-medium text-red-800">Nach Behandlung {index + 1}:</p>
                    <p className="text-sm text-red-600">{post.locations.join(', ')}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ComplianceTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Nutzungshäufigkeit</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="assessment" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} Tage/Woche`, 'Häufigkeit']} />
                <Bar dataKey="frequency" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Tägliche Tragedauer</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="assessment" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} Stunden`, 'Dauer']} />
                <Bar dataKey="hours" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-700 mb-3">Nutzung vs. Erwartung</h4>
          <div className="space-y-2">
            {complianceData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium">{data.assessment}:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  data.asExpected === 'Ja' ? 'bg-green-100 text-green-800' : 
                  data.asExpected === 'Nein' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {data.asExpected === 'Ja' ? 'Wie erwartet' : 
                   data.asExpected === 'Nein' ? 'Nicht wie erwartet' : 'Unbekannt'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const FollowUpTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Empfohlene Nachsorge</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Nächster Nachsorgetermin</h4>
            <p className="text-sm text-blue-800">
              Basierend auf den aktuellen Daten wird ein Nachsorgetermin in 4-6 Wochen empfohlen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Positive Entwicklungen</h4>
              <ul className="text-sm text-green-800 space-y-1">
                {keyIndicators.walkingImprovement === true && <li>✓ Gehfähigkeit verbessert</li>}
                {keyIndicators.woundHealing === true && <li>✓ Wundheilung fortschreitend</li>}
                {keyIndicators.overallSatisfaction === true && <li>✓ Hohe Patientenzufriedenheit</li>}
                {keyIndicators.compliance === true && <li>✓ Gute Compliance</li>}
              </ul>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Warnsignale</h4>
              <ul className="text-sm text-red-800 space-y-1">
                {keyIndicators.walkingImprovement === false && <li>⚠ Verschlechterung der Gehfähigkeit</li>}
                {keyIndicators.woundHealing === false && <li>⚠ Wunden verschlechtern sich</li>}
                {keyIndicators.overallSatisfaction === false && <li>⚠ Niedrige Zufriedenheit</li>}
                {keyIndicators.compliance === false && <li>⚠ Schlechte Compliance</li>}
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Empfohlene Maßnahmen</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Regelmäßige Kontrolle der Wundstellen</li>
              <li>• Überprüfung der Schuhpassform</li>
              <li>• Beratung zur optimalen Nutzung</li>
              <li>• Anpassung der Behandlungsziele bei Bedarf</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Übersicht', icon: Activity },
    { id: 'functional', label: 'Funktional', icon: TrendingUp },
    { id: 'wounds', label: 'Wundmanagement', icon: MapPin },
    { id: 'compliance', label: 'Compliance', icon: Clock },
    { id: 'followup', label: 'Nachsorge', icon: Calendar }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Patientenfortschritt Tracking</h1>
        <p className="mt-2 text-gray-600">
          Überwachung und Analyse der Behandlungsergebnisse für orthopädische Schuhe
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'functional' && <FunctionalTab />}
        {activeTab === 'wounds' && <WoundTab />}
        {activeTab === 'compliance' && <ComplianceTab />}
        {activeTab === 'followup' && <FollowUpTab />}
      </div>
    </div>
  );
};

export default QuestionnaireCompare;