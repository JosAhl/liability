'use client'
import Button from '@/components/Button';

export default function RegistrationSuccessPage() {
  return (
    
    <div className="success-container">
      <img src="/logo.svg" alt="Yrgo logo" />
      <div className="success-message">
        <img src="/logo.svg" alt="Yrgo logo" />
        <h5>Redo för att hitta spännande praktikplatser!</h5>
      </div>
      
      <div className="success-actions">
        <Button 
          text="Go to Login" 
          className="primary" 
          variant="default" 
          color="blue" 
          href="/login"
        />
        <Button 
          text="Return to Home" 
          className="secondary" 
          variant="default" 
          href="/"
        />
      </div>
    </div>
  );
}