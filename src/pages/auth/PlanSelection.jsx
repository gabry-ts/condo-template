import { useNavigate } from 'react-router-dom'
import { Check, X, Crown } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../context/AuthContext'
import { plans } from '../../data/plans'

export default function PlanSelection() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSelect = (planId) => {
    login('admin')
    navigate('/studio/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <Badge variant="primary" className="mb-4 text-lg font-bold px-4 py-2">DM</Badge>
          <h1 className="text-3xl font-bold text-white mb-2">Scegli il tuo piano</h1>
          <p className="text-primary-100">
            Inizia gratis e passa a Pro quando vuoi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Freemium */}
          <Card className="shadow-xl flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{plans.free.name}</CardTitle>
              <CardDescription>{plans.free.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">
                  EUR {plans.free.price}
                </span>
                <span className="text-gray-500">/{plans.free.period}</span>
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plans.free.features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2.5 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-success-500 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300 shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => handleSelect('free')}
              >
                Inizia Gratis
              </Button>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card variant="elevated" className="shadow-xl flex flex-col ring-2 ring-primary-400">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{plans.pro.name}</CardTitle>
                <Badge variant="accent">
                  <Crown className="h-3 w-3" />
                  {plans.pro.badge}
                </Badge>
              </div>
              <CardDescription>{plans.pro.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">
                  EUR {plans.pro.price}
                </span>
                <span className="text-gray-500">/{plans.pro.period}</span>
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plans.pro.features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2.5 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-success-500 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300 shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant="pro"
                size="lg"
                className="w-full"
                onClick={() => handleSelect('pro')}
              >
                <Crown className="h-4 w-4" />
                Prova Pro Gratis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
