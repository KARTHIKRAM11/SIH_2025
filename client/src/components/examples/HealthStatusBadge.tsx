import HealthStatusBadge from '../HealthStatusBadge'

export default function HealthStatusBadgeExample() {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Health Status Badges</h3>
        <div className="flex flex-wrap gap-4">
          <HealthStatusBadge status="safe" />
          <HealthStatusBadge status="caution" />
          <HealthStatusBadge status="risk" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Different Sizes</h4>
        <div className="flex flex-wrap gap-4 items-center">
          <HealthStatusBadge status="safe" size="sm" />
          <HealthStatusBadge status="caution" size="default" />
          <HealthStatusBadge status="risk" size="lg" />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Without Icons</h4>
        <div className="flex flex-wrap gap-4">
          <HealthStatusBadge status="safe" showIcon={false} />
          <HealthStatusBadge status="caution" showIcon={false} />
          <HealthStatusBadge status="risk" showIcon={false} />
        </div>
      </div>
    </div>
  )
}