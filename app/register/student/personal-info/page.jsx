'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import CheckboxButtons from '@/components/CheckboxButtons';

export default function StudentPersonalInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    telephone_number: '',
    password: '',
    field: []
  });

  const field = ['Digital Design', 'Webbutveckling']

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [name]: [...prev[name], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: prev[name].filter(item => item !== value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save data to localStorage or session storage
    localStorage.setItem('studentFormData', JSON.stringify(formData));
    
    // Navigate to next step
    router.push('/register/student/software-preferences');
  };

  return (
    <div className="form-container">
      <h5>Namn</h5>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">Förnamn *</label>
          <input 
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="last_name">Efternamn (frivilligt)</label>
          <input 
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="telephone_number">Telefonnummer (frivilligt)</label>
          <input 
            type="tel"
            id="telephone_number"
            name="telephone_number"
            value={formData.telephone_number}
            onChange={handleChange}
          />
        </div>

        <h5>Skapa konto</h5>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Lösenord *</label>
          <input 
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p>Måste innehålla minst 12 tecken</p>
        </div>

        <h5>Vad pluggar du? *</h5>

        <div className="form-group">
          <CheckboxButtons
          options={field}
          name="field"
          selectedValues={formData.field || []}
          onChange={handleCheckboxChange}
          className="mt-2"
          />
        </div>

        <div className="form-navigation">
          <Button 
            text="<-" 
            className="primary" 
            variant="default" 
            color="blue"
            href="/"
          />
        </div>
        
        <div className="form-navigation">
          <Button 
            text="Fortsätt" 
            className="primary" 
            variant="default" 
            color="red" 
            withArrow={true}
            type="submit"
            href="/register/student/software-preferences"
          />
        </div>
      </form>
    </div>
  );
}