import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import GlassLogo from "@/components/GlassLogo";
import KXPathDashboard from "@/components/KXPathDashboard";
import SmartKXDashboard from "@/components/SmartKXDashboard";
import SmartServicesHub from "@/components/SmartServicesHub";
import AIDesignHub from "@/components/AIDesignHub";
import LiveMarketData from "@/components/LiveMarketData";
import SmartSniperRadar from "@/components/SmartSniperRadar";
import ProjectManagement from "@/components/ProjectManagement";
import LiveSiteFeed from "@/components/LiveSiteFeed";
import FinanceContracts from "@/components/FinanceContracts";
import PremiumZone from "@/components/PremiumZone";
import ResearcherHub from "@/components/ResearcherHub";
import FieldTeamDashboard from "@/components/FieldTeamDashboard";

import UAESmartMap from "@/components/UAESmartMap";
import UAESmartTerrain from "@/components/UAESmartTerrain";
import StunningUAEMap from "@/components/StunningUAEMap";
import UltimateLiveMap from "@/components/UltimateLiveMap";
import SmartUAERadar from "@/components/SmartUAERadar";
import SmartOpportunityHunter from "@/components/SmartOpportunityHunter";
import CompetitiveIntelligence from "@/components/CompetitiveIntelligence";
import MarketScanner from "@/components/MarketScanner";
import SmartTerritoryIntelligence from "@/components/SmartTerritoryIntelligence";
import NooxAIDesignHub from "@/components/NooxAIDesignHub";
import MasterControlCenter from "@/components/MasterControlCenter";

export default function KXPathOS() {
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const [activeModule, setActiveModule] = useState("master-control");

  const [userRole, setUserRole] = useState<
    "admin" | "client" | "premium" | "field" | "researcher"
  >("admin");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  // Show splash screen first

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const renderContent = () => {
    switch (activeModule) {
      case "master-control":
        return (
          <MasterControlCenter
            language={language}
            onModuleSelect={handleModuleSelect}
          />
        );
      case "smart-territory":
        return <SmartTerritoryIntelligence language={language} />;
      case "noox-ai":
        return <NooxAIDesignHub language={language} />;
      case "services":
        return <SmartServicesHub language={language} userRole={userRole} />;
      case "ai-hub":
        return <AIDesignHub language={language} />;
      case "market-data":
        return <LiveMarketData language={language} />;
      case "smart-sniper":
        return <SmartSniperRadar language={language} />;
      case "uae-radar":
        return <SmartUAERadar language={language} />;
      case "uae-map":
        return <UAESmartMap language={language} />;
      case "opportunity-hunter":
        return <SmartOpportunityHunter language={language} />;
      case "competitive-intelligence":
        return <CompetitiveIntelligence language={language} />;
      case "market-scanner":
        return <MarketScanner language={language} />;
      case "projects":
        return <ProjectManagement language={language} userRole={userRole} />;
      case "live-feed":
        return <LiveSiteFeed language={language} />;
      case "finance":
        return <FinanceContracts language={language} userRole={userRole} />;
      case "premium":
        return <PremiumZone language={language} />;
      case "research":
        return <ResearcherHub language={language} />;
      case "field":
        return <FieldTeamDashboard language={language} />;
      default:
        return (
          <MasterControlCenter
            language={language}
            onModuleSelect={handleModuleSelect}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white ${language === "ar" ? "font-arabic" : ""}`}
    >
      {/* Advanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main Gradient Orbs */}
        <div className="absolute left-[200px] top-[-128px] w-[400px] h-[500px] rounded-full bg-gradient-to-b from-emerald-400/20 to-teal-400/10 blur-[200px] animate-pulse" />
        <div
          className="absolute right-[100px] top-[-100px] w-[300px] h-[400px] rounded-full bg-gradient-to-b from-green-400/15 to-emerald-400/5 blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Nature Elements */}
        <div
          className="absolute top-20 left-1/4 w-6 h-6 text-emerald-400/20 animate-bounce text-2xl"
          style={{ animationDelay: "1s" }}
        >
          🌿
        </div>
        <div
          className="absolute top-40 right-1/3 w-4 h-4 text-green-400/15 animate-bounce text-xl"
          style={{ animationDelay: "2s" }}
        >
          🍃
        </div>
        <div
          className="absolute bottom-40 left-1/3 w-8 h-8 text-teal-400/20 animate-bounce text-3xl"
          style={{ animationDelay: "3s" }}
        >
          🌱
        </div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Glass Logo Header */}
        <div className="px-6 py-4">
          <GlassLogo language={language} />
        </div>

        {/* Original Header for controls */}
        <div className="px-6 py-2 border-b border-emerald-400/20 bg-black/10 backdrop-blur-lg">
          <div
            className={`flex items-center justify-between ${language === "ar" ? "flex-row-reverse" : ""}`}
          >
            <div></div>
            <div className="flex items-center gap-4">
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "العربية" : "English"}
              </Button>
            </div>
          </div>
        </div>

        {/* Ultimate Live Interactive Map - Always at Top */}
        <div className="px-6 py-4">
          <UltimateLiveMap language={language} />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-72 bg-black/20 backdrop-blur-lg border-r border-emerald-400/20">
            <Sidebar
              language={language}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              appType="kxpath"
              userRole={userRole}
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
        </div>
      </div>

      {/* Global KX PATH Branding */}
      <div className="fixed bottom-4 right-4 z-30 bg-black/40 backdrop-blur-lg rounded-full px-4 py-2 border border-emerald-400/30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">KX</span>
          </div>
          <span className="text-emerald-300 text-sm font-medium">
            KX PATH - الحيّ الذكي v2.0
          </span>
        </div>
      </div>
    </div>
  );
}
