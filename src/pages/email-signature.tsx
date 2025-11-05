import { Mail, Phone, Globe, MapPin, Download } from "lucide-react";
import unbLogo from "@assets/University_of_New_Brunswick_Logo.svg_1755912478863.png";
import irvingLogo from "@assets/Irving_Oil.svg_1755913265895.png";
import rbcLogo from "@assets/RBC-Logo_1755913716813.png";
import tdLogo from "@assets/Toronto-Dominion_Bank_logo.svg_1755913265896.png";
import bmoLogo from "@assets/BMO_Logo.svg_1755913265896.png";
import fiscalLogo from "@assets/fiscal_ai_logo_new.png";
import profileImage from "@assets/Untitled design (1)_1755896187722.png";
import stringsLogo from "@assets/73-strings-logo.webp";
import mcgillLogo from "@assets/mcgill_1755923720192.png";
import queensLogo from "@assets/queens_university_logo.png";
import rotmanLogo from "@assets/rotman.png";
import { ReactNode, useRef, useState } from "react";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function EmailSignature() {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const signatureRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const emails = [
    'tyler@tylerbustard.ca',
    'tbustard@unb.ca',
    't.bustard@unb.ca',
    'tyler.bustard@gmail.com',
    'tbustard@icloud.com',
    'tylerwaynebustard@icloud.com',
  ];

  const signatureCardClassName = "inline-block w-fit bg-white px-3 py-1";

  const SignatureCard = ({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) => (
    <div className={`flex justify-center${className ? ` ${className}` : ""}`}>
      <div className="inline-block">
        <div
          className={signatureCardClassName}
          ref={(el) => {
            signatureRefs.current[id] = el;
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
  
  const downloadAllSignatures = async () => {
    setIsDownloading(true);
    const zip = new JSZip();
    
    try {
      // Create a folder for each signature type
      const signatures = [
        // UNB Personal
        ...emails.map(email => ({ id: `unb-personal-${email}`, name: `UNB-${email.replace('@', '_at_').replace('.', '_')}.png` })),
        // UNB Professional
        { id: 'unb-professional-tyler@tylerbustard.ca', name: 'UNB-tyler_at_tylerbustard_ca.png' },
        // McGill Personal
        ...['tbustard@unb.ca', 't.bustard@unb.ca', 'tyler@tylerbustard.ca', 'tyler.bustard@gmail.com', 'tbustard@icloud.com', 'tylerwaynebustard@icloud.com'].map(
          email => ({ id: `mcgill-personal-${email}`, name: `McGill-${email.replace('@', '_at_').replace('.', '_')}.png` })
        ),
        // McGill Professional
        { id: 'mcgill-professional-tyler@tylerbustard.com', name: 'McGill-tyler_at_tylerbustard_com.png' },
        // UofT Personal
        ...[
          'tyler.bustard@rotman.utoronto.ca',
          'tyler.bustard@mail.utoronto.ca',
          'tbustard@unb.ca',
          't.bustard@unb.ca',
          'tyler@tylerbustard.ca',
          'tyler.bustard@gmail.com',
          'tbustard@icloud.com',
          'tylerwaynebustard@icloud.com',
        ].map(email => ({ id: `uoft-personal-${email}`, name: `UofT-${email.replace('@', '_at_').replace('.', '_')}.png` })),
        // UofT Professional
        { id: 'uoft-professional-tyler@tylerbustard.info', name: 'UofT-tyler_at_tylerbustard_info.png' },
        // Queens Personal
        ...['tbustard@unb.ca', 't.bustard@unb.ca', 'tyler@tylerbustard.ca', 'tyler.bustard@gmail.com', 'tbustard@icloud.com', 'tylerwaynebustard@icloud.com'].map(
          email => ({ id: `queens-personal-${email}`, name: `Queens-${email.replace('@', '_at_').replace('.', '_')}.png` })
        ),
        // Queens Professional
        { id: 'queens-professional-tyler@tylerbustard.net', name: 'Queens-tyler_at_tylerbustard_net.png' },
        // 73 Strings
        ...['tyler@tylerbustard.ca', 'tyler.bustard@gmail.com', 'tbustard@icloud.com'].map(
          email => ({ id: `73strings-personal-${email}`, name: `73Strings-${email.replace('@', '_at_').replace('.', '_')}.png` })
        ),
        { id: '73strings-professional-tyler.bustard@73strings.com', name: '73Strings-tyler_bustard_at_73strings_com.png' },
      ];
      
      for (const sig of signatures) {
        const element = signatureRefs.current[sig.id];
        if (element) {
          try {
            const rect = element.getBoundingClientRect();
            const width = Math.max(1, Math.ceil(rect.width));
            const height = Math.max(1, Math.ceil(rect.height));
            const pixelRatio = Math.max(window.devicePixelRatio || 1, 3);
            const dataUrl = await toPng(element, {
              cacheBust: true,
              pixelRatio,
              backgroundColor: '#ffffff',
              width,
              height,
              style: {
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }
            });
            
            // Convert data URL to blob
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            zip.file(sig.name, blob);
          } catch (error) {
            console.error(`Failed to capture signature ${sig.id}:`, error);
          }
        }
      }
      
      // Generate and download zip
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'email-signatures.zip');
      
      toast({
        title: "Success!",
        description: "All email signatures have been downloaded.",
      });
    } catch (error) {
      console.error('Error downloading signatures:', error);
      toast({
        title: "Error",
        description: "Failed to download signatures. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const SignatureBlock = ({ email, website, logos, role = 'Finance & Technology Professional', org, phone = '+1 (613) 985-1223', location, isStrings = false }: { email: string; website: string; logos: string[]; role?: string; org?: string; phone?: string; location?: string; isStrings?: boolean }) => (
    <div className="flex">
      {/* Content */}
      <div className="flex-1">
        <div className="p-0">
          <p className="text-[16px] font-bold text-gray-900 mb-2">Sincerely,</p>
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src={profileImage} alt="Tyler Bustard" className="w-14 h-14 rounded-xl object-cover border border-gray-200" />
              <div>
                <h1 className="text-xl font-extrabold text-gray-900 leading-tight tracking-tight">Tyler Bustard</h1>
                <p className="text-[13px] text-blue-700 font-semibold leading-snug">{role}</p>
                {org ? (
                  <p className="text-[13px] text-gray-700 leading-snug">{org}</p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Contact */}
          <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[13px]">
            <li className="shrink-0">
              <a href={`tel:${phone.replace(/[\s()]/g, '')}`} className="group inline-flex items-center gap-2 text-gray-800 hover:text-blue-700 whitespace-nowrap align-middle">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-700 border border-blue-100 group-hover:bg-blue-100 shrink-0">
                  <Phone size={12} />
                </span>
                <span className="leading-5">{phone}</span>
              </a>
            </li>
            <li className="shrink-0">
              <a href={`mailto:${email}`} className="group inline-flex items-center gap-2 text-gray-800 hover:text-blue-700 whitespace-nowrap align-middle">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-700 border border-blue-100 group-hover:bg-blue-100 shrink-0">
                  <Mail size={12} />
                </span>
                <span className="leading-5">{email}</span>
              </a>
            </li>
            <li className="shrink-0">
              <a href={`https://${website}`} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-gray-800 hover:text-blue-700 whitespace-nowrap align-middle">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-700 border border-blue-100 group-hover:bg-blue-100 shrink-0">
                  <Globe size={12} />
                </span>
                <span className="leading-5">{website}</span>
              </a>
            </li>
            {location && (
              <li className="shrink-0">
                <span className="inline-flex items-center gap-2 text-gray-800 whitespace-nowrap align-middle">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                    <MapPin size={12} />
                  </span>
                  <span className="leading-5">{location}</span>
                </span>
              </li>
            )}
          </ul>

          {/* Divider */}
          <div className="mt-4 h-px bg-gray-200 w-3/4 md:w-2/3" />

          {/* Logos */}
          <div className="mt-3 flex flex-wrap items-center gap-4 sm:gap-5">
            {logos.map((src, i) => {
              const isQueens = src === queensLogo;
              const is73Strings = isStrings && src === stringsLogo;
              const sizeClass = isQueens ? 'h-12 sm:h-14' : is73Strings ? 'h-10 sm:h-12' : 'h-7 sm:h-8';
              return <img key={i} src={src} alt="logo" className={`${sizeClass} w-auto align-middle`} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen flex justify-center px-4 py-12" style={{ backgroundColor: '#f5f5f7' }}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Email Signature Generator</h1>
          <p className="text-gray-600 text-lg">Professional email signatures matching your website design</p>
        </div>

        {/* Download Button */}
        <div className="mb-8 text-center">
          <Button
            onClick={downloadAllSignatures}
            disabled={isDownloading}
            size="lg"
            className="inline-flex items-center gap-2"
            data-testid="button-download-signatures"
          >
            <Download size={16} />
            {isDownloading ? 'Downloading...' : 'Download All Signatures'}
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">University of New Brunswick - tylerbustard.ca</h2>
        </div>
        
        {/* Personal Emails */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Personal Emails</h3>
        </div>
        
        {emails.map((email, idx) => (
          <SignatureCard key={email} id={`unb-personal-${email}`} className={idx === 0 ? undefined : 'mt-8'}>
            <SignatureBlock email={email} website={'tylerbustard.ca'} logos={[unbLogo, irvingLogo, rbcLogo, tdLogo, bmoLogo, fiscalLogo, stringsLogo]} role={'Senior Associate, Portfolio Monitoring'} org={'73 Strings'} />
          </SignatureCard>
        ))}
        
        {/* Professional Email */}
        <div className="text-center mt-14 mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Professional Email</h3>
        </div>
        
        <SignatureCard id={'unb-professional-tyler@tylerbustard.ca'}>
          <SignatureBlock email={'tyler@tylerbustard.ca'} website={'tylerbustard.ca'} logos={[unbLogo, irvingLogo, rbcLogo, tdLogo, bmoLogo, fiscalLogo, stringsLogo]} role={'Senior Associate, Portfolio Monitoring'} org={'73 Strings'} />
        </SignatureCard>

        {/* McGill Section */}
        <div className="text-center mt-14 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">McGill University - tylerbustard.com</h2>
        </div>

        {/* Personal Emails */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Personal Emails</h3>
        </div>

        {[
          'tbustard@unb.ca',
          't.bustard@unb.ca',
          'tyler@tylerbustard.ca',
          'tyler.bustard@gmail.com',
          'tbustard@icloud.com',
          'tylerwaynebustard@icloud.com',
        ].map((email, idx) => (
          <SignatureCard key={`mcgill-${email}`} id={`mcgill-personal-${email}`} className={idx === 0 ? undefined : 'mt-8'}>
            <SignatureBlock email={email} website={'tylerbustard.com'} logos={[unbLogo, irvingLogo, rbcLogo, tdLogo, bmoLogo, stringsLogo, mcgillLogo]} />
          </SignatureCard>
        ))}
        
        {/* Professional Email */}
        <div className="text-center mt-14 mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Professional Email</h3>
        </div>
        
        <SignatureCard id={'mcgill-professional-tyler@tylerbustard.com'}>
          <SignatureBlock email={'tyler@tylerbustard.com'} website={'tylerbustard.com'} logos={[unbLogo, irvingLogo, rbcLogo, tdLogo, bmoLogo, fiscalLogo, stringsLogo, mcgillLogo]} role={'Senior Associate, Portfolio Monitoring'} org={'73 Strings'} />
        </SignatureCard>

        {/* University of Toronto Section */}
        <div className="text-center mt-14 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">University of Toronto - tylerbustard.info</h2>
        </div>

        {/* Personal Emails */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Personal Emails</h3>
        </div>

        {[
          'tyler.bustard@rotman.utoronto.ca',
          'tyler.bustard@mail.utoronto.ca',
          'tbustard@unb.ca',
          't.bustard@unb.ca',
          'tyler@tylerbustard.ca',
          'tyler.bustard@gmail.com',
          'tbustard@icloud.com',
          'tylerwaynebustard@icloud.com',
        ].map((email, idx) => (
          <SignatureCard key={`uoft-${email}`} id={`uoft-personal-${email}`} className={idx === 0 ? undefined : 'mt-8'}>
            <SignatureBlock email={email} website={'tylerbustard.info'} logos={[unbLogo, irvingLogo, rbcLogo, tdLogo, bmoLogo, stringsLogo, rotmanLogo]} />
          </SignatureCard>
        ))}
        
        {/* Professional Email */}
        <div className="text-center mt-14 mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Professional Email</h3>
        </div>
        
        <SignatureCard id={'uoft-professional-tyler@tylerbustard.info'}>
          <SignatureBlock email={'tyler@tylerbustard.info'} website={'tylerbustard.info'} logos={[unbLogo, irvingLogo, rbcLogo, tdLogo, bmoLogo, fiscalLogo, stringsLogo, rotmanLogo]} role={'Senior Associate, Portfolio Monitoring'} org={'73 Strings'} />
        </SignatureCard>

        {/* Queens Section */}
        <div className="text-center mt-14 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Queens University - tylerbustard.net</h2>
        </div>

        {/* Personal Emails */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Personal Emails</h3>
        </div>

        {[
          'tbustard@unb.ca',
          't.bustard@unb.ca',
          'tyler@tylerbustard.ca',
          'tyler.bustard@gmail.com',
          'tbustard@icloud.com',
          'tylerwaynebustard@icloud.com',
        ].map((email, idx) => (
          <SignatureCard key={`queens-${email}`} id={`queens-personal-${email}`} className={idx === 0 ? undefined : 'mt-8'}>
            <SignatureBlock email={email} website={'tylerbustard.net'} logos={[unbLogo, irvingLogo, rbcLogo, tdLogo, bmoLogo, stringsLogo, queensLogo]} />
          </SignatureCard>
        ))}
        
        {/* Professional Email */}
        <div className="text-center mt-14 mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Professional Email</h3>
        </div>
        
        <SignatureCard id={'queens-professional-tyler@tylerbustard.net'}>
          <SignatureBlock email={'tyler@tylerbustard.net'} website={'tylerbustard.net'} logos={[unbLogo, irvingLogo, rbcLogo, tdLogo, bmoLogo, fiscalLogo, stringsLogo, queensLogo]} role={'Senior Associate, Portfolio Monitoring'} org={'73 Strings'} />
        </SignatureCard>

        {/* 73 Strings Section */}
        <div className="text-center mt-14 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">73 Strings - Professional Email Signature</h2>
        </div>

        {/* Personal Emails */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Personal Emails</h3>
        </div>

        {[
          'tyler@tylerbustard.ca',
          'tyler.bustard@gmail.com',
          'tbustard@icloud.com',
        ].map((email, idx) => (
          <SignatureCard key={`73strings-personal-${email}`} id={`73strings-personal-${email}`} className={idx === 0 ? undefined : 'mt-8'}>
            {/* Clean Professional Layout */}
            <div className="flex">
              <div className="flex-1">
                <div className="p-0">
                  <p className="text-[16px] font-bold text-gray-900 mb-2">Sincerely,</p>
                  
                  {/* Main Signature Layout - Compact Side-by-Side */}
                  <div className="flex items-stretch gap-1.5">
                    {/* Left: Personal Info */}
                    <div className="flex items-start gap-2">
                      <img src={profileImage} alt="Tyler Bustard" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                      <div>
                        <h1 className="text-[16px] font-bold text-gray-900 leading-tight">Tyler Bustard</h1>
                        <p className="text-[13px] text-gray-600">Senior Associate, Portfolio Monitoring</p>
                        
                        {/* Personal Contact */}
                        <div className="mt-1.5 flex flex-col gap-0.5">
                          <a href={`mailto:${email}`} className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-blue-600">
                            <Mail size={11} className="text-gray-400" />
                            <span>{email}</span>
                          </a>
                          <a href="tel:+16139851223" className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-blue-600">
                            <Phone size={11} className="text-gray-400" />
                            <span>+1 (613) 985-1223</span>
                          </a>
                          <a href="https://tylerbustard.net" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-blue-600">
                            <Globe size={11} className="text-gray-400" />
                            <span>tylerbustard.net</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Divider - Full Height */}
                    <div className="self-stretch w-px bg-gray-200 mx-1.5"></div>

                    {/* Right: Company Info */}
                    <div>
                      <img src={stringsLogo} alt="73 Strings" className="h-10 w-auto mb-2" />
                      
                      {/* Company Contact */}
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                          <Phone size={11} className="text-gray-400" />
                          <span>+1 (416) 728-2030</span>
                        </div>
                        <a href="https://www.73strings.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-blue-600">
                          <Globe size={11} className="text-gray-400" />
                          <span>www.73strings.com</span>
                        </a>
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                          <MapPin size={11} className="text-gray-400" />
                          <span>Toronto, Ontario</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SignatureCard>
        ))}

        {/* Professional Email */}
        <div className="text-center mt-14 mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Professional Email</h3>
        </div>

        <SignatureCard id={'73strings-professional-tyler.bustard@73strings.com'}>
          {/* Clean Professional Layout for tyler.bustard@73strings.com */}
          <div className="flex">
            <div className="flex-1">
              <div className="p-0">
                <p className="text-[16px] font-bold text-gray-900 mb-2">Sincerely,</p>
                
                {/* Main Signature Layout - Compact Side-by-Side */}
                <div className="flex items-start gap-1.5">
                  {/* Left: Personal Info */}
                  <div className="flex items-start gap-2">
                    <img src={profileImage} alt="Tyler Bustard" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                    <div>
                      <h1 className="text-[16px] font-bold text-gray-900 leading-tight">Tyler Bustard</h1>
                      <p className="text-[13px] text-gray-600">Senior Associate, Portfolio Monitoring</p>
                      
                      {/* Personal Contact */}
                      <div className="mt-1.5 flex flex-col gap-0.5">
                        <a href="mailto:tyler.bustard@73strings.com" className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-blue-600">
                          <Mail size={11} className="text-gray-400" />
                          <span>tyler.bustard@73strings.com</span>
                        </a>
                        <a href="tel:+16139851223" className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-blue-600">
                          <Phone size={11} className="text-gray-400" />
                          <span>+1 (613) 985-1223</span>
                        </a>
                        <a href="https://tylerbustard.net" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-blue-600">
                          <Globe size={11} className="text-gray-400" />
                          <span>tylerbustard.net</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-24 w-px bg-gray-200 mx-1.5"></div>

                  {/* Right: Company Info */}
                  <div>
                    <img src={stringsLogo} alt="73 Strings" className="h-10 w-auto mb-2" />
                    
                    {/* Company Contact */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 text-[12px] text-gray-600">
                        <Phone size={11} className="text-gray-400" />
                        <span>+1 (416) 728-2030</span>
                      </div>
                      <a href="https://www.73strings.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-blue-600">
                        <Globe size={11} className="text-gray-400" />
                        <span>www.73strings.com</span>
                      </a>
                      <div className="flex items-center gap-2 text-[12px] text-gray-600">
                        <MapPin size={11} className="text-gray-400" />
                        <span>Toronto, Ontario</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SignatureCard>
        
      </div>
    </div>
  );
}

