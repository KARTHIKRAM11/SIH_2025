import { useState } from 'react'
import LanguageSelector from '../LanguageSelector'

export default function LanguageSelectorExample() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold">Language Selection</h3>
      
      <div className="space-y-4 max-w-sm">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={(lang) => {
            setSelectedLanguage(lang)
            console.log('Language changed to:', lang)
          }}
        />
        
        <div className="p-3 bg-muted/30 rounded">
          <p className="text-sm font-medium">Selected Language:</p>
          <p className="text-sm text-muted-foreground">{selectedLanguage}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Test different languages:</p>
          <div className="grid grid-cols-2 gap-2">
            {["en", "as", "bn", "hi"].map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className="text-xs p-2 border rounded hover-elevate"
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}