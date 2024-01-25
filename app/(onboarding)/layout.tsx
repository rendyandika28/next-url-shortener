import AppToast from '@/components/app/toast';
import './style.scss'
export default function OnboardingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="onboarding">
        <div className="onboarding__card">
          {children}
        </div>
      </main>
      <AppToast />
    </>
  )
}
