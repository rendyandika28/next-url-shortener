interface TypeButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  text: string
  icon?: React.ReactNode
  variant?: 'btn-outline'
  color?: 'btn-neutral' | 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-ghost' | 'btn-link'
}

const AppButton: React.FC<TypeButton> = ({ loading = false, text = '', variant = '', color = '', className = '', icon, ...props }) => {
  const customClass = ['btn', variant, color, className].join(' ')

  return (
    <button disabled={loading} type="button" className={`${customClass} disabled:bg-neutral-800 disabled:text-gray-300`} {...props}>
      {loading && <span className={`loading loading-spinner ${icon && 'size-3'}`}></span>}
      {!loading && icon}
      {text}
    </button>
  );
}

export default AppButton;
