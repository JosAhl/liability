'use client'
import Button from "@/components/Button";

export default function RegisterPage() {
    return (
      <div className="registration-container">
        <img src="/logo.svg" alt="Yrgo logo" />
        <p>Är du student eller företag? *</p>
        
        <div className="user-type-selection">
          <Button 
            text="Student" 
            className="primary" 
            variant="default" 
            color="blue" 
            href="/register/student/personal-info"
          />
          
          <Button 
            text="Företag" 
            className="primary" 
            variant="default" 
            color="blue" 
            href="/register/company/company-info"
          />
        </div>
      </div>
    );
  }