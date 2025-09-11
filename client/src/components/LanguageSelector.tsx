import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"
import { useState } from "react"

interface Language {
  code: string
  name: string
  nativeName: string
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
]

interface LanguageSelectorProps {
  selectedLanguage: string
  onLanguageChange: (language: string) => void
  disabled?: boolean
  className?: string
}

export default function LanguageSelector({ 
  selectedLanguage = "en",
  onLanguageChange,
  disabled = false,
  className 
}: LanguageSelectorProps) {
  const selectedLang = languages.find(lang => lang.code === selectedLanguage)
  
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select 
        value={selectedLanguage} 
        onValueChange={onLanguageChange}
        disabled={disabled}
      >
        <SelectTrigger 
          className={className}
          data-testid="select-language"
        >
          <SelectValue>
            {selectedLang ? (
              <span className="flex items-center space-x-2">
                <span>{selectedLang.nativeName}</span>
                <span className="text-xs text-muted-foreground">({selectedLang.name})</span>
              </span>
            ) : (
              "Select Language"
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem 
              key={language.code} 
              value={language.code}
              data-testid={`option-language-${language.code}`}
            >
              <span className="flex items-center space-x-2">
                <span>{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">({language.name})</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}