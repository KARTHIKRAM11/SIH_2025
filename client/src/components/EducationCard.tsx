import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Download, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface EducationCardProps {
  title: string
  description: string
  type: "poster" | "infographic" | "audio"
  language: string
  imageUrl?: string
  downloadUrl?: string
  audioUrl?: string
  onDownload?: () => void
  onPlay?: () => void
  className?: string
}

export default function EducationCard({ 
  title, 
  description, 
  type, 
  language,
  imageUrl,
  downloadUrl,
  audioUrl,
  onDownload,
  onPlay,
  className 
}: EducationCardProps) {
  const typeConfig = {
    poster: { icon: BookOpen, bgColor: "bg-blue-50 dark:bg-blue-950/20" },
    infographic: { icon: BookOpen, bgColor: "bg-green-50 dark:bg-green-950/20" },
    audio: { icon: Volume2, bgColor: "bg-purple-50 dark:bg-purple-950/20" },
  }
  
  const config = typeConfig[type]
  const Icon = config.icon
  
  return (
    <Card 
      className={cn(
        "overflow-hidden border-2 hover-elevate transition-all duration-200",
        config.bgColor,
        className
      )}
      data-testid={`card-education-${type}`}
    >
      {imageUrl && (
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
            data-testid="img-education-content"
          />
        </div>
      )}
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start space-x-3">
          <div className={cn("p-2 rounded-lg", config.bgColor)}>
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground leading-tight" data-testid="text-education-title">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs bg-muted px-2 py-1 rounded">
                {language}
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded capitalize">
                {type}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 pt-2">
          {type === "audio" && audioUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log('Playing audio:', audioUrl)
                onPlay?.()
              }}
              className="flex-1"
              data-testid="button-play-audio"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Play
            </Button>
          )}
          
          {(downloadUrl || onDownload) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log('Downloading:', downloadUrl)
                onDownload?.()
              }}
              className={cn(type === "audio" ? "flex-1" : "w-full")}
              data-testid="button-download"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}