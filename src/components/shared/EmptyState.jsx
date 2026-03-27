import Button from '../ui/Button'

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction, positive = false }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 max-w-[300px] mb-6">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}
