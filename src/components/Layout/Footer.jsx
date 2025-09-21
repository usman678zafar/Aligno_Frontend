import React from "react";
import {
  Code2,
  Heart,
  ExternalLink,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Globe,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto relative">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
      </div>

      <div className="backdrop-blur-xl bg-black/30 border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo and Company Info */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  Powered by
                </span>
                <a
                  href="https://nexusnao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:scale-105 transition-all duration-300"
                  aria-label="NexusNao - Software Solutions Company"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30 group-hover:border-blue-400/50 transition-all group-hover:drop-shadow-[0_0_15px_rgba(30,136,229,0.5)]">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      NexusNao
                    </span>
                  </div>
                </a>
              </div>

              <p className="text-xs text-gray-500 text-center lg:text-left max-w-sm">
                Aligno - Aligning careers with opportunities through intelligent
                AI
              </p>
            </div>

            {/* Center - Features/Stats */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">AI Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">Perfect Alignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">ATS Optimized</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 flex items-center gap-1">
                Built with{" "}
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                by NexusNao Team
              </p>
            </div>

            {/* Right Side - Social Links */}
            <div className="flex flex-col items-center lg:items-end gap-4">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/nexusnao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://linkedin.com/company/nexusnao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="mailto:support@nexusnao.com"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://nexusnao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  aria-label="Website"
                >
                  <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright & Legal */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500 text-center md:text-left">
                © {new Date().getFullYear()} Aligno by NexusNao Software
                Solutions. All rights reserved.
              </p>

              <div className="flex items-center gap-6 text-xs">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 transition-colors hover:underline"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 transition-colors hover:underline"
                >
                  Terms of Service
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 transition-colors hover:underline"
                >
                  Cookie Policy
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Code2 className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">Aligno v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
