import EducationCard from '../EducationCard'
import waterSafetyImage from '@assets/generated_images/Water_safety_education_infographic_9307d9c9.png'

export default function EducationCardExample() {
  const handleDownload = () => {
    console.log('Downloading educational material')
    alert('Download started - saving for offline use')
  }
  
  const handlePlay = () => {
    console.log('Playing audio content')
    alert('Playing audio - make sure your volume is on')
  }
  
  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold">Education Materials</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EducationCard
          title="Hand Washing Steps"
          description="Step-by-step guide for proper hand washing technique to prevent water-borne diseases"
          type="infographic"
          language="English"
          imageUrl={waterSafetyImage}
          downloadUrl="/materials/handwashing-en.pdf"
          onDownload={handleDownload}
        />
        
        <EducationCard
          title="Safe Water Preparation"
          description="Learn how to properly boil and purify water for safe drinking"
          type="poster"
          language="অসমীয়া"
          imageUrl={waterSafetyImage}
          downloadUrl="/materials/water-safety-as.pdf"
          onDownload={handleDownload}
        />
        
        <EducationCard
          title="ORS Preparation Guide"
          description="Audio instructions for preparing Oral Rehydration Solution at home"
          type="audio"
          language="বাংলা"
          audioUrl="/audio/ors-preparation-bn.mp3"
          onPlay={handlePlay}
          onDownload={handleDownload}
        />
        
        <EducationCard
          title="Disease Prevention Tips"
          description="Essential tips for preventing water-borne diseases in rural communities"
          type="infographic"
          language="हिन्दी"
          downloadUrl="/materials/prevention-hi.pdf"
          onDownload={handleDownload}
        />
        
        <EducationCard
          title="Emergency Response"
          description="What to do during a health emergency or disease outbreak"
          type="poster"
          language="English"
          downloadUrl="/materials/emergency-en.pdf"
          onDownload={handleDownload}
        />
        
        <EducationCard
          title="Community Health Guidelines"
          description="Audio guide for community health practices and monitoring"
          type="audio"
          language="অসমীয়া"
          audioUrl="/audio/community-health-as.mp3"
          onPlay={handlePlay}
          onDownload={handleDownload}
        />
      </div>
    </div>
  )
}