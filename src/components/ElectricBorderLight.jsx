import './ElectricBorderLight.css';

export default function ElectricBorderLight({ 
  children, 
  color = '#7A33FF',
  speed = 1,
  thickness = 2,
  style = {},
  className = ''
}) {
  return (
    <div 
      className={`electric-border-light ${className}`}
      style={{ 
        ...style, 
        '--electric-color': color,
        '--electric-thickness': `${thickness}px`,
        '--electric-speed': `${3 / speed}s`
      }}
    >
      <div className="electric-border-light__glow" />
      <div className="electric-border-light__content">
        {children}
      </div>
    </div>
  );
}
