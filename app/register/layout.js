export default function RegisterLayout({ children }) {
    return (
      <div className="registration-layout">
        <div className="registration-progress-container">
          {/* We can add the progress indicator here */}
        </div>
        
        <div className="registration-content">
          {children}
        </div>
      </div>
    );
  }